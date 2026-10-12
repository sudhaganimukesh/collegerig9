"use client";

import * as React from "react";

const COMPARE_KEY = "collegerig-compare";
const SAVED_KEY = "collegerig-saved";

export function useCompareList() {
  const [compareList, setCompareList] = React.useState<string[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const sync = () => {
      try {
        const item = localStorage.getItem(COMPARE_KEY);
        setCompareList(item ? JSON.parse(item) : []);
      } catch {
        setCompareList([]);
      }
    };
    sync();

    const handleUpdate = () => sync();
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("collegerig-storage-update", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("collegerig-storage-update", handleUpdate);
    };
  }, []);

  const toggleCompare = (slug: string): { success: boolean; message?: string } => {
    let nextList = [...compareList];
    if (nextList.includes(slug)) {
      nextList = nextList.filter((s) => s !== slug);
    } else {
      if (nextList.length >= 3) {
        return {
          success: false,
          message: "You can compare a maximum of 3 laptops at once.",
        };
      }
      nextList.push(slug);
    }

    try {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(nextList));
      setCompareList(nextList);
      window.dispatchEvent(new Event("collegerig-storage-update"));
      return { success: true };
    } catch {
      return { success: false, message: "Failed to save to local storage" };
    }
  };

  const removeFromCompare = (slug: string) => {
    const nextList = compareList.filter((s) => s !== slug);
    localStorage.setItem(COMPARE_KEY, JSON.stringify(nextList));
    setCompareList(nextList);
    window.dispatchEvent(new Event("collegerig-storage-update"));
  };

  const clearCompare = () => {
    localStorage.removeItem(COMPARE_KEY);
    setCompareList([]);
    window.dispatchEvent(new Event("collegerig-storage-update"));
  };

  const isInCompare = (slug: string) => compareList.includes(slug);

  return {
    compareList: mounted ? compareList : [],
    toggleCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    isMaxReached: compareList.length >= 3,
  };
}

export function useSavedLaptops() {
  const [savedList, setSavedList] = React.useState<string[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const sync = () => {
      try {
        const item = localStorage.getItem(SAVED_KEY);
        setSavedList(item ? JSON.parse(item) : []);
      } catch {
        setSavedList([]);
      }
    };
    sync();

    const handleUpdate = () => sync();
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("collegerig-storage-update", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("collegerig-storage-update", handleUpdate);
    };
  }, []);

  const toggleSaved = (slug: string) => {
    let nextList = [...savedList];
    if (nextList.includes(slug)) {
      nextList = nextList.filter((s) => s !== slug);
    } else {
      nextList.push(slug);
    }

    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(nextList));
      setSavedList(nextList);
      window.dispatchEvent(new Event("collegerig-storage-update"));
    } catch {
      // Storage error fallback
    }
  };

  const isSaved = (slug: string) => savedList.includes(slug);

  return {
    savedList: mounted ? savedList : [],
    toggleSaved,
    isSaved,
  };
}
