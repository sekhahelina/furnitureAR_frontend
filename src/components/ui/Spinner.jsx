export default function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }
  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" className="animate-spin w-full h-full">
        <circle cx="12" cy="12" r="10" stroke="#EDE0C8" strokeWidth="2" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}
