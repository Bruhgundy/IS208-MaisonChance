import { motion } from "motion/react";
import { PlayCircle, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wider uppercase">
            Vì một tương lai tươi sáng
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-on-background leading-tight">
            Chắp Cánh Ước Mơ,<br />
            <span className="text-primary">Thắp Sáng Tương Lai</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl font-body leading-relaxed">
            Maison Chance cung cấp một mái ấm, chăm sóc y tế và đào tạo nghề cho những người khuyết tật và trẻ em mồ côi tại Việt Nam.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl hover:bg-primary-container transition-all">
              Bắt đầu hành trình
            </button>
            <button className="px-8 py-4 glass-card font-semibold text-primary rounded-xl flex items-center gap-2">
              <PlayCircle className="w-6 h-6" />
              Xem video câu chuyện
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] relative">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbIvWpJxFUIWK5Ok50SOJOqgPKpiCCbEtPdVnRgZUztTejC49ne14K4mxt2_-WoyWKQZe9oRyFXo2G_KK0E2jQ7CZx7Z8DYYtlGSQlm3Gzv79IaL2WZgCot9Uun4Hsi0JLU8P-vk9Q0awdbO1-SxGjOxzAiSAeaKJKqkPh1eV7oPh-PPgtzvIm0t4FbQX5b_m0gpWXGF044Af1-S-G9YkoCIrnND4mwZBnUSUlfqgEKU3HK9qDhcheU2_IOMeFNAdYGyrcAqIJ384" 
              alt="Maison Chance Foundation"
            />
            <div className="absolute bottom-6 left-6 right-6 glass-card p-6 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-on-background">1,500+</p>
                  <p className="text-sm font-medium text-on-surface-variant">Người được giúp đỡ</p>
                </div>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img 
                      src={`https://lh3.googleusercontent.com/aida-public/AB6AXuDCrMzGT9gsyp3pWzYMQiHFB8ECiMYRDHHJzunXAxTeq2QxSvKET1ZSPpdbEjrYMOhXz7VwbScfvyxfZfjn1iQHrOkgsYxDtyFxia6PMuWKK5QxS2Pf-wCTAkhJiUeSpw5qLk_AkRlADRDIfSt28MCuEx03XaRFSvNomBZ0IvR2hBx8YG6KhONr8ZDhF072qNgQC5EKzCKP5PCYpLSL_FwCXc07SIrP-90d2wrZ-3rlEL7vggplMB3PYk34hCjj5VznUD6hIbATWJ0`} 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
}
