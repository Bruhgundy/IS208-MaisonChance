import { Router, Response } from 'express';
import db from '../db.js';
import { AuthRequest, authenticate, authorize } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

router.get('/items', (req: AuthRequest, res: Response) => {
  const { category, low_stock } = req.query;
  let sql = 'SELECT * FROM inventory_items WHERE 1=1';
  const params: any[] = [];
  if (category) { sql += ' AND category = ?'; params.push(category); }
  if (low_stock === 'true') { sql += ' AND quantity <= min_quantity'; }
  sql += ' ORDER BY name ASC';
  res.json(db.prepare(sql).all(...params));
});

router.get('/items/categories', (req: AuthRequest, res: Response) => {
  const cats = db.prepare('SELECT DISTINCT category FROM inventory_items WHERE category IS NOT NULL').all() as any[];
  res.json(cats.map(c => c.category));
});

router.post('/items', authorize('admin', 'editor'), (req: AuthRequest, res: Response) => {
  const { name, category, unit, quantity, min_quantity } = req.body;
  if (!name || !unit) { res.status(400).json({ error: 'Name and unit required' }); return; }
  const existing = db.prepare('SELECT id FROM inventory_items WHERE name = ?').get(name);
  if (existing) { res.status(409).json({ error: 'Item already exists' }); return; }
  const result = db.prepare(
    'INSERT INTO inventory_items (name, category, unit, quantity, min_quantity) VALUES (?,?,?,?,?)'
  ).run(name, category || null, unit, quantity || 0, min_quantity || 0);
  res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/items/:id', authorize('admin', 'editor'), (req: AuthRequest, res: Response) => {
  const existing = db.prepare('SELECT * FROM inventory_items WHERE id = ?').get(req.params.id) as any;
  if (!existing) { res.status(404).json({ error: 'Not found' }); return; }
  const { name, category, unit, min_quantity } = req.body;
  db.prepare(
    'UPDATE inventory_items SET name=?, category=?, unit=?, min_quantity=?, updated_at=CURRENT_TIMESTAMP WHERE id=?'
  ).run(name ?? existing.name, category ?? existing.category, unit ?? existing.unit, min_quantity ?? existing.min_quantity, req.params.id);
  res.json({ success: true });
});

router.get('/transactions', (req: AuthRequest, res: Response) => {
  const { item_id, type } = req.query;
  let sql = `SELECT t.*, i.name as item_name FROM inventory_transactions t LEFT JOIN inventory_items i ON t.item_id = i.id WHERE 1=1`;
  const params: any[] = [];
  if (item_id) { sql += ' AND t.item_id = ?'; params.push(item_id); }
  if (type) { sql += ' AND t.type = ?'; params.push(type); }
  sql += ' ORDER BY t.created_at DESC LIMIT 100';
  res.json(db.prepare(sql).all(...params));
});

router.post('/import', authorize('admin', 'editor'), (req: AuthRequest, res: Response) => {
  const { item_id, quantity, reference, notes } = req.body;
  if (!item_id || !quantity) { res.status(400).json({ error: 'Item and quantity required' }); return; }
  db.transaction(() => {
    db.prepare('UPDATE inventory_items SET quantity = quantity + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(quantity, item_id);
    db.prepare('INSERT INTO inventory_transactions (item_id, type, quantity, reference, notes, created_by) VALUES (?,?,?,?,?,?)')
      .run(item_id, 'import', quantity, reference || null, notes || null, req.user!.id);
  })();
  res.json({ success: true });
});

router.post('/export', authorize('admin', 'editor'), (req: AuthRequest, res: Response) => {
  const { item_id, quantity, recipient, notes } = req.body;
  if (!item_id || !quantity) { res.status(400).json({ error: 'Item and quantity required' }); return; }
  const item = db.prepare('SELECT * FROM inventory_items WHERE id = ?').get(item_id) as any;
  if (!item) { res.status(404).json({ error: 'Item not found' }); return; }
  if (item.quantity < quantity) { res.status(400).json({ error: 'Insufficient stock' }); return; }
  db.transaction(() => {
    db.prepare('UPDATE inventory_items SET quantity = quantity - ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(quantity, item_id);
    db.prepare('INSERT INTO inventory_transactions (item_id, type, quantity, recipient, notes, created_by) VALUES (?,?,?,?,?,?)')
      .run(item_id, 'export', quantity, recipient || null, notes || null, req.user!.id);
  })();
  res.json({ success: true });
});

export default router;
