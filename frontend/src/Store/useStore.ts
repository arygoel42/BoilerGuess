import { create } from "zustand";

// Example: User and app state store
const useStore = create((set) => ({
  hardMode: false,
  totalPoints: 0,
  totalTime: 0,
  Accuracy: 0,
  streak: 0,
  FinalStreak: 0,
  setTotalPoints: (points) => set({ totalPoints: points }),
  setAccuracy: (accuracy) => set({ Accuracy: accuracy }),
  setFinalStreak: (streak) => set({ FinalStreak: streak }),
  setTotalTime: (time) => set({ totalTime: time }),
  setStreak: (streak) => set({ streak: streak }),
  setMode: (boolean) => set({ hardMode: boolean }),
}));

export default useStore;
