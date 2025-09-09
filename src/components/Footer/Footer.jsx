"use client";

import styles from "./Footer.module.css";

export default function Footer() {
return (
    <footer className={styles.footer}>
        <div className={styles.footerContainer}>
            <div className={styles.footerGrid}>
                <div className={styles.footerSection}>
                    <h3>Meu Projeto</h3>
                    <p>
                        Projeto de front-end API, compartilhando conhecimentos e experiências do curso de Desenvolvimento de Sistemas.
                    </p>
                </div>
                <div className={styles.footerSection}>
                    <h3>Links Rápidos</h3>
                    <ul className={styles.footerLinks}>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">Sobre</a></li>
                        <li><a href="#posts">Posts</a></li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3>Contato</h3>
                    <p>SESI & SENAI Valinhos</p>
                    <p>Turma: 2TDS</p>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>
                    &copy; {new Date().getFullYear()} Sophia Gomes. Todos os direitos reservados.
                </p>
            </div>
        </div>
    </footer>
);
}