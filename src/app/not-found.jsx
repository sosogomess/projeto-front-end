import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <img
        src="https://upload.wikimedia.org/wikipedia/pt/6/67/Lisa_Simpson_personagem.png"
        alt="Mickey Mouse"
        className={styles.characterImg}
      />
      <h1 className={styles.title}>Página não encontrada</h1>
      <p className={styles.message}>Desculpe, o conteúdo que você procura não existe ou foi removido.</p>
      <Link href="/">
        <button className={styles.homeButton}>Voltar à Home</button>
      </Link>
    </div>
  );
}
