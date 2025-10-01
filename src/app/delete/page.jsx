"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from './delete.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const STORAGE_KEY = "personagens_criados_sessionStorage";

export default function Delete() {
    const router = useRouter();
    const [personagemId, setPersonagemId] = useState("");
    const [personagem, setPersonagem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const buscarPersonagem = async () => {
        if (!personagemId.trim()) {
            toast.error("Digite um ID para buscar!");
            return;
        }

        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            if (typeof window !== 'undefined' && window.sessionStorage) {
                const sessionStorageData = sessionStorage.getItem(STORAGE_KEY);
                if (sessionStorageData) {
                    const personagensCriados = JSON.parse(sessionStorageData);
                    const personagemEncontrado = personagensCriados.find(p => p.id === parseInt(personagemId));
                    
                    if (personagemEncontrado) {
                        setPersonagem(personagemEncontrado);
                        toast.success("Personagem encontrado!");
                        return;
                    }
                }
            }

            const response = await axios.get("https://api.sampleapis.com/cartoons/cartoons2D");
            const personagemEncontrado = response.data.find(p => p.id === parseInt(personagemId));
            
            if (personagemEncontrado) {
                setPersonagem(personagemEncontrado);
                toast.success("Personagem encontrado!");
            } else {
                setError(true);
                toast.error("Personagem não encontrado!");
            }
        } catch (error) {
            setError(true);
            toast.error("Erro ao buscar personagem!");
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    };

    const deletarPersonagem = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (typeof window !== 'undefined' && window.sessionStorage) {
                const sessionStorageData = sessionStorage.getItem(STORAGE_KEY);
                if (sessionStorageData) {
                    const personagensCriados = JSON.parse(sessionStorageData);
                    const personagensAtualizados = personagensCriados.filter(p => p.id !== parseInt(personagemId));
                    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(personagensAtualizados));
                }
            }

            setSuccess(true);
            setPersonagem(null);
            setPersonagemId("");
            toast.success("Personagem deletado com sucesso!");
        } catch (error) {
            setError(true);
            toast.error("Erro ao deletar personagem!");
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.formBox}>
                <div className={styles.formTitle}>Deletar Personagem (DELETE)</div>

                <div className={styles.searchSection}>
                    <input
                        type="number"
                        value={personagemId}
                        onChange={(e) => setPersonagemId(e.target.value)}
                        placeholder="Digite o ID do personagem"
                        className={styles.input}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                buscarPersonagem();
                            }
                        }}
                    />
                    <button 
                        onClick={buscarPersonagem} 
                        disabled={!personagemId.trim() || loading}
                        className={styles.searchBtn}
                    >
                        {loading ? "Buscando..." : "Buscar Personagem"}
                    </button>
                </div>

                {personagem && (
                    <div className={styles.personagemInfo}>
                        <h3 className={styles.personagemTitle}>Personagem Encontrado</h3>
                        <div className={styles.personagemCard}>
                            {personagem.image && (
                                <img 
                                    src={personagem.image} 
                                    alt={personagem.title || personagem.nome}
                                    className={styles.personagemImage}
                                />
                            )}
                            <div className={styles.personagemDetails}>
                                <p><strong>ID:</strong> {personagem.id}</p>
                                <p><strong>Nome:</strong> {personagem.title || personagem.nome}</p>
                                {personagem.year && <p><strong>Ano:</strong> {personagem.year}</p>}
                                {personagem.creator && <p><strong>Criador:</strong> {personagem.creator}</p>}
                                {personagem.descricao && <p><strong>Descrição:</strong> {personagem.descricao}</p>}
                            </div>
                        </div>
                        <button 
                            onClick={deletarPersonagem} 
                            disabled={loading}
                            className={styles.deleteBtn}
                        >
                            {loading ? "Deletando..." : "🗑️ Deletar Personagem"}
                        </button>
                    </div>
                )}

                {success && (
                    <div className={styles.successMessage}>
                        <p>✅ Personagem deletado com sucesso!</p>
                    </div>
                )}

                {error && !personagem && (
                    <div className={styles.errorMessage}>
                        <p>❌ Personagem não encontrado</p>
                    </div>
                )}

                <div className={styles.navigationButtons}>
                    <Link href="/get" className={styles.navButton}>
                        Ver Todos os Personagens
                    </Link>
                    <Link href="/post" className={styles.navButton}>
                        Criar Novo Personagem
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}