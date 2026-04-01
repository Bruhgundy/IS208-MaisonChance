import { motion } from "motion/react";
import { Heart, CheckCircle, HandHelping } from "lucide-react";

const stats = [
  {
    icon: <Heart className="w-8 h-8" />,
    value: "1,500+",
    label: "Người được giúp đỡ hàng năm",
    color: "bg-blue-100",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    value: "45",
    label: "Dự án cộng đồng hoàn thành",
    color: "bg-blue-100",
  },
  {
    icon: <HandHelping className="w-8 h-8" />,
    value: "$2M+",
    label: "Tổng kinh phí đã quyên góp",
    color: "bg-blue-100",
  },
];

export default function ImpactStats() {
  return (
    <section className="py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card p-10 rounded-2xl text-center group transition-all duration-300"
          >
            <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <h3 className="text-3xl font-extrabold text-on-background mb-2">{stat.value}</h3>
            <p className="text-on-surface-variant font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
