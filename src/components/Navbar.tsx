import { motion } from "motion/react";

const navLinks = [
  { name: "Trang chủ", href: "#", active: true },
  { name: "Về chúng tôi", href: "#" },
  { name: "Chương trình", href: "#" },
  { name: "Minh bạch", href: "#" },
  { name: "Tin tức", href: "#" },
  { name: "Liên hệ", href: "#" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-card !bg-white/70 border-b border-white/20">
      <div className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto w-full">
        <div className="text-2xl font-extrabold text-primary tracking-tight font-display">
          Maison Chance
        </div>
        
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`${
                link.active
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary transition-colors"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <button className="px-5 py-2.5 bg-secondary-container text-on-secondary-container font-semibold rounded-lg active:scale-95 transition-transform">
            Tình nguyện
          </button>
          <button className="px-6 py-2.5 bg-primary-container text-white font-bold rounded-lg shadow-lg active:scale-95 transition-transform">
            Quyên góp
          </button>
        </div>
      </div>
    </nav>
  );
}
