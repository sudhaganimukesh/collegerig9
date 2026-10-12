"use client";

import * as React from "react";
import { Sparkles, X, CheckCircle2, MessageSquare, Bell, FileText, Send, Zap } from "lucide-react";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProModal({ isOpen, onClose }: ProModalProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [emailOrPhone, setEmailOrPhone] = React.useState("");
  const [contactError, setContactError] = React.useState("");
  const [branch, setBranch] = React.useState("cse-aiml");
  const [college, setCollege] = React.useState("KPRIT Hyderabad");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = emailOrPhone.trim();

    // Check email or 10-digit phone
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    const isPhone = /^[6-9]\d{9}$/.test(trimmed.replace(/[\s-+]/g, ""));

    if (!trimmed) {
      setContactError("Email or WhatsApp number is required.");
      return;
    }

    if (!isEmail && !isPhone) {
      setContactError("Please enter a valid student email or 10-digit mobile number.");
      return;
    }

    setContactError("");
    try {
      const waitlist = JSON.parse(localStorage.getItem("collegerig-pro-waitlist") || "[]");
      waitlist.push({
        contact: trimmed,
        branch,
        college,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("collegerig-pro-waitlist", JSON.stringify(waitlist));
    } catch {
      // ignore local storage errors
    }
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl text-card-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="tap-target absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">CollegeRig Pro</h3>
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                Early Access Teaser
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Premium superpowers for Indian engineering students</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-bold text-foreground">You&apos;re on the VIP Waitlist!</h4>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              We&apos;ve reserved your priority spot. When the next Indian festive sale or student clearance drops, you will get instant alerts for {college}.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Back to Free Catalog
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-5">
            {/* Feature Perks */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-muted/30 p-3">
                <Bell className="mt-0.5 h-5 w-5 text-amber-500 shrink-0" />
                <div className="text-xs space-y-0.5">
                  <p className="font-semibold text-foreground">WhatsApp Sale Price Alerts</p>
                  <p className="text-muted-foreground">
                    Direct notification when your shortlisted laptop hits an all-time low price or extra ₹3,000 student card discount.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-muted/30 p-3">
                <MessageSquare className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                <div className="text-xs space-y-0.5">
                  <p className="font-semibold text-foreground">1-on-1 Senior Student Consult</p>
                  <p className="text-muted-foreground">
                    15-minute quick chat with 3rd/4th year seniors who run the exact lab software (AutoCAD, Vivado, Android Studio) on your candidate machine.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-muted/30 p-3">
                <FileText className="mt-0.5 h-5 w-5 text-teal-500 shrink-0" />
                <div className="text-xs space-y-0.5">
                  <p className="font-semibold text-foreground">Custom Syllabus Spec Validator</p>
                  <p className="text-muted-foreground">
                    Upload your university branch PDF curriculum to verify every subject&apos;s tooling demands across 8 semesters.
                  </p>
                </div>
              </div>
            </div>

            {/* Waitlist Form */}
            <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Join the Free Early-Access Pilot
                </h4>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Free for KPRIT & Indian university students during the 2026 pilot session. No payment required.
              </p>

              <div>
                <label className="text-[11px] font-semibold text-foreground block mb-1">
                  Email or WhatsApp Number <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. rahul.cse@kprit.ac.in or 9876543210"
                  value={emailOrPhone}
                  onChange={(e) => {
                    setEmailOrPhone(e.target.value);
                    if (contactError) setContactError("");
                  }}
                  className={`w-full rounded-lg border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                    contactError
                      ? "border-destructive focus:ring-destructive"
                      : "border-border focus:ring-primary"
                  }`}
                  aria-invalid={Boolean(contactError)}
                />
                {contactError && (
                  <p className="mt-1 text-[11px] font-medium text-destructive">
                    {contactError}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-foreground block mb-1">
                    Your Branch
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="cse-aiml">CSE / AI & ML</option>
                    <option value="ece">ECE / Embedded</option>
                    <option value="mech">Mechanical</option>
                    <option value="civil">Civil</option>
                    <option value="design">UI/UX & Design</option>
                    <option value="commerce">Commerce</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-foreground block mb-1">
                    College / Campus
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Get Early Pro Access</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
