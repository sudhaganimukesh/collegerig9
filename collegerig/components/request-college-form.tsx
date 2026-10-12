"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Send, CheckCircle2, GraduationCap, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function RequestCollegeForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = React.useState(false);
  const [collegeName, setCollegeName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [errors, setErrors] = React.useState<{ collegeName?: string; city?: string; email?: string }>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors: { collegeName?: string; city?: string; email?: string } = {};

    if (!collegeName.trim()) {
      newErrors.collegeName = "College name is required.";
    } else if (collegeName.trim().length < 3) {
      newErrors.collegeName = "Please enter full college or institute name.";
    }

    if (!city.trim()) {
      newErrors.city = "City / location is required.";
    } else if (city.trim().length < 2) {
      newErrors.city = "Please enter a valid city name.";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid student email address (e.g. name@college.ac.in).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ collegeName: true, city: true, email: true });

    if (!validate()) {
      return;
    }

    try {
      const requests = JSON.parse(localStorage.getItem("collegerig-campus-requests") || "[]");
      requests.push({
        collegeName: collegeName.trim(),
        city: city.trim(),
        email: email.trim(),
        notes: notes.trim(),
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("collegerig-campus-requests", JSON.stringify(requests));
      trackEvent("college_request_submitted", { college: collegeName, city });
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h4 className="text-base font-bold text-foreground">Request Received for {collegeName}!</h4>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Thanks for helping expand CollegeRig! Our team will reach out to student seniors and map local service centers in {city} next.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          <button
            onClick={() => {
              setSubmitted(false);
              setCollegeName("");
              setCity("");
              setEmail("");
              setNotes("");
              setTouched({});
              setErrors({});
            }}
            className="text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
          >
            Submit another college
          </button>
          <span className="text-muted-foreground hidden sm:inline">•</span>
          <button
            onClick={() => router.push("/thank-you")}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            View Confirmation Details →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <GraduationCap className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">Request Your Campus Guide</h3>
          <p className="text-[11px] text-muted-foreground">Bring CollegeRig bus commute & service center mapping to your college</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-[11px] font-semibold text-foreground mb-1">
            College / Institute Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. CBIT, VNR VJIET, JNTUH..."
            value={collegeName}
            onBlur={() => handleBlur("collegeName")}
            onChange={(e) => {
              setCollegeName(e.target.value);
              if (touched.collegeName) validate();
            }}
            className={`w-full rounded-lg border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
              touched.collegeName && errors.collegeName
                ? "border-destructive focus:ring-destructive"
                : "border-border focus:ring-primary"
            }`}
            aria-invalid={Boolean(touched.collegeName && errors.collegeName)}
            aria-describedby={touched.collegeName && errors.collegeName ? "college-name-error" : undefined}
          />
          {touched.collegeName && errors.collegeName && (
            <p id="college-name-error" className="mt-1 flex items-center gap-1 text-[11px] font-medium text-destructive">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.collegeName}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-foreground mb-1">
            City / Location <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Hyderabad, Warangal, Bangalore..."
            value={city}
            onBlur={() => handleBlur("city")}
            onChange={(e) => {
              setCity(e.target.value);
              if (touched.city) validate();
            }}
            className={`w-full rounded-lg border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
              touched.city && errors.city
                ? "border-destructive focus:ring-destructive"
                : "border-border focus:ring-primary"
            }`}
            aria-invalid={Boolean(touched.city && errors.city)}
            aria-describedby={touched.city && errors.city ? "city-error" : undefined}
          />
          {touched.city && errors.city && (
            <p id="city-error" className="mt-1 flex items-center gap-1 text-[11px] font-medium text-destructive">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.city}</span>
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-foreground mb-1">
          Student Email (Optional)
        </label>
        <input
          type="email"
          placeholder="e.g. student@college.ac.in"
          value={email}
          onBlur={() => handleBlur("email")}
          onChange={(e) => {
            setEmail(e.target.value);
            if (touched.email) validate();
          }}
          className={`w-full rounded-lg border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
            touched.email && errors.email
              ? "border-destructive focus:ring-destructive"
              : "border-border focus:ring-primary"
          }`}
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby={touched.email && errors.email ? "email-error" : undefined}
        />
        {touched.email && errors.email && (
          <p id="email-error" className="mt-1 flex items-center gap-1 text-[11px] font-medium text-destructive">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-foreground mb-1">
          Special Notes or Lab Requirements
        </label>
        <textarea
          rows={2}
          placeholder="e.g. Need good battery because hostel has load shedding, or CSE labs mandate Linux..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
      >
        <Send className="h-3.5 w-3.5" />
        <span>Submit Campus Request</span>
      </button>
    </form>
  );
}
