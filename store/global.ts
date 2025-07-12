import { create } from "zustand";

type ToastData = {
  message: string;
  type: "success" | "error" | "warning";
  title?: string;
};

type MenuState = {
  toastData: ToastData | null;
  setToastData: (data: ToastData | null) => void;
};

const useGlobalStore = create<MenuState>((set) => ({
  toastData: null, // Default toast data
  setToastData: (data: ToastData | null) => set({ toastData: data }),
}));

export default useGlobalStore;
