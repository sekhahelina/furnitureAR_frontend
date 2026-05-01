import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { useState } from 'react'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-xl font-bold text-espresso-900 tracking-tight">
          FORMA
          <span className="text-gold-400 ml-0.5">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {isAuthenticated ? (
            <>
              <NavLink to="/upload" active={isActive('/upload')}>Аналіз</NavLink>
              <NavLink to="/cabinet" active={isActive('/cabinet')}>Кабінет</NavLink>
              <div className="flex items-center gap-4 pl-4 border-l border-cream-200">
                <span className="font-body text-sm text-espresso-700">
                  {user?.full_name || user?.email?.split('@')[0]}
                </span>
                <button onClick={handleLogout} className="btn-outline text-xs py-2 px-5">
                  Вийти
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/" active={isActive('/')}>Головна</NavLink>
              <Link to="/auth" className="btn-primary text-xs py-2.5 px-6">
                Увійти
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-px bg-espresso-900 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-espresso-900 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-espresso-900 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-cream-50 border-t border-cream-200"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/upload" className="font-body text-sm" onClick={() => setMenuOpen(false)}>Аналіз кімнати</Link>
                  <Link to="/cabinet" className="font-body text-sm" onClick={() => setMenuOpen(false)}>Мій кабінет</Link>
                  <button onClick={handleLogout} className="btn-outline text-xs py-2 px-5 w-fit">Вийти</button>
                </>
              ) : (
                <Link to="/auth" className="btn-primary text-xs py-2.5 px-6 w-fit" onClick={() => setMenuOpen(false)}>
                  Увійти
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`font-body text-sm tracking-wide transition-colors duration-200 relative
        ${active ? 'text-gold-500' : 'text-espresso-800 hover:text-gold-400'}
      `}
    >
      {children}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold-400"
        />
      )}
    </Link>
  )
}
