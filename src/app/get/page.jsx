"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./get.module.css";

const STORAGE_KEY = "personagens_salvo_na_sessionStorage";

export default function Get() {
    const [loading, setLoading] = useState(false);
    const [personagens, setPersonagens] = useState([]);
    const [error, setError] = useState(false);
    const [idBusca, setIdBusca] = useState("");
    const router = useRouter();

    const buscarPersonagens = async () => {
        setLoading(true);
        setError(false);
        try {
            if (typeof window !== 'undefined' && window.sessionStorage) {
                const sessionStorageData = sessionStorage.getItem(STORAGE_KEY);

                if (sessionStorageData) {
                    const data = JSON.parse(sessionStorageData);
                    setPersonagens(data);
                } else {
                    const response = await axios.get("https://api.sampleapis.com/cartoons/cartoons2D");
                    setPersonagens(response.data);
                    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
                }
            } else {
                const response = await axios.get("https://api.sampleapis.com/cartoons/cartoons2D");
                setPersonagens(response.data);
            }
        } catch (error) {
            setError(true);
            console.error("Erro ao buscar personagens:", error);
        } finally {
            setLoading(false);
        }
    };

    const navegarParaPersonagem = (personagemId) => {
        try {
            if (personagemId) {
                router.push(`/get/${personagemId}`);
            }
        } catch (error) {
            console.error("Erro ao navegar:", error);
        }
    };

    const buscarPorId = () => {
        if (!idBusca.trim()) {
            alert("Digite um ID para buscar!");
            return;
        }
        navegarParaPersonagem(idBusca.trim());
    };

    const limparSessionStorage = () => {
        try {
            if (typeof window !== 'undefined' && window.sessionStorage) {
                sessionStorage.removeItem(STORAGE_KEY);
            }
            setPersonagens([]);
        } catch (error) {
            console.error("Erro ao limpar sessionStorage:", error);
            setPersonagens([]);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            buscarPersonagens();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Lista de Personagens</h1>
                    <p className={styles.subtitle}>Explore nossa coleção de personagens 2D</p>
                </div>

                <div className={styles.searchSection}>
                    <h3 className={styles.searchTitle}>Buscar por ID</h3>
                    <div className={styles.searchContainer}>
                        <input 
                            type="number" 
                            value={idBusca}
                            onChange={(e) => setIdBusca(e.target.value)}
                            placeholder="Digite o ID (ex: 1, 5, 25...)"
                            className={styles.searchInput}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    buscarPorId();
                                }
                            }}
                        />
                        <button 
                            onClick={buscarPorId} 
                            className={styles.searchButton}
                            disabled={!idBusca.trim()}
                        >
                            Buscar por ID
                        </button>
                    </div>
                </div>

                <div className={styles.controls}>
                    <button onClick={limparSessionStorage} className={styles.clearButton}>
                        Limpar
                    </button>
                    <button onClick={buscarPersonagens} className={styles.reloadButton}>
                        Recarregar Lista
                    </button>
                </div>

                <div className={styles.info}>
                    <h2 className={styles.countTitle}>Personagens ({personagens.length})</h2>
                </div>

                {loading && (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Carregando personagens...</p>
                    </div>
                )}

                {error && (
                    <div className={styles.error}>
                        <p>Erro ao buscar os personagens</p>
                        <button onClick={buscarPersonagens} className={styles.retryButton}>
                            Tentar novamente
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <div className={styles.commentsGrid}>
                        {personagens.map((personagem) => (
                            <div 
                                key={personagem.id} 
                                className={styles.commentCard}
                                onClick={() => navegarParaPersonagem(personagem.id)}
                            >
                                <div className={styles.commentHeader}>
                                    <span className={styles.commentId}>#{personagem.id}</span>
                                    {personagem.year && (
                                        <span className={styles.postId}>Ano: {personagem.year}</span>
                                    )}
                                </div>
                                
                                <h3 className={styles.commentName}>{personagem.title}</h3>
                                
                                {personagem.creator && (
                                    <p className={styles.commentEmail}>
                                        <strong>Criador:</strong> {personagem.creator}
                                    </p>
                                )}
                                
                                {personagem.genre && (
                                    <p className={styles.commentBody}>
                                        <strong>Gêneros:</strong> {Array.isArray(personagem.genre) ? personagem.genre.join(', ') : personagem.genre}
                                    </p>
                                )}
                                
                                <div className={styles.cardActions}>
                                    <span className={styles.viewDetails}>Ver detalhes →</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && personagens.length === 0 && (
                    <div className={styles.empty}>
                        <h2>Nenhum personagem encontrado</h2>
                        <p>Clique em "Recarregar" para buscar os personagens</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}