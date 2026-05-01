import { motion } from 'framer-motion'

const STEPS = [
  { label: 'Завантаження зображення', icon: '↑' },
  { label: 'Аналіз кольорової палітри', icon: '◈' },
  { label: 'Визначення стилю (AI)', icon: '◎' },
  { label: 'Підбір рекомендацій', icon: '✦' },
]

export default function ScanAnimation({ currentStep = 0 }) {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Scanning bar visual */}
      <div className="relative w-full h-40 bg-espresso-900 overflow-hidden mb-8">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, #C9A84C22 20px, #C9A84C22 21px)' }}
        />
        {/* Moving scan line */}
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-gold-400 shadow-[0_0_12px_#C9A84C]"
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Corner brackets */}
        {[['top-3 left-3', 'border-t border-l'], ['top-3 right-3', 'border-t border-r'],
          ['bottom-3 left-3', 'border-b border-l'], ['bottom-3 right-3', 'border-b border-r']].map(([pos, border], i) => (
          <div key={i} className={`absolute ${pos} w-4 h-4 ${border} border-gold-400`} />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-mono text-xs text-gold-400/70 tracking-[0.3em] uppercase">Scanning</p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: i <= currentStep ? 1 : 0.3 }}
            className="flex items-center gap-3"
          >
            <div className={`w-7 h-7 flex items-center justify-center text-xs font-mono border transition-all duration-500
              ${i < currentStep ? 'bg-gold-400 border-gold-400 text-espresso-900' :
                i === currentStep ? 'border-gold-400 text-gold-400 animate-pulse' :
                'border-cream-200 text-cream-200'}`}>
              {i < currentStep ? '✓' : step.icon}
            </div>
            <span className={`font-body text-sm transition-colors duration-500
              ${i <= currentStep ? 'text-espresso-900' : 'text-espresso-900/30'}`}>
              {step.label}
            </span>
            {i === currentStep && (
              <motion.span
                className="ml-auto font-mono text-xs text-gold-500"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                ●
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
