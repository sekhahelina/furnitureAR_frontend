import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'

const FEATURES = [
  {
    icon: '◈',
    title: 'AI-аналіз кімнати',
    desc: 'YOLOv8 розпізнає стиль вашого інтер\'єру за одним фото. Жодних питань — лише результат.',
  },
  {
    icon: '◎',
    title: 'Кольорова палітра',
    desc: 'Алгоритм витягує 5 домінантних кольорів і підбирає меблі, що ідеально гармоніюють.',
  },
  {
    icon: '◻',
    title: 'AR-примірка',
    desc: 'Побачте меблі у своїй кімнаті через ваш смартфон ще до покупки. Без завантажень.',
  },
]

const STYLES = ['Modern', 'Scandi', 'Loft', 'Classic', 'Boho', 'Industrial']

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="pt-16">
      {/* ── HERO ── */}
      <section className="min-h-[92vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Decorative background grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#1A1209 1px, transparent 1px), linear-gradient(90deg, #1A1209 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
        {/* Gold accent circle */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-400/5 blur-3xl pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="relative max-w-3xl mx-auto"
        >
          <motion.p variants={fadeUp} className="section-label mb-6">
            Інтелектуальний дизайн — 2026
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl text-espresso-900 leading-[1.05] mb-6"
          >
            Меблі, створені
            <br />
            <em className="text-gold-500 not-italic">для вашого</em> простору
          </motion.h1>

          <motion.p variants={fadeUp} className="font-body text-lg text-espresso-700/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Завантажте фото кімнати. ШІ визначить стиль, витягне палітру кольорів і підбере меблі, які можна приміряти в AR прямо зараз.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <Link to={isAuthenticated ? '/upload' : '/auth'} className="btn-primary">
              Почати аналіз
              <span className="font-mono text-base">→</span>
            </Link>
            <a href="#how" className="btn-outline">
              Як це працює
            </a>
          </motion.div>
        </motion.div>

        {/* Floating style tags */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 overflow-hidden px-4">
          {STYLES.map((style, i) => (
            <motion.span
              key={style}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className="font-mono text-xs tracking-widest text-espresso-700/30 border border-espresso-900/10 px-3 py-1"
            >
              {style}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-6 bg-espresso-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="section-label text-gold-400 mb-4">Процес</p>
            <h2 className="font-display text-4xl text-cream-100">Три кроки до ідеального інтер'єру</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-cream-100/10">
            {[
              { num: '01', title: 'Завантажте фото', desc: 'Зробіть знімок кімнати або завантажте вже готовий. Підтримується JPG, PNG, WebP.' },
              { num: '02', title: 'AI-аналіз', desc: 'YOLOv8 визначає стиль, OpenCV витягує 5 домінантних кольорів за секунди.' },
              { num: '03', title: 'AR-примірка', desc: 'Оберіть меблі та натисніть "AR" — товар з\'явиться у вашій кімнаті через камеру.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-espresso-900 p-8"
              >
                <span className="font-mono text-5xl text-gold-400/20 block mb-6">{step.num}</span>
                <h3 className="font-display text-xl text-cream-100 mb-3">{step.title}</h3>
                <p className="font-body text-sm text-cream-100/50 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="section-label mb-4">Можливості</p>
            <h2 className="font-display text-4xl text-espresso-900">Технологія на службі смаку</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-cream-200 text-gold-400 font-mono text-xl mb-5 group-hover:bg-espresso-900 group-hover:border-espresso-900 group-hover:text-gold-400 transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="font-display text-xl text-espresso-900 mb-2">{f.title}</h3>
                <p className="font-body text-sm text-espresso-700/60 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-cream-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl text-espresso-900 mb-6">
            Готові знайти меблі своєї мрії?
          </h2>
          <p className="font-body text-espresso-700/60 mb-8">
            Приєднуйтесь — це безкоштовно. Один знімок, і ваша кімната заговорить.
          </p>
          <Link to={isAuthenticated ? '/upload' : '/auth'} className="btn-primary">
            Спробувати безкоштовно
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-cream-200 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg text-espresso-900">
            FORMA<span className="text-gold-400">.</span>
          </span>
          <p className="font-body text-xs text-espresso-700/40">
            © 2026 FORMA. Інтелектуальний підбір меблів з AR.
          </p>
        </div>
      </footer>
    </div>
  )
}
