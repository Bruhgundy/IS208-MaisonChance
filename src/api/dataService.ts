export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User { id: number; username: string; email: string; full_name: string; role: UserRole; }
export interface Beneficiary { id: number; code: string; full_name: string; dob: string; gender: string; phone: string; email: string; address: string; health_notes: string; status: string; support_type: string; notes: string; created_at: string; }
export interface Program { id: number; title: string; slug: string; description: string; category: string; goal_amount: number; raised_amount: number; start_date: string; end_date: string; image: string; status: string; donor_count?: number; }
export interface Donation { id: number; program_id: number | null; program_name: string; donor_name: string; donor_email: string; donor_phone: string; amount: number; payment_method: string; transaction_date: string; receipt_number: string; notes: string; created_at: string; }
export interface InventoryItem { id: number; name: string; category: string; unit: string; quantity: number; min_quantity: number; }
export interface InvTransaction { id: number; item_id: number; item_name: string; type: string; quantity: number; reference: string; recipient: string; notes: string; created_at: string; }
export interface EventItem { id: number; title: string; description: string; date: string; location: string; max_volunteers: number; registered: number; status: string; }
export interface EventReg { id: number; event_id: number; event_title: string; volunteer_name: string; volunteer_email: string; volunteer_phone: string; hours_worked: number; status: string; }

function delay(ms = 400): Promise<void> { return new Promise(r => setTimeout(r, ms)); }

let userCounter = 3;
export const users: User[] = [
  { id: 1, username: 'admin', email: 'admin@maisonchance.org', full_name: 'Nguyễn Văn Admin', role: 'admin' },
  { id: 2, username: 'editor', email: 'editor@maisonchance.org', full_name: 'Trần Thị Editor', role: 'editor' },
  { id: 3, username: 'viewer', email: 'viewer@maisonchance.org', full_name: 'Lê Văn Viewer', role: 'viewer' },
];

