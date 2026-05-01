// src/api/analyzeApi.js

import client from './client' // Переконайся, що цей імпорт розкоментований

export const analyzeRoom = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return client.post('/analyze/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data)
}

// Це твоя робоча функція, використовуй її:
export const getStatus = (scanId) => 
  client.get(`/analyze/status/${scanId}`).then((r) => r.data)