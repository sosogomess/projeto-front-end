'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import styles from './personagens.module.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default function PersonagensPage() {
  const [personagens, setPersonagens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPersonagens()
  }, [])

  const fetchPersonagens = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://api.sampleapis.com/cartoons/cartoons2D')
      setPersonagens(response.data)
    } catch (err) {
      setError('Erro ao carregar personagens')
      console.error('Erro:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.loading}>
            <h2>Carregando personagens...</h2>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.error}>
            <h2>Erro ao carregar dados</h2>
            <p>{error}</p>
            <button onClick={fetchPersonagens} className={styles.retryButton}>
              Tentar novamente
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Personagens de Desenhos Animados</h1>
          <p>Explore nossa coleção de personagens 2D</p>
        </header>

      <div className={styles.grid}>
        {personagens.map((personagem) => (
          <div key={personagem.id} className={styles.card}>
            <div className={styles.imageContainer}>
              {personagem.image ? (
                <img 
                  src={personagem.image} 
                  alt={personagem.title}
                  className={styles.image}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
              ) : null}
              <div className={styles.imagePlaceholder} style={{ display: personagem.image ? 'none' : 'flex' }}>
                <span>Sem imagem</span>
              </div>
            </div>
            
            <div className={styles.content}>
              <h3 className={styles.title}>{personagem.title}</h3>
              
              {personagem.year && (
                <p className={styles.year}>Ano: {personagem.year}</p>
              )}
              
              {personagem.creator && (
                <p className={styles.creator}>Criador: {personagem.creator}</p>
              )}
              
              {personagem.genre && (
                <div className={styles.genres}>
                  {Array.isArray(personagem.genre) ? (
                    personagem.genre.map((g, index) => (
                      <span key={index} className={styles.genre}>{g}</span>
                    ))
                  ) : (
                    <span className={styles.genre}>{personagem.genre}</span>
                  )}
                </div>
              )}
              
              <div className={styles.actions}>
                <Link 
                  href={`/get/${personagem.id}`}
                  className={styles.detailsButton}
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {personagens.length === 0 && (
        <div className={styles.empty}>
          <h2>Nenhum personagem encontrado</h2>
        </div>
      )}
    </div>
    <Footer />
    </>
  )
}
