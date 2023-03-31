export function getConfig() {
  const HABITICA_USER_ID = process.env.HABITICA_USER_ID
  const HABITICA_API_KEY = process.env.HABITICA_API_KEY

  if (HABITICA_USER_ID && HABITICA_API_KEY) {
    return {
      HABITICA_USER_ID,
      HABITICA_API_KEY
    }
  }
  throw new Error('HABITICA_USER_ID & HABITICA_API_KEY must be provided via env variables')
}