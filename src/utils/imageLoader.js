const IMAGE_COUNT = 18
const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/'

const BASE_PATH = `${BASE}pictures/`

export function getImages() {
  const images = []

  console.log('BASE_URL:', import.meta.env.BASE_URL)
  console.log('BASE_PATH:', BASE_PATH)

  images.push({
    id: 'cover',
    src: `${BASE_PATH}cover.png`,
    isCover: true,
  })

  for (let i = 1; i <= IMAGE_COUNT; i++) {
    images.push({
      id: i,
      src: `${BASE_PATH}${i}.png`,
      isCover: false,
    })
  }

  console.log('Összes kép:', images.map(img => img.src))

  return images
}