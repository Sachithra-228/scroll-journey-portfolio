"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Track = "design" | "backend";

type TrackState = {
  /** Currently active track. Defaults to "design" until the visitor chooses. */
  track: Track;
  /** Whether the visitor has made an explicit choice at the fork. */
  chosen: boolean;
  choose: (track: Track) => void;
};

const TrackContext = createContext<TrackState | null>(null);

export function TrackProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrack] = useState<Track>("design");
  const [chosen, setChosen] = useState(false);

  const choose = useCallback((next: Track) => {
    setTrack(next);
    setChosen(true);
  }, []);

  // Downstream sections (and CSS) can read the track off the body element.
  useEffect(() => {
    document.body.dataset.track = track;
  }, [track]);

  const value = useMemo(
    () => ({ track, chosen, choose }),
    [track, chosen, choose]
  );

  return (
    <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
  );
}

export function useTrack() {
  const ctx = useContext(TrackContext);
  if (!ctx) throw new Error("useTrack must be used inside TrackProvider");
  return ctx;
}
