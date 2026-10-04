import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Clock, Globe, Linkedin, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const e = [
      { name: "About", href: "/about" },
      { name: "Link Building", href: "/services/link-building" },
      { name: "Digital PR", href: "/services/digital-pr" },
      { name: "Brand Mentions", href: "/services/brand-mentions" },
      { name: "HARO & Expert Quotes", href: "/services/haro-links" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
      { name: "Pricing", href: "/pricing" },
    ],
    s: Variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    },
    a: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      },
    };
  return (
    <footer className="bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid lg:grid-cols-3 gap-12 lg:gap-16"
          variants={s}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={a}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-navy-dark font-bold text-lg">tm</span>
              </div>
              <span className="font-semibold text-lg text-white">
                Talha Mahmood
              </span>
            </div>
            <p className="text-white/60 leading-relaxed mb-6">
              Premium link building for ambitious brands. Helping businesses
              acquire high-quality backlinks and achieve top rankings through
              strategic outreach and relationship building.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="/contact"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-blue-accent hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Globe className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="/contact"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-blue-accent hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
          <motion.div variants={a}>
            <h3 className="text-white font-semibold mb-6">Helpful Links</h3>
            <div className="grid grid-cols-2 gap-3">
              {e.map((r, c) => (
                <motion.a
                  key={c}
                  href={r.href}
                  className="block py-2.5 text-white/60 hover:text-brand-soft transition-colors text-sm"
                  whileHover={{ x: 3 }}
                >
                  {r.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div variants={a}>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <motion.div
                className="flex items-start gap-3"
                whileHover={{ x: 3 }}
              >
                <MapPin className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/60 text-sm">Location:</span>
                  <p className="text-white/80">Faisalabad, Pakistan</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start gap-3"
                whileHover={{ x: 3 }}
              >
                <Clock className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/60 text-sm">Timezone:</span>
                  <p className="text-white/80">UTC+5 (PKT)</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start gap-3"
                whileHover={{ x: 3 }}
              >
                <Mail className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/60 text-sm">Email:</span>
                  <p className="text-white/80">contact@talhamahmood.com</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-white/60 text-sm">
            © 2026 Talha Mahmood | Link Building Agency | All rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            Designed and developed with passion
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
