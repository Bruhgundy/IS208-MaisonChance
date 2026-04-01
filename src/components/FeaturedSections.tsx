import { motion } from "motion/react";
import { ShieldCheck, BarChart3 } from "lucide-react";

export default function FeaturedSections() {
  return (
    <>
      {/* Featured Activity */}
      <section className="py-24 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-20 space-y-8">
              <h2 className="font-display text-4xl font-bold text-on-background">Hoạt động tiêu biểu</h2>
              <p className="text-on-surface-variant leading-relaxed text-lg font-body">
                Hàng tháng, Maison Chance tổ chức các buổi lễ tốt nghiệp và triển lãm dự án của các học viên, đánh dấu những cột mốc quan trọng trong sự nghiệp tự lập của họ.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-lg"
                >
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuASfirvfu0s_epOoP9nnN1qAlBmuX-lCbFUKPE16ObEM6uwOM1_rZA2tEzraCFGZ1yodTVFKBxWmEDmaUFAPKG94p8rsYUBI25QG6ps_qL8Rrj9pX67zBUuTJlyApU0yz_NAHnivKqmqO6p4kHz5K0Rfu04JmVgV63qoJVszWke20eAG5XfOWZT2CWFxdH8jGH-IV6koGgQXq4-U6IFn64YA0sIRDUm3bZWJZuH_AgDKPfwlr8qwUAntFAsC5fGHzf_FlazTNG2RJI" 
                    alt="Graduation ceremony"
                  />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-lg translate-y-8"
                >
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmRZQxmDju2ZmIQJ51t9o5Iq25Y6wEi2_ifCL7rWOWs58P3gbFIZ3qMbPtaTa63BVC3XopLeZ9Y_pfGVQpqpIp4lE8qVIWrl6mniRjnsltIrxlQQ9xFDhUYBu8yoTow_bK4LftmQ8OiRAG7Y5ypXRDqj8IQO9X-jMtHQWwGM9FoUAOw6rVizyn8P5H--hD6UBjcJd0C0QOOT1TXLdPNgRukj09jZOjwcHva2B4tSigT6OVeolKuWNUkffUkFVdBrlbuHssVGkAwW0" 
                    alt="Workshop"
                  />
                </motion.div>
              </div>
            </div>
            <div className="lg:w-1/2 relative min-h-[400px]">
              <img 
                className="absolute inset-0 w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzgrLTCpOEv9MQ4QKFhwqEIgnneuCIi1OTtWW0WRlUCmNiqAtnQ_hmWxz3jwalm9v5UA1j9VZuYRUhBjVYp8XiNAubuZMG-L09EJocGkSJfgP8GSIw0DUboWzH9Q2ShOyzgYVuSCjYfYTXdjSrLh9tLMCUZYkN9Ktmk_cPeEl8HORc40UUaDEz7M7_HSc4P0qdmiSK1hWN_2pLXdLZ_tsjcQezuR6nSbo97WqVMYhG0xOnVf-j6Ur6LRZaB19xu7WvJZxlo9irNak" 
                alt="Community gathering"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-24 px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-display text-4xl font-bold mb-8">Sự minh bạch của chúng tôi</h2>
            <p className="text-primary-container text-lg mb-12 leading-relaxed">
              Chúng tôi cam kết sự minh bạch tuyệt đối trong việc sử dụng ngân sách. Mỗi đồng quyên góp đều được theo dõi và báo cáo định kỳ.
            </p>
            <div className="space-y-10">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">Dành cho người thụ hưởng</span>
                  <span className="text-secondary-container font-bold text-2xl">90%</span>
                </div>
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-secondary-container rounded-full shadow-[0_0_20px_rgba(110,207,253,0.4)]" 
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">Chi phí vận hành</span>
                  <span className="text-white/60 font-bold text-2xl">10%</span>
                </div>
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "10%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-white/40 rounded-full" 
                  />
                </div>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-dark p-10 rounded-3xl"
          >
            <div className="flex flex-col gap-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-container shrink-0">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Kiểm toán độc lập</h4>
                  <p className="text-white/70">Báo cáo tài chính hàng năm được thực hiện bởi các công ty kiểm toán hàng đầu.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-container shrink-0">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Báo cáo tác động</h4>
                  <p className="text-white/70">Công khai chi tiết các dự án và số lượng người được hưởng lợi trực tiếp.</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-12 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              Tải báo cáo thường niên 2023
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
