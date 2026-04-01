import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js';
import { AuthRequest, authenticate, generateToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', (req: AuthRequest, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password required' });
    return;
  }
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  const payload = { id: user.id, username: user.username, email: user.email, full_name: user.full_name, role: user.role };
  const token = generateToken(payload);
  res.json({ token, user: payload });
});

router.get('/me', authenticate, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});

router.post('/register', authenticate, (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ error: 'Only admins can register users' });
    return;
  }
  const { username, email, password, full_name, role } = req.body;
  if (!username || !email || !password || !full_name) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  const existing = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(username, email);
  if (existing) {
    res.status(409).json({ error: 'Username or email already exists' });
    return;
  }
  const hash = bcrypt.hashSync(password, 10);
  const result = db.prepare(
    'INSERT INTO users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)'
  ).run(username, email, hash, full_name, role || 'viewer');
  res.status(201).json({ id: result.lastInsertRowid });
});

export default router;
