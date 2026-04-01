import { Router, Response } from 'express';
import db from '../db.js';
import { AuthRequest, authenticate, authorize } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

router.get('/', (req: AuthRequest, res: Response) => {
  const { status, category } = req.query;
  let sql = 'SELECT * FROM programs WHERE 1=1';
  const params: any[] = [];
  if (status) { sql += ' AND status = ?'; params.push(status); }
  if (category) { sql += ' AND category = ?'; params.push(category); }
  sql += ' ORDER BY created_at DESC';
  res.json(db.prepare(sql).all(...params));
});

router.get('/categories', (req: AuthRequest, res: Response) => {
  const cats = db.prepare('SELECT DISTINCT category FROM programs WHERE category IS NOT NULL').all() as any[];
  res.json(cats.map(c => c.category));
});

router.get('/:id', (req: AuthRequest, res: Response) => {
  const p = db.prepare('SELECT * FROM programs WHERE id = ?').get(req.params.id);
  if (!p) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(p);
});

router.post('/', authorize('admin', 'editor'), (req: AuthRequest, res: Response) => {
  const { title, description, category, goal_amount, start_date, end_date, image } = req.body;
  if (!title) { res.status(400).json({ error: 'Title required' }); return; }
  let slug = slugify(title);
  const existing = db.prepare('SELECT id FROM programs WHERE slug = ?').get(slug);
  if (existing) slug += '-' + Date.now();
  const result = db.prepare(
    'INSERT INTO programs (title, slug, description, category, goal_amount, start_date, end_date, image) VALUES (?,?,?,?,?,?,?,?)'
  ).run(title, slug, description || null, category || null, goal_amount || 0, start_date || null, end_date || null, image || null);
  res.status(201).json({ id: result.lastInsertRowid, slug });
});

router.put('/:id', authorize('admin', 'editor'), (req: AuthRequest, res: Response) => {
  const existing = db.prepare('SELECT * FROM programs WHERE id = ?').get(req.params.id) as any;
  if (!existing) { res.status(404).json({ error: 'Not found' }); return; }
  const { title, description, category, goal_amount, start_date, end_date, image, status } = req.body;
  db.prepare(
    `UPDATE programs SET title=?, description=?, category=?, goal_amount=?, start_date=?, end_date=?, image=?, status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).run(
    title ?? existing.title, description ?? existing.description, category ?? existing.category,
    goal_amount ?? existing.goal_amount, start_date ?? existing.start_date, end_date ?? existing.end_date,
    image ?? existing.image, status ?? existing.status, req.params.id
  );
  res.json({ success: true });
});

export default router;
