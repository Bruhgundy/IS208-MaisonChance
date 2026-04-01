import { Router, Response } from 'express';
import db from '../db.js';
import { AuthRequest, authenticate, authorize } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

function generateCode(): string {
  const year = new Date().getFullYear();
  const count = db.prepare('SELECT COUNT(*) as c FROM beneficiaries').get() as any;
  return `BN-${year}-${String(count.c + 1).padStart(4, '0')}`;
}

router.get('/', (req: AuthRequest, res: Response) => {
  const { status, q } = req.query;
  let sql = 'SELECT b.*, u.full_name as created_by_name FROM beneficiaries b LEFT JOIN users u ON b.created_by = u.id WHERE 1=1';
  const params: any[] = [];
  if (status) { sql += ' AND b.status = ?'; params.push(status); }
  if (q) { sql += ' AND (b.full_name LIKE ? OR b.code LIKE ? OR b.phone LIKE ?)'; params.push(`%${q}%`, `%${q}%`, `%${q}%`); }
  sql += ' ORDER BY b.created_at DESC';
  res.json(db.prepare(sql).all(...params));
});

router.get('/:id', (req: AuthRequest, res: Response) => {
  const b = db.prepare('SELECT b.*, u.full_name as created_by_name FROM beneficiaries b LEFT JOIN users u ON b.created_by = u.id WHERE b.id = ?').get(req.params.id);
  if (!b) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(b);
});

router.post('/', authorize('admin', 'editor'), (req: AuthRequest, res: Response) => {
  const { full_name, dob, gender, phone, email, address, id_card, health_notes, support_type, notes } = req.body;
  if (!full_name) { res.status(400).json({ error: 'Full name required' }); return; }
  const code = generateCode();
  const result = db.prepare(
    `INSERT INTO beneficiaries (code, full_name, dob, gender, phone, email, address, id_card, health_notes, support_type, notes, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(code, full_name, dob || null, gender || null, phone || null, email || null, address || null, id_card || null, health_notes || null, support_type || null, notes || null, req.user!.id);
  res.status(201).json({ id: result.lastInsertRowid, code });
});

router.put('/:id', authorize('admin', 'editor'), (req: AuthRequest, res: Response) => {
  const existing = db.prepare('SELECT * FROM beneficiaries WHERE id = ?').get(req.params.id) as any;
  if (!existing) { res.status(404).json({ error: 'Not found' }); return; }
  const { full_name, dob, gender, phone, email, address, id_card, health_notes, status, support_type, notes } = req.body;
  db.prepare(
    `UPDATE beneficiaries SET full_name=?, dob=?, gender=?, phone=?, email=?, address=?, id_card=?, health_notes=?, status=?, support_type=?, notes=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).run(
    full_name ?? existing.full_name, dob ?? existing.dob, gender ?? existing.gender,
    phone ?? existing.phone, email ?? existing.email, address ?? existing.address,
    id_card ?? existing.id_card, health_notes ?? existing.health_notes,
    status ?? existing.status, support_type ?? existing.support_type,
    notes ?? existing.notes, req.params.id
  );
  res.json({ success: true });
});

router.put('/:id/status', authorize('admin', 'editor'), (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  if (!['active', 'supported', 'graduated', 'inactive'].includes(status)) {
    res.status(400).json({ error: 'Invalid status' }); return;
  }
  const result = db.prepare('UPDATE beneficiaries SET status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?').run(status, req.params.id);
  if (result.changes === 0) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ success: true });
});

export default router;
