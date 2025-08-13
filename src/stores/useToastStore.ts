import { defineStore } from 'pinia';

export type ToastType = 'success' | 'info' | 'warn' | 'error';
export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  title?: string;
  timeout: number;
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    list: [] as Toast[],
  }),
  actions: {
    push(type: ToastType, message: string, title?: string, timeout = 2500) {
      const id = Date.now() + Math.random();
      this.list.push({ id, type, message, title, timeout });
      setTimeout(() => this.remove(id), timeout);
    },
    remove(id: number) {
      this.list = this.list.filter(t => t.id !== id);
    },

    // helpers
    info(msg: string, title?: string, t?: number) { this.push('info', msg, title, t); },
    success(msg: string, title?: string, t?: number) { this.push('success', msg, title, t); },
    warn(msg: string, title?: string, t?: number) { this.push('warn', msg, title, t); },
    error(msg: string, title?: string, t?: number) { this.push('error', msg, title, t); },
  },
});
