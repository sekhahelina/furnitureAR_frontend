import { useState } from 'react'
import { motion } from 'framer-motion'
import { saveProduct, removeSavedProduct } from '../../api/cabinetApi'
import toast from 'react-hot-toast'
import ModelViewer from '../ar/ModelViewer'

export default function ProductCard({ product, index }) {
  const [saved, setSaved] = useState(false)
  const [showAR, setShowAR] = useState(false)

  const handleSave = async () => {
    try {
      if (saved) {
        await removeSavedProduct(product.id)
        setSaved(false)
        toast.success('Видалено зі збережених')
      } else {
        await saveProduct(product.id)
        setSaved(true)
        toast.success('Збережено до кабінету')
      }
    } catch {
      toast.error('Помилка. Спробуйте ще раз.')
    }
  }

const handleAR = () => {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)

  if (product.model_usdz_path && isIOS) {
    const usdzUrl = product.model_usdz_path.startsWith('http')
      ? product.model_usdz_path
      : `${import.meta.env.VITE_API_URL}/models/${product.model_usdz_path}`

    // iOS Quick Look ОБОВ'ЯЗКОВО потребує img всередині anchor
    const anchor = document.createElement('a')
    anchor.setAttribute('rel', 'ar')
    anchor.setAttribute('href', usdzUrl)

    const img = document.createElement('img')
    img.setAttribute('src', product.image_url || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')
    img.setAttribute('style', 'display:none')
    anchor.appendChild(img)

    document.body.appendChild(anchor)
    anchor.click()

    setTimeout(() => {
      if (document.body.contains(anchor)) {
        document.body.removeChild(anchor)
      }
    }, 1000)

  } else {
    setShowAR(true)
  }
}

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="card group relative bg-white"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-4xl text-cream-200">◻</span>
            </div>
          )}

          {/* Save button */}
          <button
            onClick={handleSave}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center
              transition-all duration-200 border
              ${saved
                ? 'bg-gold-400 border-gold-400 text-espresso-900'
                : 'bg-white/80 border-cream-200 text-espresso-700 hover:border-gold-400 hover:text-gold-500'
              }`}
          >
            {saved ? '♥' : '♡'}
          </button>

          {/* AR badge */}
          {(product.model_glb_path || product.model_usdz_path) && (
            <div className="absolute top-3 left-3 bg-espresso-900 text-cream-100 font-mono text-[10px] tracking-widest px-2 py-0.5">
              AR
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="section-label text-[10px] mb-1">{product.style_tag}</p>
          <h3 className="font-display text-base text-espresso-900 leading-snug mb-3">
            {product.name}
          </h3>
          {product.description && (
            <p className="font-body text-xs text-espresso-700/60 mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-cream-100">
            <div>
              <span className="font-display text-lg text-espresso-900">
                {Number(product.price).toLocaleString('uk-UA')}
              </span>
              <span className="font-body text-xs text-espresso-700/60 ml-1">{product.currency}</span>
            </div>

            <div className="flex gap-2">
              {(product.model_glb_path || product.model_usdz_path) && (
                <button onClick={handleAR} className="btn-gold text-[10px] py-2 px-3">
                  AR
                </button>
              )}
              {product.store_url && (
                <a
                  href={product.store_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-[10px] py-2 px-3"
                >
                  Купити
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* AR Modal */}
      {showAR && (
        <ModelViewer
          glbPath={product.model_glb_path}
          usdzPath={product.model_usdz_path}
          name={product.name}
          onClose={() => setShowAR(false)}
        />
      )}
    </>
  )
}
