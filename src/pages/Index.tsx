import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Zap, Smartphone, ArrowRight } from "lucide-react";

const features = [
  { icon: Shield, title: "Bank-Grade Security", desc: "256-bit encryption and multi-factor authentication" },
  { icon: Zap, title: "Instant Transfers", desc: "Send money anywhere in seconds, 24/7" },
  { icon: Smartphone, title: "Mobile First", desc: "Beautiful experience on every device" },
];

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-dark)" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 sm:px-12 py-5">
        <h1 className="text-2xl font-display font-bold gradient-text">KodBank</h1>
        <div className="flex gap-3">
          <Link to="/login" className="px-5 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="btn-primary-glow px-5 py-2 text-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 border border-primary/20">
            ✨ The Future of Digital Banking
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-bold leading-tight mb-6">
            Banking Made{" "}
            <span className="gradient-text">Simple</span>,{" "}
            <span className="gradient-gold-text">Secure</span> &{" "}
            <span className="gradient-text">Smart</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Experience next-generation banking with KodBank. Manage your finances, track spending, and grow your wealth — all from one beautiful dashboard.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="btn-primary-glow px-8 py-3.5 text-sm flex items-center gap-2">
              Open Your Account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="glass-card p-6 text-center group hover:border-primary/30 transition-colors"
            >
              <div className="h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-8 text-center text-sm text-muted-foreground">
        © 2026 KodBank. All rights reserved. Your money, your control.
      </footer>
    </div>
  );
};

export default Index;
