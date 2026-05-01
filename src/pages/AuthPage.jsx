import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { login, register } from '../api/authApi'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import Spinner from '../components/ui/Spinner'

export default function AuthPage() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', full_name: '' })
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fn = mode === 'login' ? login : register
      const data = await fn(form)
      setAuth(data.access_token, data.user)
      toast.success(mode === 'login' ? 'Ласкаво просимо!' : 'Акаунт створено!')
      navigate('/upload')
    } catch (err) {
      const msg = err.response?.data?.detail || 'Щось пішло не так'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-espresso-900 flex-col items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
        />
        <div className="relative z-10 text-center">
          <Link to="/" className="font-display text-3xl text-cream-100 block mb-12">
            FORMA<span className="text-gold-400">.</span>
          </Link>
          <div className="w-32 h-px bg-gold-400/30 mx-auto mb-12" />
          <blockquote className="font-display text-2xl text-cream-100/80 italic leading-relaxed max-w-xs">
            "Простір навколо нас — це відображення того, ким ми є всередині."
          </blockquote>
          <div className="mt-12 grid grid-cols-3 gap-4 opacity-20">
            {['Modern', 'Scandi', 'Loft', 'Classic', 'Boho', 'Industrial'].map((s) => (
              <div key={s} className="border border-cream-100/30 py-2 text-center">
                <span className="font-mono text-[10px] text-cream-100 tracking-widest">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Tab switcher */}
          <div className="flex mb-8 border-b border-cream-200">
            {['login', 'register'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 pb-3 font-body text-sm tracking-widest uppercase transition-all duration-200
                  ${mode === m
                    ? 'text-espresso-900 border-b-2 border-espresso-900 -mb-px'
                    : 'text-espresso-700/40 hover:text-espresso-700'
                  }`}
              >
                {m === 'login' ? 'Вхід' : 'Реєстрація'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {mode === 'register' && (
                <Field
                  label="Ім'я"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="Ваше ім'я"
                />
              )}
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
              <Field
                label="Пароль"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Мінімум 6 символів"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Spinner size="sm" />
                ) : mode === 'login' ? 'Увійти' : 'Створити акаунт'}
              </button>
            </motion.form>
          </AnimatePresence>

          <p className="font-body text-xs text-espresso-700/40 text-center mt-8">
            Натискаючи кнопку, ви погоджуєтесь з умовами сервісу.
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="font-mono text-xs tracking-widest uppercase text-espresso-700/60 block mb-1.5">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-cream-200 bg-white px-4 py-3 font-body text-sm text-espresso-900
          placeholder:text-espresso-900/25 focus:outline-none focus:border-espresso-900
          transition-colors duration-200"
      />
    </div>
  )
}
