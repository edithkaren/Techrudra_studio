import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  CreditCard,
} from "lucide-react";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

type Step = "service" | "schedule" | "checkout" | "success";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM",
];

function generateDays() {
  const days: { date: Date; day: string; num: number; available: boolean }[] = [];
  const now = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const available = d.getDay() !== 0 && d.getDay() !== 6;
    days.push({ date: d, day: dayName, num: d.getDate(), available });
  }
  return days;
}

export default function BookingPage() {
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const days = generateDays();
  const stepIndex = step === "service" ? 0 : step === "schedule" ? 1 : step === "checkout" ? 2 : 3;

  const handleCheckout = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setStep("success");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link to="/" className="text-sm font-medium text-white/40 transition-colors hover:text-white">
            &larr; Back
          </Link>
          <span className="text-sm font-bold text-white">{siteConfig.name}</span>
          <div className="w-16" />
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 pt-28 pb-20">
        {/* Progress steps */}
        <div className="mb-12 flex items-center justify-center gap-2">
          {["Service", "Schedule", "Checkout"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  i <= stepIndex
                    ? "bg-[#A78BFA] text-black"
                    : "bg-white/[0.05] text-white/25"
                }`}
              >
                {i < stepIndex ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-medium ${i <= stepIndex ? "text-white" : "text-white/25"} hidden sm:block`}>
                {label}
              </span>
              {i < 2 && <div className="mx-1 h-px w-8 bg-white/[0.06] sm:w-12" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === "service" && (
            <motion.div key="service" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h1 className="mb-2 text-2xl font-bold text-white">Choose a service</h1>
              <p className="mb-8 text-sm text-white/40">Pick what you need — we&apos;ll match you with the right session.</p>
              <div className="grid gap-3">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSelectedService(s); setStep("schedule"); }}
                    className={`group flex items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                      selectedService?.id === s.id
                        ? "border-[#A78BFA] bg-[#A78BFA]/5"
                        : "border-white/[0.06] bg-[#111] hover:border-white/[0.12]"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold tracking-widest text-[#A78BFA]">{s.number}</span>
                      <h3 className="mt-1 text-base font-semibold text-white">{s.title}</h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-white/30">
                        <span>{s.price}</span>
                        <span>&middot;</span>
                        <span>{s.duration}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/20 transition-all group-hover:translate-x-0.5 group-hover:text-white/50" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === "schedule" && (
            <motion.div key="schedule" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <button onClick={() => setStep("service")} className="mb-6 flex items-center gap-1 text-sm text-white/30 hover:text-white/60 transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to services
              </button>
              <h1 className="mb-2 text-2xl font-bold text-white">Pick a date &amp; time</h1>
              <p className="mb-2 text-sm text-white/40">
                Selected: <span className="font-medium text-white/60">{selectedService?.title}</span>
              </p>
              <p className="mb-8 text-xs text-white/25">All times are in your local timezone.</p>

              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/25">
                  <Calendar className="h-3.5 w-3.5" /> Select a date
                </div>
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-7">
                  {days.map((d) => {
                    const isSelected = selectedDate?.toDateString() === d.date.toDateString();
                    return (
                      <button
                        key={d.date.toISOString()}
                        disabled={!d.available}
                        onClick={() => setSelectedDate(d.date)}
                        className={`flex flex-col items-center rounded-xl p-2 text-center transition-all ${
                          !d.available
                            ? "cursor-not-allowed opacity-30"
                            : isSelected
                              ? "bg-[#A78BFA] text-black shadow-md shadow-[#A78BFA]/20"
                              : "bg-white/[0.03] text-white/50 hover:bg-white/[0.06] border border-white/[0.06]"
                        }`}
                      >
                        <span className="text-[10px] font-medium text-white/30">{d.day}</span>
                        <span className="text-sm font-semibold">{d.num}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedDate && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/25">
                    <Clock className="h-3.5 w-3.5" /> Select a time
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                          selectedTime === t
                            ? "border-[#A78BFA] bg-[#A78BFA] text-black"
                            : "border-white/[0.06] bg-white/[0.03] text-white/50 hover:border-white/[0.12]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedDate && selectedTime && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
                  <button
                    onClick={() => setStep("checkout")}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all hover:bg-white/90"
                  >
                    Continue to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 3 */}
          {step === "checkout" && (
            <motion.div key="checkout" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <button onClick={() => setStep("schedule")} className="mb-6 flex items-center gap-1 text-sm text-white/30 hover:text-white/60 transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to schedule
              </button>
              <h1 className="mb-8 text-2xl font-bold text-white">Confirm &amp; pay</h1>

              <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/25">Booking Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">Service</span>
                    <span className="text-sm font-medium text-white/70">{selectedService?.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">Date</span>
                    <span className="text-sm font-medium text-white/70">
                      {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">Time</span>
                    <span className="text-sm font-medium text-white/70">{selectedTime}</span>
                  </div>
                  <div className="border-t border-white/[0.06] pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">Total</span>
                      <span className="text-lg font-bold text-white">{selectedService?.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/[0.06] bg-[#111] p-6">
                <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/25">
                  <CreditCard className="h-3.5 w-3.5" /> Payment Details
                </div>
                <div className="space-y-4">
                  <input placeholder="Cardholder name" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA]" />
                  <input placeholder="Card number" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA]" />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="MM / YY" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA]" />
                    <input placeholder="CVC" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#A78BFA]" />
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-white/20">
                  This is a demo checkout. Connect Stripe or your preferred payment provider to process real payments.
                </p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-all hover:bg-white/90 disabled:opacity-60"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                ) : (
                  <>
                    Complete Booking — {selectedService?.price}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Success */}
          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex flex-col items-center py-12 text-center">
              <CheckCircle2 className="mb-6 h-14 w-14 text-[#2DD4BF]" />
              <h1 className="mb-2 text-2xl font-bold text-white">Booking confirmed!</h1>
              <p className="mb-2 max-w-md text-sm text-white/40">
                We&apos;ve reserved your session for{" "}
                <span className="font-medium text-white/60">
                  {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </span>{" "}
                at <span className="font-medium text-white/60">{selectedTime}</span>.
              </p>
              <p className="mb-8 text-xs text-white/25">A confirmation email is on its way. We&apos;ll see you soon.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all hover:bg-white/90">
                  Back to Home
                </Link>
                <a href="#portfolio" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/20">
                  View Our Work
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
