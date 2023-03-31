export function getConfig() {
  const HABITICA_USER_ID = Deno.env.get('HABITICA_USER_ID')
  const HABITICA_API_KEY = Deno.env.get('HABITICA_API_KEY')

  if (HABITICA_USER_ID && HABITICA_API_KEY) {
    return {
      HABITICA_USER_ID,
      HABITICA_API_KEY
    }
  }
  throw new Error('HABITICA_USER_ID & HABITICA_API_KEY must be provided via env variables')
}