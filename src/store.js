import create from 'zustand';

export const useStore = create((set, get) => ({
  timeRecords: [],
  setRecords: timeRecords => set({ timeRecords }),
  addRecord: newRecord =>
    set({ timeRecords: [newRecord, ...get().timeRecords] }),

  timeBank: 0,
  setTimeBank: timeBank => set({ timeBank }),
  updateTimeBank: newRecord => set({ timeBank: get().timeBank + newRecord }),
}));
