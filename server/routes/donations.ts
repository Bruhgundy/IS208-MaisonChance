import { Router, Response } from 'express';
import db from '../db.js';
import { AuthRequest, authenticate, authorize } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

function generateReceipt(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const count = db.prepare('SELECT COUNT(*) as c FROM donations').get() as any;
  return `RCP-${y}${m}-${String(count.c + 1).padStart(5, '0')}`;
}

router.get('/', (req: AuthRequest, res: Response) => {
  const { program_id } = req.query;
  let sql = `SELECT d.*, p.title as program_name FROM donations d LEFT JOIN programs p ON d.program_id = p.id WHERE 1=1`;
  const params: any[] = [];
  if (program_id) { sql += ' AND d.program_id = ?'; params.push(program_id); }
  sql += ' ORDER BY d.created_at DESC';
  res.json(db.prepare(sql).all(...params));
});

router.post('/', authorize('admin', 'editor'), (req: AuthRequest, res: Response) => {
  const { program_id, donor_name, donor_email, donor_phone, amount, payment_method, transaction_date, notes } = req.body;
  if (!donor_name || !amount) { res.status(400).json({ error: 'Donor name and amount required' }); return; }
  const receipt = generateReceipt();
  const result = db.prepare(
    'INSERT INTO donations (program_id, donor_name, donor_email, donor_phone, amount, payment_method, transaction_date, receipt_number, notes) VALUES (?,?,?,?,?,?,?,?,?)'
  ).run(program_id || null, donor_name, donor_email || null, donor_phone || null, amount, payment_method || 'cash', transaction_date || new Date().toISOString().split('T')[0], receipt, notes || null);
  if (program_id) {
    db.prepare('UPDATE programs SET raised_amount = raised_amount + ? WHERE id = ?').run(amount, program_id);
  }
  res.status(201).json({ id: result.lastInsertRowid, receipt_number: receipt });
});

router.get('/:id/receipt', async (req: AuthRequest, res: Response) => {
  const d = db.prepare('SELECT d.*, p.title as program_name FROM donations d LEFT JOIN programs p ON d.program_id = p.id WHERE d.id = ?').get(req.params.id) as any;
  if (!d) { res.status(404).json({ error: 'Not found' }); return; }
  try {
    const PDFDocument = (await import('pdfkit')).default;
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="receipt-${d.receipt_number}.pdf"`);
    doc.pipe(res);
    doc.fontSize(24).font('Helvetica-Bold').text('MAISON CHANCE', { align: 'center' });
    doc.fontSize(12).font('Helvetica').text('Receipt of Donation', { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(10).font('Helvetica');
    doc.text(`Receipt No: ${d.receipt_number}`);
    doc.text(`Date: ${d.transaction_date || d.created_at}`);
    doc.moveDown();
    doc.text(`Donor: ${d.donor_name}`);
    if (d.donor_email) doc.text(`Email: ${d.donor_email}`);
    if (d.donor_phone) doc.text(`Phone: ${d.donor_phone}`);
    doc.moveDown();
    doc.text(`Program: ${d.program_name || 'General Donation'}`);
    doc.text(`Amount: ${Number(d.amount).toLocaleString()} VND`);
    doc.text(`Payment Method: ${d.payment_method}`);
    if (d.notes) doc.text(`Notes: ${d.notes}`);
    doc.moveDown(3);
    doc.text('Thank you for your generous support!', { align: 'center' });
    doc.end();
  } catch {
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

export default router;
