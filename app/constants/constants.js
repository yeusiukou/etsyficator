export const ACCOUNT_KEY = 'ACCOUNT_KEY'
export const ETSY_URL = 'https://openapi.etsy.com/v2/listings/'
export const API_KEY = 'c499uq0hebkmkaynkdla4x3b'
export const getDeleteUrl = (shopName, id) => `https://${shopName}.myshopify.com/admin/products/${id}.json`
export const getPostUrl = (shopName) => `https://${shopName}.myshopify.com/admin/products.json`
export const AUTH_URL = 'https://shopifyauth.now.sh/'