let benCounter = 15;
let beneficiaries: Beneficiary[] = [
  { id: 1, code: 'BN-2026-0001', full_name: 'Nguyễn Thị Hoa', dob: '1998-05-12', gender: 'Nữ', phone: '0903123456', email: 'hoa.nguyen@email.com', address: '12 Lê Lợi, Quận 1, TP.HCM', health_notes: 'Khuyết tật vận động bẩm sinh', status: 'supported', support_type: 'Y tế, Giáo dục', notes: 'Đang theo học lớp tin học', created_at: '2026-01-15' },
  { id: 2, code: 'BN-2026-0002', full_name: 'Trần Văn Nam', dob: '2002-11-08', gender: 'Nam', phone: '0903987654', email: 'nam.tran@email.com', address: '45 Nguyễn Huệ, Q.Bình Thạnh, TP.HCM', health_notes: 'Khiếm thị', status: 'active', support_type: 'Đào tạo nghề', notes: 'Học viên lớp làm bánh', created_at: '2026-02-20' },
  { id: 3, code: 'BN-2026-0003', full_name: 'Lê Thị Minh', dob: '2010-03-22', gender: 'Nữ', phone: '0909123456', email: 'minh.le@email.com', address: '78 Hùng Vương, Q.Tân Bình, TP.HCM', health_notes: 'Mồ côi cha mẹ', status: 'active', support_type: 'Giáo dục, Nhà ở', notes: 'Học lớp 8 trường công lập', created_at: '2026-01-28' },
  { id: 4, code: 'BN-2026-0004', full_name: 'Phạm Văn Đức', dob: '1995-07-15', gender: 'Nam', phone: '0909456789', email: 'duc.pham@email.com', address: '123 Cách Mạng Tháng 8, Q.3, TP.HCM', health_notes: 'Tai nạn lao động, liệt nửa người', status: 'supported', support_type: 'Y tế, Phục hồi chức năng', notes: 'Đang điều trị vật lý trị liệu', created_at: '2026-03-05' },
  { id: 5, code: 'BN-2026-0005', full_name: 'Hoàng Thị Lan', dob: '2008-09-30', gender: 'Nữ', phone: '0909567890', email: 'lan.hoang@email.com', address: '56 Phạm Ngũ Lão, Q.1, TP.HCM', health_notes: 'Mồ côi, suy dinh dưỡng', status: 'active', support_type: 'Nhà ở, Y tế', notes: 'Cần theo dõi sức khỏe định kỳ', created_at: '2026-02-10' },
  { id: 6, code: 'BN-2026-0006', full_name: 'Đặng Văn Tùng', dob: '1991-12-03', gender: 'Nam', phone: '0909678901', email: 'tung.dang@email.com', address: '234 Nguyễn Trãi, Q.5, TP.HCM', health_notes: 'Khuyết tật trí tuệ nhẹ', status: 'graduated', support_type: 'Đào tạo nghề', notes: 'Đã tốt nghiệp lớp làm bánh, đang làm việc tại tiệm bánh', created_at: '2025-06-15' },
  { id: 7, code: 'BN-2026-0007', full_name: 'Bùi Thị Hạnh', dob: '2012-05-18', gender: 'Nữ', phone: '0909789012', email: 'hanh.bui@email.com', address: '89 Trần Hưng Đạo, Q.10, TP.HCM', health_notes: 'Mồ côi, bệnh tim bẩm sinh', status: 'active', support_type: 'Y tế, Giáo dục', notes: 'Đã phẫu thuật tim thành công', created_at: '2026-03-18' },
  { id: 8, code: 'BN-2026-0008', full_name: 'Võ Thị Thu', dob: '1997-08-25', gender: 'Nữ', phone: '0909890123', email: 'thu.vo@email.com', address: '12/34 Lý Tự Trọng, Q.1, TP.HCM', health_notes: 'Khiếm thính', status: 'supported', support_type: 'Đào tạo nghề, Y tế', notes: 'Học viên lớp công nghệ thông tin', created_at: '2026-01-05' },
  { id: 9, code: 'BN-2026-0009', full_name: 'Ngô Văn Phúc', dob: '2005-11-10', gender: 'Nam', phone: '0909901234', email: 'phuc.ngo@email.com', address: '567 Lê Văn Sỹ, Q.3, TP.HCM', health_notes: 'Mồ côi cha', status: 'active', support_type: 'Giáo dục', notes: 'Học sinh lớp 12, học lực khá', created_at: '2026-04-01' },
  { id: 10, code: 'BN-2026-0010', full_name: 'Đỗ Thị Mai', dob: '2000-02-14', gender: 'Nữ', phone: '0909012345', email: 'mai.do@email.com', address: '78/56 Nguyễn Đình Chiểu, Q.3, TP.HCM', health_notes: 'Khuyết tật vận động do bại liệt', status: 'supported', support_type: 'Y tế, Đào tạo nghề', notes: 'Học viên lớp thủ công mỹ nghệ', created_at: '2026-02-25' },
  { id: 11, code: 'BN-2026-0011', full_name: 'Trịnh Văn Hoàng', dob: '2003-06-30', gender: 'Nam', phone: '0909123789', email: 'hoang.trinh@email.com', address: '345 Phan Đình Phùng, Q.Phú Nhuận, TP.HCM', health_notes: 'Khiếm thị bẩm sinh', status: 'active', support_type: 'Giáo dục, Đào tạo nghề', notes: 'Học viên xuất sắc lớp tin học', created_at: '2026-03-12' },
  { id: 12, code: 'BN-2026-0012', full_name: 'Phan Thị Ngọc', dob: '2011-09-05', gender: 'Nữ', phone: '0909234567', email: 'ngoc.phan@email.com', address: '90/12 Bà Huyện Thanh Quan, Q.3, TP.HCM', health_notes: 'Mồ côi cả cha mẹ', status: 'active', support_type: 'Nhà ở, Giáo dục', notes: 'Học lớp 7, thích vẽ', created_at: '2026-04-10' },
  { id: 13, code: 'BN-2026-0013', full_name: 'Lý Văn Sang', dob: '1993-04-20', gender: 'Nam', phone: '0909345678', email: 'sang.ly@email.com', address: '67 Trường Chinh, Q.Tân Bình, TP.HCM', health_notes: 'Tai biến mạch máu não', status: 'supported', support_type: 'Phục hồi chức năng', notes: 'Đang hồi phục tốt', created_at: '2026-01-30' },
  { id: 14, code: 'BN-2026-0014', full_name: 'Dương Thị Hồng', dob: '2007-12-18', gender: 'Nữ', phone: '0909456123', email: 'hong.duong@email.com', address: '23/45 Ngô Gia Tự, Q.10, TP.HCM', health_notes: 'Mồ côi, bệnh hen suyễn', status: 'active', support_type: 'Y tế, Giáo dục', notes: 'Cần thuốc hen định kỳ', created_at: '2026-04-15' },
  { id: 15, code: 'BN-2026-0015', full_name: 'Mai Văn Tiến', dob: '1990-10-08', gender: 'Nam', phone: '0909567234', email: 'tien.mai@email.com', address: '456 Xô Viết Nghệ Tĩnh, Q.Bình Thạnh, TP.HCM', health_notes: 'Khuyết tật vận động do TNGT', status: 'graduated', support_type: 'Đào tạo nghề, Y tế', notes: 'Tự kinh doanh online thành công', created_at: '2025-09-20' },
];

