"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import styles from './create.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function CreatePersonagem() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    imagem: ""
  });

  const atualizarForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const criarPersonagem = async (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.descricao.trim() || !form.imagem.trim()) {
      toast.error("Preencha todos os campos!");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/personagens", {
        nome: form.nome.trim(),
        descricao: form.descricao.trim(),
        imagem: form.imagem.trim()
      });
      toast.success("Personagem criado com sucesso!");
      setTimeout(() => router.push("/personagens"), 1500);
    } catch (error) {
      toast.error("Erro ao criar personagem!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.formBox}>
        <form onSubmit={criarPersonagem} style={{width: '100%'}}>
          <div className={styles.formTitle}>Criar Personagem</div>
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
      </div>
      <Footer />
    </div>
  );
}
