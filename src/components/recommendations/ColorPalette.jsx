import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ColorPalette({ colors = [] }) {
  const [copied, setCopied] = useState(null)

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color)
    setCopied(color)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="flex items-center gap-3">
      {colors.map((color, i) => (
        <motion.button
          key={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
          onClick={() => handleCopy(color)}
          title={`Копіювати ${color}`}
          className="relative group"
        >
          {/* Color circle */}
          <div
            className="w-10 h-10 rounded-full border-2 border-white shadow-md transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: color }}
          />
          {/* HEX tooltip */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <span className="font-mono text-[10px] text-espresso-700 whitespace-nowrap bg-cream-100 px-1.5 py-0.5 border border-cream-200">
              {copied === color ? '✓' : color}
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  )
}
