"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from './post.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const STORAGE_KEY = "personagens_criados_sessionStorage";

export default function Post() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [addedPersonagens, setAddedPersonagens] = useState([]);
    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        imagem: ""
    });
    const [error, setError] = useState(false);

    useEffect(() => {
        // Aguardar o componente estar totalmente montado
        const timer = setTimeout(() => {
            if (typeof window !== 'undefined' && window.sessionStorage) {
                const sessionStorageData = sessionStorage.getItem(STORAGE_KEY);
                if (sessionStorageData) {
                    try {
                        setAddedPersonagens(JSON.parse(sessionStorageData));
                    } catch (error) {
                        console.error("Erro ao carregar sessionStorage:", error);
                    }
                }
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Função para criar um novo personagem via POST
    const criarPersonagem = async (e) => {
        e.preventDefault();
        if (!form.nome.trim() || !form.descricao.trim() || !form.imagem.trim()) {
            toast.error("Preencha todos os campos!");
            return;
        }
        
        setLoading(true);
        setError(false);

        try {
            // Cria um novo personagem local
            const novoPersonagem = {
                id: Date.now(),
                nome: form.nome.trim(),
                descricao: form.descricao.trim(),
                imagem: form.imagem.trim(),
                created_at: new Date().toISOString()
            };

            // Simula POST delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Atualiza sessionStorage
            if (typeof window !== 'undefined' && window.sessionStorage) {
                const sessionStorageData = sessionStorage.getItem(STORAGE_KEY);
                const personagensAtuais = sessionStorageData ? JSON.parse(sessionStorageData) : [];
                const personagensAtualizados = [novoPersonagem, ...personagensAtuais];
                
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(personagensAtualizados));
                setAddedPersonagens(personagensAtualizados);
            }
            
            // Limpa o formulário
            setForm({ nome: "", descricao: "", imagem: "" });
            toast.success("Personagem criado com sucesso!");
        } catch (error) {
            setError(true);
            toast.error("Erro ao criar personagem!");
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    };

    const atualizarForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.formBox}>
                <form onSubmit={criarPersonagem} style={{width: '100%'}}>
                    <div className={styles.formTitle}>Criar Personagem (POST)</div>
                    <input
                        type="text"
                        name="nome"
                        value={form.nome}
                        onChange={atualizarForm}
                        placeholder="Nome"
                        required
                        className={styles.input}
                    />
                    <input
                        type="text"
                        name="descricao"
                        value={form.descricao}
                        onChange={atualizarForm}
                        placeholder="Descrição"
                        required
                        className={styles.input}
                    />
                    <input
                        type="text"
                        name="imagem"
                        value={form.imagem}
                        onChange={atualizarForm}
                        placeholder="URL da Imagem"
                        required
                        className={styles.input}
                    />
                    <button
                        type="submit"
                        className={styles.criarBtn}
                        disabled={loading}
                    >
                        {loading ? "Criando..." : "Criar Personagem"}
                    </button>
                </form>
                
                <div className={styles.getButtonContainer}>
                    <Link href="/get" className={styles.getButton}>
                        Exibir Todos os Personagens
                    </Link>
                </div>
            </div>

            {addedPersonagens.length > 0 && (
                <div className={styles.listContainer}>
                    <h2>Personagens Criados ({addedPersonagens.length})</h2>
                    <div className={styles.listaPersonagens}>
                        {addedPersonagens.map((personagem, index) => (
                            <div key={personagem.id || index} className={styles.personagemItem}>
                                <hr />
                                <p><strong>ID:</strong> {personagem.id}</p>
                                <p><strong>Nome:</strong> {personagem.nome}</p>
                                <p><strong>Descrição:</strong> {personagem.descricao}</p>
                                <p><strong>Imagem:</strong> {personagem.imagem}</p>
                                {personagem.created_at && (
                                    <p><strong>Criado em:</strong> {new Date(personagem.created_at).toLocaleString('pt-BR')}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}