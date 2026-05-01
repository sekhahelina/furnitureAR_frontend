import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getScanHistory, getSavedProducts, removeSavedProduct } from '../api/cabinetApi'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import Spinner from '../components/ui/Spinner'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const TABS = [
  { key: 'history', label: 'Історія сканів' },
  { key: 'saved', label: 'Збережені товари' },
]

export default function CabinetPage() {
  const { user } = useAuthStore()
  const [tab, setTab] = useState('history')
  const [history, setHistory] = useState([])
  const [saved, setSaved] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [h, s] = await Promise.all([getScanHistory(), getSavedProducts()])
        setHistory(h)
        setSaved(s)
      } catch {
        toast.error('Не вдалось завантажити дані')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleRemoveSaved = async (productId) => {
    try {
      await removeSavedProduct(productId)
      setSaved((prev) => prev.filter((p) => p.id !== productId))
      toast.success('Видалено зі збережених')
    } catch {
      toast.error('Помилка видалення')
    }
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="section-label mb-2">Особистий простір</p>
          <h1 className="font-display text-4xl text-espresso-900">
            {user?.full_name ? `Кабінет ${user.full_name}` : 'Мій кабінет'}
          </h1>
          <p className="font-body text-sm text-espresso-700/50 mt-1">{user?.email}</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex border-b border-cream-200 mb-8">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative pb-3 mr-8 font-body text-sm tracking-wide transition-colors duration-200
                ${tab === t.key
                  ? 'text-espresso-900'
                  : 'text-espresso-700/40 hover:text-espresso-700'
                }`}
            >
              {t.label}
              {tab === t.key && (
                <motion.span
                  layoutId="cabinet-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-espresso-900"
                />
              )}
              {/* Badge count */}
              {t.key === 'history' && history.length > 0 && (
                <span className="ml-2 font-mono text-[10px] bg-cream-200 text-espresso-700 px-1.5 py-0.5">
                  {history.length}
                </span>
              )}
              {t.key === 'saved' && saved.length > 0 && (
                <span className="ml-2 font-mono text-[10px] bg-gold-400/20 text-gold-600 px-1.5 py-0.5">
                  {saved.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner size="lg" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {tab === 'history' ? (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {history.length === 0 ? (
                  <EmptyState
                    icon="◎"
                    title="Ще немає сканів"
                    desc="Завантажте перше фото кімнати, щоб почати."
                    cta="Аналізувати кімнату"
                    to="/upload"
                  />
                ) : (
                  <div className="space-y-3">
                    {history.map((scan, i) => (
                      <ScanRow key={scan.id} scan={scan} index={i} />
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="saved"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {saved.length === 0 ? (
                  <EmptyState
                    icon="♡"
                    title="Збережених товарів немає"
                    desc='Натисніть ♡ на картці товару, щоб зберегти його тут.'
                    cta="До рекомендацій"
                    to="/upload"
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {saved.map((product, i) => (
                      <SavedProductCard
                        key={product.id}
                        product={product}
                        index={i}
                        onRemove={() => handleRemoveSaved(product.id)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

/* ── Sub-components ── */

function ScanRow({ scan, index }) {
  const statusColors = {
    done: 'bg-sage-400/20 text-sage-500',
    pending: 'bg-gold-400/20 text-gold-500',
    processing: 'bg-gold-400/20 text-gold-500',
    error: 'bg-red-100 text-red-500',
  }

  const statusLabels = {
    done: 'Готово',
    pending: 'Очікує',
    processing: 'Обробка...',
    error: 'Помилка',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-4 p-4 border border-cream-200 bg-white hover:border-cream-300 transition-colors"
    >
      {/* Thumbnail */}
      <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-cream-100">
        {scan.image_path ? (
          <img
            src={scan.image_path}
            alt="Скан"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-cream-200 text-xl">◎</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-mono text-[10px] px-2 py-0.5 ${statusColors[scan.status] || statusColors.pending}`}>
            {statusLabels[scan.status] || scan.status}
          </span>
          {scan.detected_style && (
            <span className="font-mono text-[10px] text-espresso-700/40">{scan.detected_style}</span>
          )}
        </div>
        <p className="font-body text-xs text-espresso-700/40">
          {new Date(scan.created_at).toLocaleString('uk-UA', {
            day: '2-digit', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
          })}
        </p>
      </div>

      {/* Palette dots */}
      {scan.color_palette?.length > 0 && (
        <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
          {scan.color_palette.slice(0, 5).map((color) => (
            <div
              key={color}
              className="w-5 h-5 rounded-full border border-white shadow-sm"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

function SavedProductCard({ product, index, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border border-cream-200 bg-white group relative"
    >
      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center
          bg-white/80 border border-cream-200 text-espresso-700/40
          hover:border-red-300 hover:text-red-400 transition-all duration-200
          font-mono text-sm opacity-0 group-hover:opacity-100"
        title="Видалити зі збережених"
      >
        ×
      </button>

      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-cream-100">
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
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="section-label text-[10px] mb-1">{product.style_tag}</p>
        <h3 className="font-display text-base text-espresso-900 mb-3 leading-snug">{product.name}</h3>
        <div className="flex items-center justify-between pt-3 border-t border-cream-100">
          <span className="font-display text-lg text-espresso-900">
            {Number(product.price).toLocaleString('uk-UA')}
            <span className="font-body text-xs text-espresso-700/40 ml-1">{product.currency}</span>
          </span>
          {product.store_url && (
            <a
              href={product.store_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-[10px] py-2 px-4"
            >
              Купити
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function EmptyState({ icon, title, desc, cta, to }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-24 border border-dashed border-cream-200"
    >
      <span className="font-mono text-5xl text-cream-200 block mb-4">{icon}</span>
      <p className="font-display text-xl text-espresso-900 mb-2">{title}</p>
      <p className="font-body text-sm text-espresso-700/50 mb-6 max-w-xs mx-auto">{desc}</p>
      <Link to={to} className="btn-primary text-xs py-2.5 px-6">
        {cta}
      </Link>
    </motion.div>
  )
}
