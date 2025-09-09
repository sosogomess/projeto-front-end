'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from './detalhes.module.css'

export default function DetalhesPersonagemPage() {
  const params = useParams()
  const router = useRouter()
  const [personagem, setPersonagem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (params.id) {
      fetchPersonagem(params.id)
    }
  }, [params.id])

  const fetchPersonagem = async (id) => {
    try {
      setLoading(true)
      setError(null)
      
      // Buscar todos os personagens e filtrar pelo ID
      const response = await axios.get('https://api.sampleapis.com/cartoons/cartoons2D')
      const personagemEncontrado = response.data.find(p => p.id === parseInt(id))
      
      if (personagemEncontrado) {
        setPersonagem(personagemEncontrado)
        toast.success('Personagem carregado com sucesso!')
      } else {
        setError('Personagem não encontrado')
        toast.error('Personagem não encontrado!')
      }
    } catch (err) {
      const errorMessage = 'Erro ao carregar detalhes do personagem'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Erro:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    if (params.id) {
      fetchPersonagem(params.id)
    }
  }

  const handleVoltar = () => {
    router.back()
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <h2>Carregando detalhes do personagem...</h2>
            <p>Aguarde um momento</p>
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
            <div className={styles.errorIcon}>⚠️</div>
            <h2>Ops! Algo deu errado</h2>
            <p>{error}</p>
            <div className={styles.errorActions}>
              <button onClick={handleRetry} className={styles.retryButton}>
                🔄 Tentar Novamente
              </button>
              <Link href="/personagens" className={styles.backButton}>
                ← Voltar à Listagem
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!personagem) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.notFound}>
            <div className={styles.notFoundIcon}>🔍</div>
            <h2>Personagem não encontrado</h2>
            <p>O personagem que você está procurando não existe ou foi removido.</p>
            <div className={styles.notFoundActions}>
              <Link href="/personagens" className={styles.backButton}>
                ← Voltar à Listagem
              </Link>
              <Link href="/" className={styles.homeButton}>
                🏠 Ir para Home
              </Link>
            </div>
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
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>›</span>
          <Link href="/personagens" className={styles.breadcrumbLink}>Personagens</Link>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbCurrent}>{personagem.title}</span>
        </div>

        {/* Botões de navegação */}
        <div className={styles.navigationButtons}>
          <button onClick={handleVoltar} className={styles.backButtonNav}>
            ← Voltar
          </button>
          <Link href="/" className={styles.homeButtonNav}>
            🏠 Home
          </Link>
        </div>

        {/* Card de detalhes */}
        <div className={styles.detailCard}>
          <div className={styles.imageSection}>
            {personagem.image ? (
              <img 
                src={personagem.image} 
                alt={personagem.title}
                className={styles.mainImage}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
            ) : null}
            <div 
              className={styles.imagePlaceholder} 
              style={{ display: personagem.image ? 'none' : 'flex' }}
            >
              <span>📺</span>
              <p>Imagem não disponível</p>
            </div>
          </div>

          <div className={styles.contentSection}>
            <div className={styles.header}>
              <h1 className={styles.title}>{personagem.title}</h1>
              {personagem.year && (
                <span className={styles.yearBadge}>{personagem.year}</span>
              )}
            </div>

            <div className={styles.details}>
              {personagem.creator && (
                <div className={styles.detailItem}>
                  <strong className={styles.detailLabel}>👨‍🎨 Criador:</strong>
                  <span className={styles.detailValue}>{personagem.creator}</span>
                </div>
              )}

              {personagem.year && (
                <div className={styles.detailItem}>
                  <strong className={styles.detailLabel}>📅 Ano de Lançamento:</strong>
                  <span className={styles.detailValue}>{personagem.year}</span>
                </div>
              )}

              {personagem.genre && (
                <div className={styles.detailItem}>
                  <strong className={styles.detailLabel}>🎭 Gêneros:</strong>
                  <div className={styles.genres}>
                    {Array.isArray(personagem.genre) ? (
                      personagem.genre.map((g, index) => (
                        <span key={index} className={styles.genreTag}>{g}</span>
                      ))
                    ) : (
                      <span className={styles.genreTag}>{personagem.genre}</span>
                    )}
                  </div>
                </div>
              )}

              {personagem.rating && (
                <div className={styles.detailItem}>
                  <strong className={styles.detailLabel}>⭐ Classificação:</strong>
                  <span className={styles.detailValue}>{personagem.rating}</span>
                </div>
              )}

              {personagem.episodes && (
                <div className={styles.detailItem}>
                  <strong className={styles.detailLabel}>📺 Episódios:</strong>
                  <span className={styles.detailValue}>{personagem.episodes}</span>
                </div>
              )}

              {personagem.runtime_in_minutes && (
                <div className={styles.detailItem}>
                  <strong className={styles.detailLabel}>⏱️ Duração:</strong>
                  <span className={styles.detailValue}>{personagem.runtime_in_minutes} minutos</span>
                </div>
              )}

              <div className={styles.detailItem}>
                <strong className={styles.detailLabel}>🆔 ID:</strong>
                <span className={styles.detailValue}>#{personagem.id}</span>
              </div>
            </div>

            {/* Informações adicionais */}
            <div className={styles.additionalInfo}>
              <h3>📋 Informações Completas</h3>
              <div className={styles.infoGrid}>
                {Object.entries(personagem).map(([key, value]) => {
                  if (key === 'image' || key === 'id' || !value) return null
                  
                  const formatKey = (k) => {
                    return k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                  }

                  return (
                    <div key={key} className={styles.infoItem}>
                      <span className={styles.infoKey}>{formatKey(key)}:</span>
                      <span className={styles.infoValue}>
                        {Array.isArray(value) ? value.join(', ') : value.toString()}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Botões de ação finais */}
        <div className={styles.actionButtons}>
          <Link href="/personagens" className={styles.listButton}>
            📋 Ver Todos os Personagens
          </Link>
          <Link href="/" className={styles.homeButtonFinal}>
            🏠 Voltar à Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
