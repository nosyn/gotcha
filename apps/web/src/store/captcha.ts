import { create } from 'zustand';
import { Captcha } from '../types';

interface CaptchaStore {
  assignedCaptcha: Captcha | null;
  setAssignedCaptcha: (assignedCaptcha: Captcha | null) => void;
}

export const useCaptchaStore = create<CaptchaStore>()((set) => ({
  assignedCaptcha: null,
  setAssignedCaptcha: (assignedCaptcha) => set({ assignedCaptcha }),
}));
