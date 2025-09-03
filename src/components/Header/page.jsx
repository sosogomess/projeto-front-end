"use client";

import styles from "../../app/page.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <div className={styles.logoText}>
              <h1>Projeto Front-end API</h1>
              <p>SESI & SENAI Valinhos - 2TDS</p>
            </div>
          </div>
          <nav className={styles.nav}>
            <a href="#home" className={styles.navLink}>Home</a>
            <a href="#about" className={styles.navLink}>Sobre</a>
            <a href="#posts" className={styles.navLink}>Posts</a>
            <a href="#contact" className={styles.navLink}>Contato</a>
          </nav>
        </div>
      </div>
    </header>
  );
}