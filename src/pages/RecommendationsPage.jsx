import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAnalysisStore } from '../store/analysisStore'
import ColorPalette from '../components/recommendations/ColorPalette'
import StyleBadge from '../components/recommendations/StyleBadge'
import ProductCard from '../components/recommendations/ProductCard'

export default function RecommendationsPage() {
  const { result, previewUrl, clearResult } = useAnalysisStore()
  const navigate = useNavigate()

  // Якщо немає результату — редирект на upload
  useEffect(() => {
    if (!result) navigate('/upload', { replace: true })
  }, [result, navigate])

  if (!result) return null

  const { style, palette = [], products = [] } = result

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* ── HEADER BLOCK ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            {/* Room preview thumbnail */}
            {previewUrl && (
              <div className="w-full lg:w-48 aspect-[4/3] lg:aspect-square overflow-hidden flex-shrink-0 border border-cream-200">
                <img
                  src={previewUrl}
                  alt="Ваша кімната"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-1 space-y-6">
              {/* Style verdict */}
              <StyleBadge style={style} />

              <div className="w-16 h-px bg-cream-200" />

              {/* Color palette */}
              <div>
                <p className="section-label mb-3">Кольорова палітра кімнати</p>
                <ColorPalette colors={palette} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link to="/upload" className="btn-outline text-xs py-2.5 px-5">
                Новий аналіз
              </Link>
              <Link to="/cabinet" className="btn-primary text-xs py-2.5 px-5">
                Мій кабінет
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-cream-200" />
          <p className="section-label whitespace-nowrap">
            {products.length} підібраних товарів · стиль {style}
          </p>
          <div className="flex-1 h-px bg-cream-200" />
        </div>

        {/* ── PRODUCTS GRID ── */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 border border-dashed border-cream-200"
          >
            <span className="font-mono text-5xl text-cream-200 block mb-4">◻</span>
            <p className="font-display text-xl text-espresso-900 mb-2">Товарів не знайдено</p>
            <p className="font-body text-sm text-espresso-700/50 mb-6">
              Для стилю «{style}» каталог ще порожній. Спробуйте інше фото.
            </p>
            <Link to="/upload" className="btn-outline text-xs py-2.5 px-6">
              Спробувати ще раз
            </Link>
          </motion.div>
        )}

        {/* ── BOTTOM NOTE ── */}
        {products.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center font-body text-xs text-espresso-700/30 mt-10"
          >
            Натисніть ♡ щоб зберегти товар у кабінет · Кнопка «AR» для перегляду у доповненій реальності
          </motion.p>
        )}
      </div>
    </div>
  )
}
