import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    darkTheme: useStorage('darkTheme', false) === false ? useStorage('darkTheme', false) : useStorage('darkTheme', true)
  }),
  getters: {
    getTheme: (state) => state.darkTheme
  },
  actions: {
    changeDarkThemeState() {
      this.darkTheme = !this.darkTheme
    }
  }
})
