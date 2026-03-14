import { forwardRef } from 'react'

const Page = forwardRef(({ image }, ref) => {
  return (
    <div ref={ref} className="page">
      <img
        src={image.src}
        alt={`Page ${image.id}`}
        className="page-image"
        draggable={false}
      />
    </div>
  )
})

Page.displayName = 'Page'
export default Page