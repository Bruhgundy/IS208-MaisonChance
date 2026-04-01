import { motion } from "motion/react";
import { Stethoscope, GraduationCap, Briefcase, ArrowRight } from "lucide-react";

const programs = [
  {
    title: "Chăm sóc y tế",
    description: "Cung cấp các dịch vụ phục hồi chức năng, vật lý trị liệu và chăm sóc đặc biệt cho người khuyết tật.",
    icon: <Stethoscope className="w-8 h-8" />,
    highlight: false,
  },
  {
    title: "Giáo dục",
    description: "Duy trì các lớp học miễn phí từ cấp tiểu học cho trẻ em có hoàn cảnh khó khăn và trẻ khuyết tật.",
    icon: <GraduationCap className="w-8 h-8" />,
    highlight: true,
  },
  {
    title: "Đào tạo nghề",
    description: "Đào tạo kỹ năng làm bánh, thủ công mỹ nghệ và công nghệ thông tin giúp người khuyết tật tự lập.",
    icon: <Briefcase className="w-8 h-8" />,
    highlight: false,
  },
];

export default function CorePrograms() {
  return (
    <section className="py-24 px-8 bg-surface-container-low/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-4xl font-bold text-on-background">Các Chương Trình Trọng Điểm</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Chúng tôi tập trung vào việc tạo ra các giải pháp bền vững giúp thay đổi cuộc sống của những người yếu thế.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-8 rounded-2xl group border-2 ${
                program.highlight ? "border-primary/20 bg-primary/5" : "border-transparent"
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                program.highlight ? "bg-primary text-white" : "bg-primary-container/20 text-primary"
              }`}>
                {program.icon}
              </div>
              <h4 className="text-xl font-bold text-on-background mb-4">{program.title}</h4>
              <p className="text-on-surface-variant mb-6 leading-relaxed">
                {program.description}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                Tìm hiểu thêm <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
