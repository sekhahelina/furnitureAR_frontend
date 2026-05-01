import { create } from 'zustand'

export const useAnalysisStore = create((set) => ({
  result: null,       // { scan_id, style, palette, products }
  previewUrl: null,   // локальний URL для попереднього перегляду фото

  setResult: (result) => set({ result }),
  setPreviewUrl: (url) => set({ previewUrl: url }),
  clearResult: () => set({ result: null, previewUrl: null }),
}))
