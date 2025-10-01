"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import styles from "./detalhes-comment.module.css";

export default function DetalhesPersonagemPage() {
    const params = useParams();
    const router = useRouter();
    const [personagem, setPersonagem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (params.id) {
            fetchPersonagem(params.id);
        }
    }, [params.id]);

    const fetchPersonagem = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get("https://api.sampleapis.com/cartoons/cartoons2D");
            const personagemEncontrado = response.data.find(p => p.id === parseInt(id));
            
            if (personagemEncontrado) {
                setPersonagem(personagemEncontrado);
                toast.success("Personagem carregado com sucesso!");
            } else {
                setError("Personagem não encontrado");
            }
        } catch (err) {
            setError("Erro ao carregar detalhes do personagem");
            console.error("Erro:", err);
            toast.error("Erro ao carregar personagem");
        } finally {
            setLoading(false);
        }
    };

    const handleRetry = () => {
        if (params.id) {
            fetchPersonagem(params.id);
        }
    };

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
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.error}>
                        <div className={styles.errorIcon}>!</div>
                        <h2>Ops! Algo deu errado</h2>
                        <p>{error}</p>
                        <div className={styles.errorActions}>
                            <button onClick={handleRetry} className={styles.retryButton}>
                                Tentar Novamente
                            </button>
                            <Link href="/get" className={styles.backButton}>
                                ← Voltar à Listagem
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!personagem) {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.notFound}>
                        <div className={styles.notFoundIcon}>?</div>
                        <h2>Personagem não encontrado</h2>
                        <p>O personagem que você está procurando não existe ou foi removido.</p>
                        <div className={styles.notFoundActions}>
                            <Link href="/get" className={styles.backButton}>
                                ← Voltar à Listagem
                            </Link>
                            <Link href="/" className={styles.homeButton}>
                                Ir para Home
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.breadcrumb}>
                    <Link href="/" className={styles.breadcrumbLink}>Home</Link>
                    <span className={styles.breadcrumbSeparator}>›</span>
                    <Link href="/get" className={styles.breadcrumbLink}>Personagens (GET)</Link>
                    <span className={styles.breadcrumbSeparator}>›</span>
                    <span className={styles.breadcrumbCurrent}>{personagem.title}</span>
                </div>

                <div className={styles.detailCard}>
                    <div className={styles.header}>
                        <div className={styles.headerInfo}>
                            <h1 className={styles.title}>{personagem.title}</h1>
                            {personagem.year && (
                                <span className={styles.postBadge}>{personagem.year}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.contentSection}>
                        {personagem.image && (
                            <div className={styles.imageSection}>
                                <img 
                                    src={personagem.image} 
                                    alt={personagem.title}
                                    className={styles.personagemImage}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}

                        <div className={styles.details}>
                            {personagem.creator && (
                                <div className={styles.detailItem}>
                                    <strong className={styles.detailLabel}>Criador:</strong>
                                    <span className={styles.detailValue}>{personagem.creator}</span>
                                </div>
                            )}

                            {personagem.year && (
                                <div className={styles.detailItem}>
                                    <strong className={styles.detailLabel}>Ano:</strong>
                                    <span className={styles.detailValue}>{personagem.year}</span>
                                </div>
                            )}

                            {personagem.rating && (
                                <div className={styles.detailItem}>
                                    <strong className={styles.detailLabel}>Classificação:</strong>
                                    <span className={styles.detailValue}>{personagem.rating}</span>
                                </div>
                            )}

                            {personagem.episodes && (
                                <div className={styles.detailItem}>
                                    <strong className={styles.detailLabel}>Episódios:</strong>
                                    <span className={styles.detailValue}>{personagem.episodes}</span>
                                </div>
                            )}

                            {personagem.runtime_in_minutes && (
                                <div className={styles.detailItem}>
                                    <strong className={styles.detailLabel}>Duração:</strong>
                                    <span className={styles.detailValue}>{personagem.runtime_in_minutes} minutos</span>
                                </div>
                            )}

                            <div className={styles.detailItem}>
                                <strong className={styles.detailLabel}>ID:</strong>
                                <span className={styles.detailValue}>#{personagem.id}</span>
                            </div>
                        </div>

                        {personagem.genre && (
                            <div className={styles.commentBody}>
                                <h3>Gêneros:</h3>
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
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <Link href="/get" className={styles.listButton}>
                        Ver Todos os Personagens
                    </Link>
                    <Link href="/" className={styles.homeButtonFinal}>
                        Voltar à Home
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}