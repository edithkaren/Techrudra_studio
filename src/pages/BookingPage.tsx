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
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

// Generate next 30 days for calendar
function generateDays() {
  const days: { date: Date; day: string; num: number; available: boolean }[] =
    [];
  const now = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    // Weekends unavailable
    const available = d.getDay() !== 0 && d.getDay() !== 6;
    days.push({
      date: d,
      day: dayName,
      num: d.getDate(),
      available,
    });
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
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link
            to="/"
            className="text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
          >
            &larr; Back
          </Link>
          <span className="text-sm font-bold text-stone-900">
            {siteConfig.name}
          </span>
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
                    ? "bg-[#6C3AED] text-white"
                    : "bg-stone-100 text-stone-400"
                }`}
              >
                {i < stepIndex ? "✓" : i + 1}
              </div>
              <span
                className={`text-xs font-medium ${
                  i <= stepIndex ? "text-stone-900" : "text-stone-400"
                } hidden sm:block`}
              >
                {label}
              </span>
              {i < 2 && (
                <div className="mx-1 h-px w-8 bg-stone-200 sm:w-12" />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Service selection */}
          {step === "service" && (
            <motion.div
              key="service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="mb-2 text-2xl font-bold text-stone-900">
                Choose a service
              </h1>
              <p className="mb-8 text-sm text-stone-500">
                Pick what you need — we&apos;ll match you with the right session.
              </p>
              <div className="grid gap-3">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedService(s);
                      setStep("schedule");
                    }}
                    className={`group flex items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 hover:shadow-lg hover:shadow-stone-900/[0.04] ${
                      selectedService?.id === s.id
                        ? "border-[#6C3AED] bg-[#6C3AED]/5"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold tracking-widest text-[#6C3AED]">
                        {s.number}
                      </span>
                      <h3 className="mt-1 text-base font-semibold text-stone-900">
                        {s.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-stone-400">
                        <span>{s.price}</span>
                        <span>&middot;</span>
                        <span>{s.duration}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-stone-300 transition-all group-hover:translate-x-0.5 group-hover:text-stone-600" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Schedule */}
          {step === "schedule" && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setStep("service")}
                className="mb-6 flex items-center gap-1 text-sm text-stone-400 hover:text-stone-700 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to services
              </button>
              <h1 className="mb-2 text-2xl font-bold text-stone-900">
                Pick a date &amp; time
              </h1>
              <p className="mb-2 text-sm text-stone-500">
                Selected:{" "}
                <span className="font-medium text-stone-700">
                  {selectedService?.title}
                </span>
              </p>
              <p className="mb-8 text-xs text-stone-400">
                All times are in your local timezone.
              </p>

              {/* Date grid */}
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
                  <Calendar className="h-3.5 w-3.5" /> Select a date
                </div>
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-7">
                  {days.map((d) => {
                    const isSelected =
                      selectedDate?.toDateString() === d.date.toDateString();
                    return (
                      <button
                        key={d.date.toISOString()}
                        disabled={!d.available}
                        onClick={() => setSelectedDate(d.date)}
                        className={`flex flex-col items-center rounded-xl p-2 text-center transition-all ${
                          !d.available
                            ? "cursor-not-allowed opacity-30"
                            : isSelected
                              ? "bg-[#6C3AED] text-white shadow-md shadow-[#6C3AED]/20"
                              : "bg-white text-stone-700 hover:bg-stone-50 border border-stone-200"
                        }`}
                      >
                        <span className="text-[10px] font-medium text-stone-400">
                          {d.day}
                        </span>
                        <span className="text-sm font-semibold">{d.num}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time grid */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
                    <Clock className="h-3.5 w-3.5" /> Select a time
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                          selectedTime === t
                            ? "border-[#6C3AED] bg-[#6C3AED] text-white"
                            : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Continue */}
              {selectedDate && selectedTime && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8"
                >
                  <button
                    onClick={() => setStep("checkout")}
                    className="inline-flex items-center gap-2 rounded-full bg-[#6C3AED] px-7 py-3 text-sm font-medium text-white transition-all hover:bg-[#5B2ED4] hover:shadow-lg hover:shadow-[#6C3AED]/20"
                  >
                    Continue to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 3: Checkout */}
          {step === "checkout" && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setStep("schedule")}
                className="mb-6 flex items-center gap-1 text-sm text-stone-400 hover:text-stone-700 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to schedule
              </button>
              <h1 className="mb-8 text-2xl font-bold text-stone-900">
                Confirm &amp; pay
              </h1>

              {/* Order summary */}
              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Booking Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-600">Service</span>
                    <span className="text-sm font-medium text-stone-900">
                      {selectedService?.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-600">Date</span>
                    <span className="text-sm font-medium text-stone-900">
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-600">Time</span>
                    <span className="text-sm font-medium text-stone-900">
                      {selectedTime}
                    </span>
                  </div>
                  <div className="border-t border-stone-100 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-stone-900">
                        Total
                      </span>
                      <span className="text-lg font-bold text-stone-900">
                        {selectedService?.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment placeholder */}
              <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6">
                <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
                  <CreditCard className="h-3.5 w-3.5" /> Payment Details
                </div>
                <div className="space-y-4">
                  <input
                    placeholder="Cardholder name"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-[#6C3AED] focus:bg-white"
                  />
                  <input
                    placeholder="Card number"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-[#6C3AED] focus:bg-white"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="MM / YY"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-[#6C3AED] focus:bg-white"
                    />
                    <input
                      placeholder="CVC"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-[#6C3AED] focus:bg-white"
                    />
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-stone-400">
                  This is a demo checkout. Connect Stripe or your preferred
                  payment provider to process real payments.
                </p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6C3AED] px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#5B2ED4] hover:shadow-lg hover:shadow-[#6C3AED]/20 disabled:opacity-60"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    Complete Booking — {selectedService?.price}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center py-12 text-center"
            >
              <CheckCircle2 className="mb-6 h-14 w-14 text-emerald-500" />
              <h1 className="mb-2 text-2xl font-bold text-stone-900">
                Booking confirmed!
              </h1>
              <p className="mb-2 max-w-md text-sm text-stone-500">
                We&apos;ve reserved your session for{" "}
                <span className="font-medium text-stone-700">
                  {selectedDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>{" "}
                at{" "}
                <span className="font-medium text-stone-700">
                  {selectedTime}
                </span>
                .
              </p>
              <p className="mb-8 text-xs text-stone-400">
                A confirmation email is on its way. We&apos;ll see you soon.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#6C3AED] px-7 py-3 text-sm font-medium text-white transition-all hover:bg-[#5B2ED4]"
                >
                  Back to Home
                </Link>
                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-7 py-3 text-sm font-medium text-stone-700 transition-all hover:border-stone-300"
                >
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
