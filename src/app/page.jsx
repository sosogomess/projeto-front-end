"use client";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
const blogPosts = [
    {
        id: 1,
        title: "Projeto do Carrinho",
        excerpt: "Participei do desenvolvimento de um carrinho funcional como parte de um desafio prático escolar.",
        category: "Projeto Escolar",
        role: "Desenvolvedora"
    },
    {
        id: 2,
        title: "Portal de Matéria: Geografia",
        excerpt: "Fui Product Owner no desenvolvimento de um portal de matérias escolares, onde o tema Geografia foi definido para explorar conteúdos e recursos interativos.",
        category: "Projeto Escolar",
        role: "Product Owner"
    },
    {
        id: 3,
        title: "Lumina: Blog de Beleza",
        excerpt: "Participei como desenvolvedora em equipe escolar no projeto Lumina, um blog de beleza criado para o foco em autocuidado.",
        category: "Projeto escolar",
        role: "Desenvolvedora"
    }
];

return (
    <div className={styles.container}>
        <Header />
        
        {/* Hero Section */}
        <section className={styles.heroSection}>
            <div className={styles.heroContainer}>
                <div className={styles.heroContentFlex}>
                    <div className={styles.heroImageContainer}>
                        <Image
                            src="/image/eufoto.jpeg"
                            alt="Foto do Aluno"
                            width={200}
                            height={200}
                            className={styles.profileImageSquare}
                        />
                    </div>
                    <div className={styles.heroTextContainer}>
                        <h1 className={styles.heroTitle}>Sophia Gomes</h1>
                        <p className={styles.heroSubtitle}>Estudante de Desenvolvimento de Sistemas</p>
                        <p className={styles.heroQuote}>
                            "O sucesso é a soma de pequenos esforços repetidos dia após dia."
                            <span style={{display: 'block', fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.75}}>- Robert Collier</span>
                        </p>
                        <div className={styles.heroTags}>
                            <span className={styles.heroTag}>SESI & SENAI Valinhos</span>
                            <span className={styles.heroTag}>Turma 2TDS</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    {/* About Section */}
    <section className={styles.aboutSection}>
            <div className={styles.aboutContainer}>
                    <div className={styles.aboutContent}>
                            <h2 className={styles.sectionTitle}>Projeto Final</h2>
                            <p className={styles.aboutText}>
                                 Projeto de front-end consumindo uma API, compartilhando conhecimentos e experiências do curso de Desenvolvimento de Sistemas.
                            </p>
                    </div>
            </div>
    </section>
        <section className={styles.postsSection}>
            <div className={styles.postsContainer}>
                <div className={styles.postsContent}>
                    <h2 className={styles.sectionTitle}>Últimos Projetos</h2>
                    <p className={styles.aboutText}>Compartilhando conhecimentos e experiências</p>
                </div>
                
                <div className={styles.postsGrid}>
                    {blogPosts.map((post) => (
                        <article key={post.id} className={styles.blogCard}>
                            <div className={styles.cardContent}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.categoryTag}>
                                        {post.category}
                                    </span>
                                    <span className={styles.readTime}>{post.readTime}</span>
                                </div>
                                <h3 className={styles.cardTitle}>
                                    {post.title}
                                </h3>
                                <p className={styles.cardExcerpt}>
                                    {post.excerpt}
                                </p>
                                <div className={styles.cardFooter}>
                                    <span className={styles.cardDate}>{post.date}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>

        <Footer />
    </div>
);
}