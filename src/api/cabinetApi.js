import client from './client'

export const getScanHistory = () =>
  client.get('/cabinet/history').then((r) => r.data)

export const getSavedProducts = () =>
  client.get('/cabinet/saved').then((r) => r.data)

export const saveProduct = (productId) =>
  client.post(`/cabinet/saved/${productId}`).then((r) => r.data)

export const removeSavedProduct = (productId) =>
  client.delete(`/cabinet/saved/${productId}`)
