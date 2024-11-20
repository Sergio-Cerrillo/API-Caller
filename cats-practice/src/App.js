import React, { useState } from 'react';
import './App.css';
import { fetchImagesFromApi } from './api/api';


function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const refresh = async () => {
    setLoading(true)
    try {
      const content = await fetchImagesFromApi()
      setImages(content)
    } catch (error) {
      throw new Error("App content error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <h1>Galería de Imágenes Gatunas</h1>
      <button onClick={refresh}>Actualizar</button>
      {loading ?
        <h2>Cargando...</h2>
        :
        <div className='gallery'>
          {images.map((image) => (
            <img key={image.id} src={image.url} width="200" alt={`Cat ${image.id}`} />
          ))}
        </div>
      }

    </div>
  )
}

export default App;
