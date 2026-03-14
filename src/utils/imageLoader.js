const IMAGE_COUNT = 18

export function getImages() {
  const images = []
  const BASE_PATH = import.meta.env.BASE_URL + 'pictures/'

  console.log('BASE_PATH:', BASE_PATH) // debug
  console.log('BASE_URL:', import.meta.env.BASE_URL) // debug

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

  console.log('images:', images) // debug

  return images
}