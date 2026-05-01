import client from './client'

export const analyzeRoom = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return client.post('/analyze/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data)
}

export const getScanStatus = (scanId) =>
  client.get(`/analyze/status/${scanId}`).then((r) => r.data)
