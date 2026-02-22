import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { LogOut, Eye, CreditCard, ArrowUpRight, ArrowDownLeft, BarChart3, Wallet, Send, QrCode } from "lucide-react";
import BankBroChatbot from "@/components/BankBroChatbot";

interface Profile {
  full_name: string;
  user_code: string;
  email: string;
  phone: string;
  account_balance: number;
}

const dummyTransactions = [
  { id: 1, name: "Netflix Subscription", amount: -499, date: "Feb 20, 2026", type: "debit" },
  { id: 2, name: "Salary Credit", amount: 85000, date: "Feb 18, 2026", type: "credit" },
  { id: 3, name: "Amazon Shopping", amount: -2340, date: "Feb 16, 2026", type: "debit" },
  { id: 4, name: "UPI Transfer", amount: -1500, date: "Feb 15, 2026", type: "debit" },
  { id: 5, name: "Freelance Payment", amount: 15000, date: "Feb 14, 2026", type: "credit" },
];

const quickActions = [
  { icon: Send, label: "Transfer" },
  { icon: QrCode, label: "Scan & Pay" },
  { icon: CreditCard, label: "Cards" },
  { icon: BarChart3, label: "Analytics" },
];

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showBalance, setShowBalance] = useState(false);
  const [balanceRevealed, setBalanceRevealed] = useState(false);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("full_name, user_code, email, phone, account_balance")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => {
          if (data) setProfile(data);
        });
    }
  }, [user]);

  const revealBalance = () => {
    setShowBalance(true);
    setTimeout(() => {
      setBalanceRevealed(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#2dd4bf", "#f59e0b", "#3b82f6", "#a78bfa"],
      });
    }, 300);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="min-h-screen pb-8" style={{ background: "var(--gradient-dark)" }}>
      {/* Header */}
      <header className="glass-card rounded-none border-x-0 border-t-0 px-4 sm:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-display font-bold gradient-text">KodBank</h1>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-muted-foreground">
            Welcome, <span className="text-foreground font-medium">{profile?.full_name || "User"}</span>
          </span>
          <button onClick={signOut} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 mt-6 space-y-6">
        {/* Profile + Balance Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold" style={{ background: "var(--gradient-primary)" }}>
                {profile?.full_name?.charAt(0) || "U"}
              </div>
              <div>
                <h2 className="text-lg font-display font-semibold">{profile?.full_name}</h2>
                <p className="text-sm text-muted-foreground">ID: {profile?.user_code}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{profile?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span>{profile?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Type</span>
                <span className="text-primary font-medium">Premium Savings</span>
              </div>
            </div>
          </motion.div>

          {/* Balance Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Available Balance</span>
              </div>

              <AnimatePresence mode="wait">
                {!showBalance ? (
                  <motion.div key="hidden" className="flex items-center gap-2 my-4">
                    <span className="text-3xl font-display font-bold tracking-wide text-muted-foreground">₹ • • • • • •</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="visible"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="my-4"
                  >
                    <span className="text-4xl font-display font-bold gradient-gold-text">
                      {formatCurrency(profile?.account_balance || 100000)}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!balanceRevealed ? (
              <button onClick={revealBalance} className="btn-primary-glow py-3 flex items-center justify-center gap-2 mt-2">
                <Eye className="h-4 w-4" /> Show Available Balance
              </button>
            ) : (
              <p className="text-xs text-muted-foreground text-center mt-2">Balance last updated: Just now</p>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button key={action.label} className="glass-card p-4 flex flex-col items-center gap-2 hover:border-primary/30 transition-colors group">
              <action.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xs text-muted-foreground">{action.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Transactions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {dummyTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${tx.type === "credit" ? "bg-primary/10" : "bg-destructive/10"}`}>
                    {tx.type === "credit" ? (
                      <ArrowDownLeft className="h-4 w-4 text-primary" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${tx.type === "credit" ? "text-primary" : "text-destructive"}`}>
                  {tx.type === "credit" ? "+" : ""}
                  {formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <BankBroChatbot />
    </div>
  );
};

export default Dashboard;
