const IMAGE_COUNT = 28 // <- képek száma (cover nélkül)
const BASE_PATH = import.meta.env.BASE_URL + 'pictures/'

export function getImages() {
  const images = []

  // Borító
  images.push({
    id: 'cover',
    src: `${BASE_PATH}cover.png`,
    isCover: true,
  })

  // Numbered pages
  for (let i = 1; i <= IMAGE_COUNT; i++) {
    images.push({
      id: i,
      src: `${BASE_PATH}${i}.png`,
      isCover: false,
    })
  }

  return images
}