"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Profile } from "@/data/site";

/**
 * Profil sélectionné (Tout / Full-stack / Data), partagé entre le hero,
 * le graphe, les compétences et les projets.
 * Lien direct possible : https://ton-site/?profil=data
 */
type Ctx = { profile: Profile; setProfile: (p: Profile) => void };
const ProfileContext = createContext<Ctx>({ profile: "all", setProfile: () => {} });

const isProfile = (v: string | null): v is Profile => v === "all" || v === "fullstack" || v === "data";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setState] = useState<Profile>("all");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("profil");
    if (isProfile(p)) setState(p);
  }, []);

  const setProfile = useCallback((p: Profile) => {
    setState(p);
    const url = new URL(window.location.href);
    if (p === "all") url.searchParams.delete("profil");
    else url.searchParams.set("profil", p);
    window.history.replaceState(null, "", url);
  }, []);

  return <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>;
}

export const useProfile = () => useContext(ProfileContext);
