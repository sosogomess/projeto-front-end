"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        // Exemplo usando JSONPlaceholder - substitua pela sua API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        
        const data = await response.json();
        
        // Limitar a 12 produtos para melhor visualização
        const produtosLimitados = data.slice(0, 12).map(item => ({
          id: item.id,
          nome: item.title,
          descricao: item.body.substring(0, 100) + '...',
          // Para uma API real, você teria campos como:
          // preco: item.price,
          // imagem: item.image,
          // categoria: item.category
        }));
        
        setProdutos(produtosLimitados);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Carregando produtos...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.error}>
            <h2>Erro ao carregar produtos</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.retryButton}
            >
              Tentar novamente
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <h1 className={styles.pageTitle}>Nossos Produtos</h1>
            <p className={styles.pageSubtitle}>
              Descubra nossa seleção de produtos incríveis
            </p>
          </div>
        </div>

        <section className={styles.produtosSection}>
          <div className={styles.produtosContainer}>
            <div className={styles.produtosGrid}>
              {produtos.map((produto) => (
                <div key={produto.id} className={styles.produtoCard}>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.produtoImagem}>
                        {/* Placeholder para imagem - substitua por uma imagem real */}
                        <div className={styles.imagePlaceholder}>
                          <span>IMG</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.cardBody}>
                      <h3 className={styles.produtoNome}>{produto.nome}</h3>
                      <p className={styles.produtoDescricao}>{produto.descricao}</p>
                      
                      {/* Para uma API real, você adicionaria: */}
                      {/* <p className={styles.produtoPreco}>R$ {produto.preco}</p> */}
                      {/* <span className={styles.produtoCategoria}>{produto.categoria}</span> */}
                    </div>
                    
                    <div className={styles.cardFooter}>
                      <Link 
                        href={`/produtos/${produto.id}`} 
                        className={styles.detalhesButton}
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {produtos.length === 0 && (
              <div className={styles.emptyState}>
                <h3>Nenhum produto encontrado</h3>
                <p>Não há produtos disponíveis no momento.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
