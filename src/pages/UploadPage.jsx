import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import DropZone from '../components/upload/DropZone'
import ScanAnimation from '../components/upload/ScanAnimation'
import { analyzeRoom } from '../api/analyzeApi'
import { useAnalysisStore } from '../store/analysisStore'

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [step, setStep] = useState(0)
  const { setResult, setPreviewUrl } = useAnalysisStore()
  const navigate = useNavigate()

  const handleFile = useCallback((f) => {
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }, [])

  const handleAnalyze = async () => {
    if (!file) return toast.error('Спочатку оберіть фото кімнати')
    setScanning(true)
    setStep(0)

    try {
      // Simulate step progress while waiting for API
      const stepTimer = setInterval(() => {
        setStep((s) => Math.min(s + 1, 3))
      }, 1800)

      const result = await analyzeRoom(file)
      clearInterval(stepTimer)
      setStep(3)

      setResult(result)
      setPreviewUrl(preview)

      await new Promise((r) => setTimeout(r, 600))
      navigate('/recommendations')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Помилка аналізу. Спробуйте ще раз.')
      setScanning(false)
      setStep(0)
    }
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="section-label mb-3">Крок 1 з 1</p>
          <h1 className="font-display text-4xl text-espresso-900 mb-3">
            Завантажте фото кімнати
          </h1>
          <p className="font-body text-sm text-espresso-700/60">
            ШІ проаналізує стиль та кольори і підбере меблі спеціально для вас.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!scanning ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <DropZone onFile={handleFile} preview={preview} />

              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-cream-100 border border-cream-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold-400/20 flex items-center justify-center">
                      <span className="font-mono text-xs text-gold-500">IMG</span>
                    </div>
                    <div>
                      <p className="font-body text-sm text-espresso-900 truncate max-w-[200px]">{file.name}</p>
                      <p className="font-mono text-xs text-espresso-700/40">{(file.size / 1024 / 1024).toFixed(2)} МБ</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setFile(null); setPreview(null) }}
                    className="font-mono text-espresso-700/40 hover:text-espresso-900 transition-colors text-sm"
                  >
                    ×
                  </button>
                </motion.div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={!file}
                className="btn-primary w-full justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Запустити аналіз
                <span className="font-mono">→</span>
              </button>

              <p className="font-body text-xs text-espresso-700/40 text-center">
                Аналіз займає ~10-20 секунд
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8"
            >
              <ScanAnimation currentStep={step} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
