import { create } from "zustand";

const useGameQueryStore = create((set) => ({
  selectedDate: null,
  SetSelectedDate: (selectedDate) => set({ selectedDate: selectedDate }),
  selectedTheater: "66ff7c14b07228f8b1e63bae",
  SetSelectedTheater: (selectedTheater) =>
    set({ selectedTheater: selectedTheater }),
  selectedTime: null,
  SetSelectedTime: (selectedTime) => set({ selectedTime: selectedTime }),
  selectedCard: null,
  SetSelectedCard: (selectedCard) => set({ selectedCard: selectedCard }),
  availableTime: null,
  SetaVailableTime: (availableTime) => set({ availableTime: availableTime }),
}));

export default useGameQueryStore;