let progCounter = 8;
let programs: Program[] = [
  { id: 1, title: 'Mái Ấm Cho Em', slug: 'mai-am-cho-em', description: 'Chương trình xây dựng và duy trì nhà ở cho trẻ em mồ côi và người khuyết tật tại TP.HCM. Cung cấp môi trường sống an toàn, đầy đủ tiện nghi và tình thương.', category: 'Nhà ở', goal_amount: 500000000, raised_amount: 375000000, start_date: '2026-01-01', end_date: '2026-12-31', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600', status: 'active', donor_count: 89 },
  { id: 2, title: 'Giáo Dục Cho Mọi Người', slug: 'giao-duc-cho-moi-nguoi', description: 'Hỗ trợ học phí, sách vở và dụng cụ học tập cho trẻ em có hoàn cảnh khó khăn, giúp các em đến trường và theo đuổi ước mơ.', category: 'Giáo dục', goal_amount: 300000000, raised_amount: 185000000, start_date: '2026-02-01', end_date: '2026-11-30', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600', status: 'active', donor_count: 156 },
  { id: 3, title: 'Đào Tạo Nghề - Tự Lập Tương Lai', slug: 'dao-tao-nghe-tu-lap-tuong-lai', description: 'Đào tạo kỹ năng nghề nghiệp cho người khuyết tật: làm bánh, thủ công mỹ nghệ, công nghệ thông tin. Giúp họ tự tin hòa nhập cộng đồng.', category: 'Đào tạo', goal_amount: 400000000, raised_amount: 320000000, start_date: '2026-01-15', end_date: '2026-12-15', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600', status: 'active', donor_count: 67 },
  { id: 4, title: 'Y Tế Cộng Đồng', slug: 'y-te-cong-dong', description: 'Cung cấp dịch vụ khám chữa bệnh, phục hồi chức năng và hỗ trợ chi phí y tế cho người khuyết tật và trẻ em mồ côi.', category: 'Y tế', goal_amount: 600000000, raised_amount: 420000000, start_date: '2026-03-01', end_date: '2026-12-31', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600', status: 'active', donor_count: 134 },
  { id: 5, title: 'Tết Yêu Thương 2026', slug: 'tet-yeu-thuong-2026', description: 'Chương trình trao quà Tết cho các gia đình khó khăn, trẻ em mồ côi và người khuyết tật trên địa bàn TP.HCM và các tỉnh lân cận.', category: 'Sự kiện', goal_amount: 200000000, raised_amount: 200000000, start_date: '2026-01-01', end_date: '2026-02-15', image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600', status: 'completed', donor_count: 210 },
  { id: 6, title: 'Nước Sạch Cho Bản Làng', slug: 'nuoc-sach-cho-ban-lang', description: 'Lắp đặt hệ thống lọc nước và xây dựng giếng nước sạch cho các bản làng vùng sâu, vùng xa tại Đắk Nông và Lâm Đồng.', category: 'Cơ sở hạ tầng', goal_amount: 350000000, raised_amount: 150000000, start_date: '2026-04-01', end_date: '2026-10-31', image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600', status: 'active', donor_count: 45 },
  { id: 7, title: 'Vượt Lên Chính Mình', slug: 'vuot-len-chinh-minh', description: 'Chương trình thể thao và nghệ thuật dành cho người khuyết tật, giúp họ phát triển thể chất, tinh thần và khẳng định bản thân.', category: 'Văn hóa', goal_amount: 150000000, raised_amount: 95000000, start_date: '2026-05-01', end_date: '2026-09-30', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600', status: 'active', donor_count: 38 },
  { id: 8, title: 'Phẫu Thuật Nụ Cười', slug: 'phau-thuat-nu-cuoi', description: 'Hỗ trợ phẫu thuật chỉnh hình, phẫu thuật hàm mặt cho trẻ em khuyết tật bẩm sinh và nạn nhân tai nạn.', category: 'Y tế', goal_amount: 450000000, raised_amount: 450000000, start_date: '2025-06-01', end_date: '2026-03-31', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600', status: 'completed', donor_count: 178 },
];

let donCounter = 25;
let donations: Donation[] = [
  { id: 1, program_id: 1, program_name: 'Mái Ấm Cho Em', donor_name: 'Công ty TNHH ABC', donor_email: 'info@abc.com', donor_phone: '0909111222', amount: 50000000, payment_method: 'Chuyển khoản', transaction_date: '2026-01-20', receipt_number: 'RCP-202601-00001', notes: 'Tài trợ quý 1', created_at: '2026-01-20' },
  { id: 2, program_id: 2, program_name: 'Giáo Dục Cho Mọi Người', donor_name: 'Nguyễn Thị Hồng', donor_email: 'hong.nguyen@gmail.com', donor_phone: '0909333444', amount: 2000000, payment_method: 'Tiền mặt', transaction_date: '2026-01-25', receipt_number: 'RCP-202601-00002', notes: '', created_at: '2026-01-25' },
  { id: 3, program_id: 4, program_name: 'Y Tế Cộng Đồng', donor_name: 'Quỹ Thiện Tâm', donor_email: 'info@thientam.vn', donor_phone: '0909555666', amount: 100000000, payment_method: 'Chuyển khoản', transaction_date: '2026-02-01', receipt_number: 'RCP-202602-00003', notes: 'Tài trợ chương trình phẫu thuật', created_at: '2026-02-01' },
  { id: 4, program_id: null, program_name: 'Quyên góp chung', donor_name: 'Trần Văn Bình', donor_email: 'binh.tran@yahoo.com', donor_phone: '0909777888', amount: 500000, payment_method: 'Chuyển khoản', transaction_date: '2026-02-10', receipt_number: 'RCP-202602-00004', notes: '', created_at: '2026-02-10' },
  { id: 5, program_id: 3, program_name: 'Đào Tạo Nghề - Tự Lập Tương Lai', donor_name: 'Ngân hàng TMCP XYZ', donor_email: 'csr@xyzbank.vn', donor_phone: '0909999000', amount: 80000000, payment_method: 'Chuyển khoản', transaction_date: '2026-02-15', receipt_number: 'RCP-202602-00005', notes: 'Tài trợ CSR 2026', created_at: '2026-02-15' },
  { id: 6, program_id: 5, program_name: 'Tết Yêu Thương 2026', donor_name: 'Lê Văn Hùng', donor_email: 'hungle@gmail.com', donor_phone: '0909123456', amount: 1000000, payment_method: 'Tiền mặt', transaction_date: '2026-01-15', receipt_number: 'RCP-202601-00006', notes: 'Ủng hộ quà Tết', created_at: '2026-01-15' },
  { id: 7, program_id: 3, program_name: 'Đào Tạo Nghề - Tự Lập Tương Lai', donor_name: 'Công ty TNHH May Mặc ABC', donor_email: 'info@mayabc.com', donor_phone: '0909234567', amount: 15000000, payment_method: 'Chuyển khoản', transaction_date: '2026-02-20', receipt_number: 'RCP-202602-00007', notes: 'Tài trợ máy may cho lớp học', created_at: '2026-02-20' },
  { id: 8, program_id: 6, program_name: 'Nước Sạch Cho Bản Làng', donor_name: 'Nhóm từ thiện Thiện Nguyện', donor_email: 'thiennguyen@gmail.com', donor_phone: '0909345678', amount: 25000000, payment_method: 'Chuyển khoản', transaction_date: '2026-03-01', receipt_number: 'RCP-202603-00008', notes: 'Góp quỹ giếng nước', created_at: '2026-03-01' },
  { id: 9, program_id: 4, program_name: 'Y Tế Cộng Đồng', donor_name: 'Phạm Thị Lan', donor_email: 'lan.pham@gmail.com', donor_phone: '0909456789', amount: 3000000, payment_method: 'Tiền mặt', transaction_date: '2026-03-05', receipt_number: 'RCP-202603-00009', notes: '', created_at: '2026-03-05' },
  { id: 10, program_id: 7, program_name: 'Vượt Lên Chính Mình', donor_name: 'Công ty Thể Thao SportX', donor_email: 'info@sportx.vn', donor_phone: '0909567890', amount: 20000000, payment_method: 'Chuyển khoản', transaction_date: '2026-03-10', receipt_number: 'RCP-202603-00010', notes: 'Tài trợ dụng cụ thể thao', created_at: '2026-03-10' },
  { id: 11, program_id: 1, program_name: 'Mái Ấm Cho Em', donor_name: 'Nguyễn Văn Phúc', donor_email: 'phuc.nguyen@gmail.com', donor_phone: '0909678901', amount: 5000000, payment_method: 'Chuyển khoản', transaction_date: '2026-03-15', receipt_number: 'RCP-202603-00011', notes: '', created_at: '2026-03-15' },
  { id: 12, program_id: 2, program_name: 'Giáo Dục Cho Mọi Người', donor_name: 'Quỹ Khuyến Học Việt Nam', donor_email: 'info@khuyenhoc.vn', donor_phone: '0909789012', amount: 45000000, payment_method: 'Chuyển khoản', transaction_date: '2026-03-20', receipt_number: 'RCP-202603-00012', notes: 'Học bổng năm học 2025-2026', created_at: '2026-03-20' },
  { id: 13, program_id: 8, program_name: 'Phẫu Thuật Nụ Cười', donor_name: 'Tổ chức Operation Smile', donor_email: 'info@operationsmile.vn', donor_phone: '0909890123', amount: 200000000, payment_method: 'Chuyển khoản', transaction_date: '2026-02-01', receipt_number: 'RCP-202602-00013', notes: 'Tài trợ chương trình phẫu thuật', created_at: '2026-02-01' },
  { id: 14, program_id: null, program_name: 'Quyên góp chung', donor_name: 'Lê Thị Mai', donor_email: 'mai.le@yahoo.com', donor_phone: '0909901234', amount: 1000000, payment_method: 'Tiền mặt', transaction_date: '2026-04-01', receipt_number: 'RCP-202604-00014', notes: '', created_at: '2026-04-01' },
  { id: 15, program_id: 6, program_name: 'Nước Sạch Cho Bản Làng', donor_name: 'Ngân hàng Nông nghiệp', donor_email: 'agribank@agribank.vn', donor_phone: '0909012345', amount: 60000000, payment_method: 'Chuyển khoản', transaction_date: '2026-04-05', receipt_number: 'RCP-202604-00015', notes: '', created_at: '2026-04-05' },
];

let invCounter = 12;
let inventoryItems: InventoryItem[] = [
  { id: 1, name: 'Gạo tẻ', category: 'Thực phẩm', unit: 'kg', quantity: 500, min_quantity: 100 },
  { id: 2, name: 'Dầu ăn', category: 'Thực phẩm', unit: 'lít', quantity: 80, min_quantity: 30 },
  { id: 3, name: 'Sữa hộp', category: 'Thực phẩm', unit: 'thùng', quantity: 25, min_quantity: 10 },
  { id: 4, name: 'Bỉm người lớn', category: 'Y tế', unit: 'cái', quantity: 200, min_quantity: 50 },
  { id: 5, name: 'Xe lăn', category: 'Thiết bị', unit: 'chiếc', quantity: 8, min_quantity: 3 },
  { id: 6, name: 'Nạng gỗ', category: 'Thiết bị', unit: 'đôi', quantity: 12, min_quantity: 5 },
  { id: 7, name: 'Bột mì', category: 'Thực phẩm', unit: 'kg', quantity: 150, min_quantity: 50 },
  { id: 8, name: 'Đường', category: 'Thực phẩm', unit: 'kg', quantity: 100, min_quantity: 30 },
  { id: 9, name: 'Khẩu trang y tế', category: 'Y tế', unit: 'hộp', quantity: 45, min_quantity: 20 },
  { id: 10, name: 'Vở học sinh', category: 'Giáo dục', unit: 'quyển', quantity: 1000, min_quantity: 200 },
  { id: 11, name: 'Bút bi', category: 'Giáo dục', unit: 'cây', quantity: 500, min_quantity: 100 },
  { id: 12, name: 'Quần áo', category: 'Nhu yếu phẩm', unit: 'bộ', quantity: 60, min_quantity: 30 },
];

let transCounter = 0;
let invTransactions: InvTransaction[] = [];

let evtCounter = 6;
let events: EventItem[] = [
  { id: 1, title: 'Ngày hội Tình nguyện viên 2026', description: 'Sự kiện gặp gỡ, giao lưu và tri ân các tình nguyện viên đã đồng hành cùng Maison Chance trong năm qua.', date: '2026-06-15', location: 'Hội trường UBND Quận Bình Thạnh', max_volunteers: 150, registered: 87, status: 'open' },
  { id: 2, title: 'Lễ tốt nghiệp lớp Đào tạo nghề', description: 'Buổi lễ tốt nghiệp dành cho các học viên hoàn thành khóa đào tạo nghề làm bánh và thủ công mỹ nghệ.', date: '2026-05-20', location: 'Cơ sở Maison Chance', max_volunteers: 30, registered: 25, status: 'open' },
  { id: 3, title: 'Khám sức khỏe định kỳ', description: 'Tổ chức khám sức khỏe tổng quát cho người khuyết tật và trẻ em mồ côi tại trung tâm.', date: '2026-04-25', location: 'Trạm Y tế Phường Bình Hưng Hòa A', max_volunteers: 20, registered: 20, status: 'closed' },
  { id: 4, title: 'Hội thảo "Kỹ năng sống tự lập"', description: 'Chia sẻ kỹ năng tự chăm sóc bản thân, quản lý tài chính và hòa nhập cộng đồng cho người khuyết tật.', date: '2026-07-10', location: 'Hội trường Maison Chance', max_volunteers: 40, registered: 12, status: 'open' },
  { id: 5, title: 'Gây quỹ "Chạy vì cộng đồng"', description: 'Giải chạy bộ gây quỹ hỗ trợ xây dựng nhà ở cho trẻ em mồ côi và người khuyết tật.', date: '2026-08-01', location: 'Công viên Gia Định', max_volunteers: 200, registered: 156, status: 'open' },
  { id: 6, title: 'Lễ trao học bổng năm học 2025-2026', description: 'Trao học bổng cho các em học sinh vượt khó học giỏi thuộc chương trình Giáo Dục Cho Mọi Người.', date: '2026-05-05', location: 'Văn phòng Maison Chance', max_volunteers: 15, registered: 15, status: 'closed' },
];

let regCounter = 0;
let eventRegs: EventReg[] = [];

export function loginUser(username: string, password: string): Promise<{ user: User; token: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.username === username);
      if (user && password) {
        resolve({ user, token: 'session-token-' + Date.now() });
      } else {
        reject(new Error('Sai tên đăng nhập hoặc mật khẩu'));
      }
    }, 1200);
  });
}

export function getCurrentUser(): Promise<User> {
  return delay().then(() => ({ id: 1, username: 'admin', email: 'admin@maisonchance.org', full_name: 'Nguyễn Văn Admin', role: 'admin' }));
}

export function fetchBeneficiaries(status?: string): Promise<Beneficiary[]> {
  return delay().then(() => {
    if (status) return beneficiaries.filter(b => b.status === status);
    return [...beneficiaries];
  });
}

export function addBeneficiary(data: Partial<Beneficiary>): Promise<Beneficiary> {
  return delay().then(() => {
    benCounter++;
    const b: Beneficiary = {
      id: benCounter, code: `BN-2026-${String(benCounter).padStart(4, '0')}`,
      full_name: data.full_name || '', dob: data.dob || '', gender: data.gender || '',
      phone: data.phone || '', email: data.email || '', address: data.address || '',
      health_notes: data.health_notes || '', status: 'active', support_type: data.support_type || '',
      notes: data.notes || '', created_at: new Date().toISOString().split('T')[0],
    };
    beneficiaries.unshift(b);
    return b;
  });
}

export function updateBeneficiary(id: number, data: Partial<Beneficiary>): Promise<Beneficiary> {
  return delay().then(() => {
    const idx = beneficiaries.findIndex(b => b.id === id);
    if (idx === -1) throw new Error('Not found');
    beneficiaries[idx] = { ...beneficiaries[idx], ...data };
    return beneficiaries[idx];
  });
}

export function fetchPrograms(status?: string, category?: string): Promise<Program[]> {
  return delay().then(() => {
    let result = [...programs];
    if (status) result = result.filter(p => p.status === status);
    if (category) result = result.filter(p => p.category === category);
    return result;
  });
}

export function fetchProgram(id: number): Promise<Program | undefined> {
  return delay().then(() => programs.find(p => p.id === id));
}

export function addProgram(data: Partial<Program>): Promise<Program> {
  return delay().then(() => {
    progCounter++;
    const p: Program = {
      id: progCounter, title: data.title || '', slug: (data.title || '').toLowerCase().replace(/\s+/g, '-'),
      description: data.description || '', category: data.category || '', goal_amount: data.goal_amount || 0,
      raised_amount: 0, start_date: data.start_date || '', end_date: data.end_date || '', image: '',
      status: 'active', donor_count: 0,
    };
    programs.unshift(p);
    return p;
  });
}

export function updateProgram(id: number, data: Partial<Program>): Promise<Program> {
  return delay().then(() => {
    const idx = programs.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Not found');
    programs[idx] = { ...programs[idx], ...data };
    return programs[idx];
  });
}

export function fetchDonations(): Promise<Donation[]> {
  return delay().then(() => [...donations]);
}

export function addDonation(data: Partial<Donation>): Promise<Donation> {
  return delay().then(() => {
    donCounter++;
    const d: Donation = {
      id: donCounter, program_id: data.program_id || null,
      program_name: programs.find(p => p.id === data.program_id)?.title || 'Quyên góp chung',
      donor_name: data.donor_name || '', donor_email: data.donor_email || '', donor_phone: data.donor_phone || '',
      amount: data.amount || 0, payment_method: data.payment_method || 'Tiền mặt',
      transaction_date: new Date().toISOString().split('T')[0],
      receipt_number: `RCP-${new Date().toISOString().slice(0, 7).replace('-', '')}-${String(donCounter).padStart(5, '0')}`,
      notes: data.notes || '', created_at: new Date().toISOString().split('T')[0],
    };
    donations.unshift(d);
    const prog = programs.find(p => p.id === data.program_id);
    if (prog) prog.raised_amount += (data.amount || 0);
    return d;
  });
}

export function fetchInventoryItems(lowStock?: boolean): Promise<InventoryItem[]> {
  return delay().then(() => {
    if (lowStock) return inventoryItems.filter(i => i.quantity <= i.min_quantity);
    return [...inventoryItems];
  });
}

export function addInventoryItem(data: Partial<InventoryItem>): Promise<InventoryItem> {
  return delay().then(() => {
    invCounter++;
    const item: InventoryItem = { id: invCounter, name: data.name || '', category: data.category || '', unit: data.unit || '', quantity: data.quantity || 0, min_quantity: data.min_quantity || 0 };
    inventoryItems.push(item);
    return item;
  });
}

export function importInventory(itemId: number, quantity: number, reference: string): Promise<void> {
  return delay().then(() => {
    const item = inventoryItems.find(i => i.id === itemId);
    if (!item) throw new Error('Not found');
    item.quantity += quantity;
    transCounter++;
    invTransactions.unshift({ id: transCounter, item_id: itemId, item_name: item.name, type: 'import', quantity, reference, recipient: '', notes: '', created_at: new Date().toISOString().split('T')[0] });
  });
}

export function exportInventory(itemId: number, quantity: number, recipient: string): Promise<void> {
  return delay().then(() => {
    const item = inventoryItems.find(i => i.id === itemId);
    if (!item) throw new Error('Not found');
    if (item.quantity < quantity) throw new Error('Tồn kho không đủ');
    item.quantity -= quantity;
    transCounter++;
    invTransactions.unshift({ id: transCounter, item_id: itemId, item_name: item.name, type: 'export', quantity, reference: '', recipient, notes: '', created_at: new Date().toISOString().split('T')[0] });
  });
}

export function fetchTransactions(itemId?: number): Promise<InvTransaction[]> {
  return delay().then(() => {
    if (itemId) return invTransactions.filter(t => t.item_id === itemId);
    return [...invTransactions];
  });
}

export function fetchEvents(): Promise<EventItem[]> {
  return delay().then(() => [...events]);
}

export function addEvent(data: Partial<EventItem>): Promise<EventItem> {
  return delay().then(() => {
    evtCounter++;
    const e: EventItem = { id: evtCounter, title: data.title || '', description: data.description || '', date: data.date || '', location: data.location || '', max_volunteers: data.max_volunteers || 0, registered: 0, status: 'open' };
    events.unshift(e);
    return e;
  });
}

export function updateEvent(id: number, data: Partial<EventItem>): Promise<EventItem> {
  return delay().then(() => {
    const idx = events.findIndex(e => e.id === id);
    if (idx === -1) throw new Error('Not found');
    events[idx] = { ...events[idx], ...data };
    return events[idx];
  });
}

export function registerEvent(eventId: number, volunteerName: string, email: string, phone: string): Promise<void> {
  return delay().then(() => {
    const event = events.find(e => e.id === eventId);
    if (!event) throw new Error('Not found');
    if (event.status !== 'open') throw new Error('Sự kiện không mở đăng ký');
    if (event.registered >= event.max_volunteers) throw new Error('Sự kiện đã đầy');
    regCounter++;
    eventRegs.push({ id: regCounter, event_id: eventId, event_title: event.title, volunteer_name: volunteerName, volunteer_email: email, volunteer_phone: phone, hours_worked: 0, status: 'registered' });
    event.registered++;
  });
}

export function fetchEventRegistrations(eventId?: number): Promise<EventReg[]> {
  return delay().then(() => {
    if (eventId) return eventRegs.filter(r => r.event_id === eventId);
    return [...eventRegs];
  });
}

export function fetchUsers(): Promise<User[]> {
  return delay().then(() => [...users]);
}

export function updateUserRole(id: number, role: UserRole): Promise<void> {
  return delay().then(() => {
    const user = users.find(u => u.id === id);
    if (user) user.role = role;
  });
}

export function getDashboardStats(): Promise<{ totalBeneficiaries: number; activePrograms: number; totalDonations: number; totalVolunteers: number; monthlyRevenue: { month: string; amount: number }[]; recentDonations: Donation[]; programStats: { name: string; goal: number; raised: number }[] }> {
  return delay(500).then(() => {
    const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
    const monthlyRevenue = months.map((m, i) => ({ month: m, amount: Math.floor(Math.random() * 80000000 + 10000000) }));
    const totalDonated = donations.reduce((s: number, d: Donation) => s + d.amount, 0);
    const recentDonations = [...donations].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);
    const programStats = programs.filter(p => p.status === 'active').map(p => ({ name: p.title, goal: p.goal_amount, raised: p.raised_amount }));
    return {
      totalBeneficiaries: beneficiaries.length,
      activePrograms: programs.filter(p => p.status === 'active').length,
      totalDonations: totalDonated,
      totalVolunteers: events.reduce((s: number, e: EventItem) => s + e.registered, 0) + 50,
      monthlyRevenue, recentDonations, programStats,
    };
  });
}
