import React, { useState } from 'react';
import './App.css';
import { fetchImagesFromApi } from './api/api';


function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const refresh = async () => {
    setLoading(true)

    const { data, error } = await fetchImagesFromApi()

    if (error) {
      console.log("error: ", error)
    } else {
      setImages(data)
    }
    setLoading(false)

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
