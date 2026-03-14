import Book from './components/Book'
import { getImages } from './utils/imageLoader'
import './App.css'

const images = getImages()

export default function App() {
  return (
    <div className="app">
      <Book images={images} />
    </div>
  )
}