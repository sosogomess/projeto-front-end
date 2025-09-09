"use client";

import styles from "./Header.module.css"; 
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Image 
              src="/image/logo.png" 
              alt="Logo" 
              width={120}  
              height={80} 
              className={styles.logoImage}
              style={{
                objectFit: 'contain',
                width: 'auto',
                height: 'auto'
              }}
              onError={(e) => {
                console.log("Erro ao carregar logo:", e);
                e.target.style.display = 'none';
              }}
              onLoad={() => console.log("Logo carregada!")}
            />
            <div className={styles.logoText}>
              <h1>Projeto Front-end API</h1>
              <p>SESI & SENAI Valinhos - 2TDS</p>
            </div>
          </div>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <a href="#about" className={styles.navLink}>Sobre</a>
            <a href="#posts" className={styles.navLink}>Posts</a>
            <a href="#contact" className={styles.navLink}>Contato</a>
            <Link href="/apiinfo" className={styles.navLink}>API Info</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}