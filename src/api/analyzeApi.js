import client from './client'

export const analyzeRoom = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return client.post('/analyze/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data)
}

export const getStatus = (scanId) => {
  // Тут НЕ потрібно додавати headers вручну,
  // бо interceptor у client.js зробить це за тебе!
  return client.get(`/analyze/status/${scanId}`).then((r) => r.data)
}