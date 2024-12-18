import { create } from "zustand";

// Example: User and app state store
const useStore = create((set) => ({
  totalPoints: 0,
  totalTime: 0,
  Accuracy: 0,
  FinalStreak: 0,
  setTotalPoints: (points) => set({ totalPoints: points }),
  setAccuracy: (accuracy) => set({ Accuracy: accuracy }),
  setFinalStreak: (streak) => set({ FinalStreak: streak }),
  setTotalTime: (time) => set({ totalTime: time }),
}));

export default useStore;
