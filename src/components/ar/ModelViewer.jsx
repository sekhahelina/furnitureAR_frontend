import { motion, AnimatePresence } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function ModelViewer({ glbPath, usdzPath, name, onClose }) {
  const glbUrl = glbPath
  ? glbPath.startsWith('http') ? glbPath : `${API_URL}/models/${glbPath}`
  : null
const usdzUrl = usdzPath
  ? usdzPath.startsWith('http') ? usdzPath : `${API_URL}/models/${usdzPath}`
  : null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-900/80 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-2xl aspect-square bg-cream-50 border border-cream-200"
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-cream-50 border-b border-cream-200">
            <div>
              <p className="section-label text-[10px]">AR Примірка</p>
              <h3 className="font-display text-sm text-espresso-900">{name}</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center border border-cream-200 hover:border-espresso-900 transition-colors font-mono text-espresso-700"
            >
              ×
            </button>
          </div>

          {/* Model Viewer */}
          <div className="absolute inset-0 top-12">
            {glbUrl ? (
              // @ts-ignore — model-viewer is a custom element registered via CDN
              <model-viewer
                src={glbUrl}
                ios-src={usdzUrl}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                shadow-intensity="1"
                style={{ width: '100%', height: '100%' }}
                alt={name}
              >
                {/* AR button inside model-viewer */}
                <button
                  slot="ar-button"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 btn-gold text-xs py-2.5 px-6"
                >
                  Відкрити в AR
                </button>
              </model-viewer>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <span className="font-mono text-5xl text-cream-200">◻</span>
                <p className="font-body text-sm text-espresso-700/50">3D модель недоступна</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
