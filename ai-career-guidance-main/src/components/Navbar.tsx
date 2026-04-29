import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Menu, X, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { href: "#overview", label: "Overview" },
  { href: "#architecture", label: "Architecture" },
  { href: "#database", label: "Database" },
  { href: "#tech", label: "Tech Stack" },
  { href: "#testing", label: "Testing" },
  { href: "#team", label: "Team" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 text-foreground font-bold">
          <Brain className="w-6 h-6 text-primary" />
          <span className="hidden sm:inline">CareerAI</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
          ))}
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all">
            <LogIn className="w-4 h-4" /> Login
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-b border-border bg-background"
          >
            <div className="px-6 py-4 space-y-3">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">{l.label}</a>
              ))}
              <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm text-primary font-medium">
                <LogIn className="w-4 h-4" /> Login / Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
