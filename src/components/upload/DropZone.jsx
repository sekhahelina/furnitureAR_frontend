import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { useCallback } from 'react'

export default function DropZone({ onFile, preview }) {
  const onDrop = useCallback((accepted) => {
    if (accepted[0]) onFile(accepted[0])
  }, [onFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={`
        relative w-full aspect-[4/3] border-2 border-dashed cursor-pointer
        transition-all duration-300 overflow-hidden group
        ${isDragActive
          ? 'border-gold-400 bg-gold-400/5'
          : 'border-cream-200 hover:border-gold-400/60 bg-cream-100/50'
        }
      `}
    >
      <input {...getInputProps()} />

      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <img src={preview} alt="Кімната" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-espresso-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-body text-cream-100 text-sm tracking-widest uppercase">
                Змінити фото
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8"
          >
            {/* Icon */}
            <div className={`w-16 h-16 flex items-center justify-center transition-transform duration-300 ${isDragActive ? 'scale-110' : 'group-hover:scale-105'}`}>
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <rect x="4" y="12" width="56" height="40" rx="2" stroke="#C9A84C" strokeWidth="1.5" />
                <circle cx="20" cy="26" r="5" stroke="#C9A84C" strokeWidth="1.5" />
                <path d="M4 40 L18 28 L28 38 L38 30 L60 48" stroke="#C9A84C" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M32 6 L32 2 M32 2 L28 6 M32 2 L36 6" stroke="#B8932A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="text-center">
              <p className="font-display text-lg text-espresso-800 mb-1">
                {isDragActive ? 'Відпустіть фото тут' : 'Завантажте фото кімнати'}
              </p>
              <p className="font-body text-sm text-espresso-700/60">
                Перетягніть або <span className="text-gold-500 underline underline-offset-2">оберіть файл</span>
              </p>
              <p className="font-mono text-xs text-espresso-700/40 mt-3 tracking-wider">
                JPG · PNG · WEBP · до 10 МБ
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
