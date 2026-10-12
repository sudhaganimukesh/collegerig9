"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    trackEvent("page_view", {
      pathname,
      search: searchParams?.toString() || "",
    });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
