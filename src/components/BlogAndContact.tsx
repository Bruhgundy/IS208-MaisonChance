import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    category: "Dự án mới",
    title: "Mở rộng cơ sở vật lý trị liệu tại Đắk Nông",
    description: "Nhằm đáp ứng nhu cầu ngày càng tăng, chúng tôi chính thức khánh thành khu phục hồi chức năng mới...",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPuotnj7REXVpOVXbZjfgNY1t2Vx5GZnPHGS7AHozGz9XqBHECrq0xVvsTBf7k_K5YU1n2zphswHaMXrf0NMTrjvgM2CUHxCn21GCt5EKOPanP48HglideFBFdoVk438djwlsru7BVHYrtY0jhbnmZfRyd2t5_AYh8v9fsLhdkrmbD0PQ1hSD4NIU29i9eOfUhK5h0DAiegnifKmefC2hzVTVOgCC49-qTX1zZeQwzMzkYlzi8gtddH2SYsWjjygFanR3Qr_AS8mc",
  },
  {
    category: "Câu chuyện",
    title: "Hành trình tìm lại ước mơ của Nam",
    description: "Từ một tai nạn biến cố, Nam đã tìm thấy niềm đam mê với công nghệ thông tin tại Maison Chance...",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSYLG1fWzSz6xY1quRoHxQ763G7fL7Ho0aAcAqyqNNAEdU5iYZeuaDyUAGzj1ZYeBXg7R_XmaaWeZciQwX0ZJvFVHKHtrJ10RzNYXqoqvJZxjUIv6rAQZFS4IjoHSH_6v5ulUuk7fqLc8BEW2fwFAPxtaSHWUiaK2GfNkxA90MwHo3dOmACe6o_SCxaGQKuQfbcOXhe7Bo0bFoc93aavdpAnFRXhEQyfYtEcfr1eumH1e48y5IIZqs1N_n1vp305dkLmyraiPh5kQ",
  },
  {
    category: "Sự kiện",
    title: "Ngày hội Tình nguyện viên 2024",
    description: "Hơn 200 tình nguyện viên đã tham gia các hoạt động cải tạo môi trường sống cho trung tâm...",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD6Zw0drEgFf68K-NWTZcq7k5DOYNsbktmDa2qNO3uxq-9u7NFNfxRS1HCUUyPlL9oHD3JP2-RUYOxxQ_ZauvR62nY7tcVHT_JVhBsxKWGoaD6Y4SRngD42oGi-QdCt-iIQDHLqlmeYTmfxGftSnzR2acQlZzYJLGOSpxLiYpz4dEQx5VPiKLiuaBZPgATKCjshXlIOhRuBi_aazqxnBTr9p_cuqM2rTQbFWoq04ynSOt6ytCyUC_MMo1b9Odd7u_XUBHJguMdvlg",
  },
];

export default function BlogAndContact() {
  return (
    <>
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-2">
              <h2 className="font-display text-4xl font-bold text-on-background">Tin tức mới nhất</h2>
              <p className="text-on-surface-variant font-body">Cập nhật những hoạt động và câu chuyện truyền cảm hứng từ Maison Chance.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              Xem tất cả tin tức <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src={article.image} 
                    alt={article.title}
                  />
                </div>
                <span className="text-sm font-bold text-primary mb-2 block uppercase tracking-wider">{article.category}</span>
                <h4 className="text-xl font-bold text-on-background mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-on-surface-variant line-clamp-2 font-body">
                  {article.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-8 bg-surface-container-low">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto glass-card rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row gap-16 shadow-2xl"
        >
          <div className="md:w-1/2 space-y-8">
            <h2 className="font-display text-4xl font-bold text-on-background">Kết nối với chúng tôi</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Mọi thắc mắc hoặc mong muốn đóng góp, xin đừng ngần ngại liên hệ với Maison Chance.
            </p>
            <div className="space-y-6">
              {[
                { icon: "location_on", label: "Địa chỉ", val: "19A, Đường số 1, Kp 9, P. Bình Hưng Hoà A, Q. Bình Tân, TP. HCM" },
                { icon: "call", label: "Điện thoại", val: "+84 (28) 38 16 54 51" },
                { icon: "mail", label: "Email", val: "contact@maison-chance.org" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-background">{item.label}</p>
                    <p className="text-on-surface-variant">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:w-1/2 bg-white/40 p-8 rounded-2xl border border-white/60">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Họ và tên</label>
                  <input className="w-full p-4 rounded-xl bg-white border border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all" placeholder="Nguyễn Văn A" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Email</label>
                  <input className="w-full p-4 rounded-xl bg-white border border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all" placeholder="example@email.com" type="email"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">Tiêu đề</label>
                <input className="w-full p-4 rounded-xl bg-white border border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all" placeholder="Tôi muốn hỏi về..." type="text"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">Tin nhắn</label>
                <textarea className="w-full p-4 rounded-xl bg-white border border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all" placeholder="Nhập nội dung của bạn..." rows={4}></textarea>
              </div>
              <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Gửi tin nhắn
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </>
  );
}
