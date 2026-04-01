import { motion } from "motion/react";
import { Send, Facebook, Instagram, Youtube, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1 space-y-6">
          <span className="text-2xl font-extrabold text-primary block font-display">Maison Chance</span>
          <p className="text-on-surface-variant font-body">
            Maison Chance cung cấp giải pháp nhà ở, y tế và đào tạo nghề cho những người khuyết tật và trẻ em có hoàn cảnh khó khăn.
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <motion.a 
                key={i}
                whileHover={{ y: -4 }}
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" 
                href="#"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-on-surface mb-6 font-display">Khám phá</h4>
          <ul className="space-y-4 text-on-surface-variant font-body">
            <li><a className="hover:text-primary transition-all" href="#">Về chúng tôi</a></li>
            <li><a className="hover:text-primary transition-all" href="#">Các dự án</a></li>
            <li><a className="hover:text-primary transition-all" href="#">Câu chuyện tác động</a></li>
            <li><a className="hover:text-primary transition-all" href="#">Báo cáo minh bạch</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-on-surface mb-6 font-display">Liên kết hữu ích</h4>
          <ul className="space-y-4 text-on-surface-variant font-body">
            <li><a className="hover:text-primary transition-all" href="#">Chính sách bảo mật</a></li>
            <li><a className="hover:text-primary transition-all" href="#">Điều khoản sử dụng</a></li>
            <li><a className="hover:text-primary transition-all" href="#">Quy trình quyên góp</a></li>
            <li><a className="hover:text-primary transition-all" href="#">Tuyển dụng</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-on-surface mb-6 font-display">Nhận bản tin</h4>
          <p className="text-on-surface-variant mb-4 font-body">Để lại email để cập nhật những hoạt động mới nhất.</p>
          <div className="flex gap-2">
            <input 
              className="bg-white border border-transparent focus:border-primary/20 rounded-xl p-3 w-full outline-none shadow-sm transition-all" 
              placeholder="Email của bạn" 
              type="email"
            />
            <button className="bg-primary text-white p-3 rounded-xl shadow-md hover:bg-primary-container transition-all">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-slate-200 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-on-surface-variant font-body text-sm">© 2024 Maison Chance. Kết nối những mảnh đời bất hạnh.</p>
        <div className="flex gap-6 text-sm text-slate-400">
          <span>Giấy phép số: 123/GP-NGO</span>
          <span>Thiết kế bởi MC Team</span>
        </div>
      </div>

      {/* FAB */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-40"
      >
        <Heart className="w-8 h-8 fill-white" />
      </motion.button>
    </footer>
  );
}
