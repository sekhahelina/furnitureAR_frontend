import { motion } from 'framer-motion'

const STYLE_META = {
  Modern:     { label: 'Сучасний', desc: 'Чисті лінії, нейтральні тони, функціональність', icon: '◻' },
  Scandi:     { label: 'Скандинавський', desc: 'Природні матеріали, мінімалізм, затишок', icon: '✦' },
  Loft:       { label: 'Лофт', desc: 'Індустріальний характер, відкритий простір', icon: '⬡' },
  Classic:    { label: 'Класичний', desc: 'Елегантність, симетрія, витончені деталі', icon: '◈' },
  Boho:       { label: 'Богемний', desc: 'Текстури, рослини, еклектика та тепло', icon: '◎' },
  Industrial: { label: 'Індустріальний', desc: 'Метал, бетон, сирова краса', icon: '⬡' },
}

export default function StyleBadge({ style }) {
  const meta = STYLE_META[style] || { label: style, desc: 'Унікальний стиль', icon: '◆' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex flex-col gap-1"
    >
      <span className="section-label">Визначений стиль</span>
      <div className="flex items-center gap-3 mt-1">
        <span className="text-2xl text-gold-400 font-mono">{meta.icon}</span>
        <div>
          <h2 className="font-display text-2xl text-espresso-900">{meta.label}</h2>
          <p className="font-body text-sm text-espresso-700/60 mt-0.5">{meta.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}
