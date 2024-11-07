export async function getPokemon(url: string | null) {
  if (!url) return
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch data: ', error)
    throw error
  }
}
