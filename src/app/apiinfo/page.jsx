"use client";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./apiinfo.module.css";

export default function ApiInfo() {
    return (
        <div className={styles.container}>
            <Header />
            
            <div className={styles.leftCharacters}>
                <img 
                    src="https://www.animaker.co/blog/wp-content/uploads/2024/01/Mickey_Mouse_Disney_1-186x300.png" 
                    alt="Mickey Mouse" 
                    className={styles.floatingCharacter}
                    style={{top: '5%', left: '0%'}}
                />
                <img 
                    src="https://artpoin.com/wp-content/uploads/2024/07/divertida-mente-imagens14.png" 
                    alt="Divertida Mente" 
                    className={styles.floatingCharacter}
                    style={{top: '30%', left: '0%'}}
                />
                <img 
                    src="https://acessocultural.com.br/wp-content/uploads/2019/03/vanellope1.png" 
                    alt="Vanellope" 
                    className={styles.floatingCharacter}
                    style={{top: '55%', left: '0%'}}
                />
                <img 
                    src="https://upload.wikimedia.org/wikipedia/pt/6/67/Lisa_Simpson_personagem.png" 
                    alt="Lisa Simpson" 
                    className={styles.floatingCharacter}
                    style={{top: '80%', left: '0%'}}
                />
            </div>

            <div className={styles.rightCharacters}>
                <img 
                    src="https://preview.redd.it/favorite-red-characters-v0-11lc9jj7ksnd1.png?width=640&crop=smart&auto=webp&s=873232796508961b041a371a0317380f147cc06b" 
                    alt="Senhor siriguejo" 
                    className={styles.floatingCharacter}
                    style={{top: '5%', right: '0%'}}
                />
                <img 
                    src="https://preview.redd.it/female-characters-voiced-by-men-v0-btdom488vvxd1.png?width=250&format=png&auto=webp&s=5d8c7fccf7875397b0381ce115377280079e4d1a" 
                    alt="Edna Moda" 
                    className={styles.floatingCharacter}
                    style={{top: '30%', right: '0%'}}
                />
                <img 
                    src="https://upload.wikimedia.org/wikipedia/pt/0/02/Homer_Simpson_2006.png" 
                    alt="Homer Simpson" 
                    className={styles.floatingCharacter}
                    style={{top: '55%', right: '0%'}}
                />
                <img 
                    src="https://i.pinimg.com/originals/4a/cc/b0/4accb0659b8c570d7620aa63cb26f993.png" 
                    alt="My Little Pony" 
                    className={styles.floatingCharacter}
                    style={{top: '80%', right: '0%'}}
                />
            </div>
            
            <main className={styles.mainContent}>
                <h1 className={styles.title}>Informações sobre a API</h1>
                
                {/* ✅ Nome da API escolhida */}
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Nome da API</h2>
                    <p className={styles.paragraph}>Cartoons 2D API</p>
                </section>

                {/* ✅ Link externo para a documentação oficial */}
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Documentação Oficial</h2>
                    <a href="https://api.sampleapis.com/cartoons/cartoons2D" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        Acesse a documentação oficial
                    </a>
                </section>

                {/* ✅ URL base usada para o axios/fetch */}
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>URL Base</h2>
                    <p className={styles.paragraph}>https://api.sampleapis.com/cartoons</p>
                </section>

                {/* ✅ Endpoint escolhido para buscar os dados */}
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Endpoint Escolhido</h2>
                    <p className={styles.paragraph}>/cartoons2D</p>
                </section>

                {/* ✅ Lista de atributos recebidos na resposta da API */}
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Atributos Recebidos</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><strong>id</strong>: Identificador único do desenho</li>
                        <li className={styles.listItem}><strong>title</strong>: Nome do desenho animado</li>
                        <li className={styles.listItem}><strong>year</strong>: Ano de lançamento</li>
                        <li className={styles.listItem}><strong>creator</strong>: Criador do desenho</li>
                        <li className={styles.listItem}><strong>rating</strong>: Classificação</li>
                        <li className={styles.listItem}><strong>genre</strong>: Gênero do desenho</li>
                        <li className={styles.listItem}><strong>runtime_in_minutes</strong>: Duração em minutos</li>
                    </ul>
                </section>

                {/* ✅ Descrição completa com CRUD */}
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Descrição e Funcionalidades</h2>
                    <p className={styles.paragraph}>
                        A Cartoons 2D API fornece informações sobre desenhos animados em 2D, incluindo
                        detalhes como título, ano de lançamento, criador e classificação. É ideal para
                        explorar dados sobre animações clássicas e modernas, permitindo consultar
                        informações detalhadas sobre diversos desenhos animados que marcaram gerações!
                    </p>
                    
                    <h3 className={styles.subtitle} style={{fontSize: '1.2rem', marginTop: '20px'}}>
                        Operações CRUD Disponíveis:
                    </h3>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <strong>GET (Read)</strong>: Buscar e exibir todos os desenhos animados 2D disponíveis na API
                        </li>
                        <li className={styles.listItem}>
                            <strong>GET por ID (Read)</strong>: Buscar informações específicas de um desenho pelo seu ID único
                        </li>
                        <li className={styles.listItem}>
                            <strong>POST (Create)</strong>: Adicionar novos desenhos animados à lista (simulado localmente)
                        </li>
                        <li className={styles.listItem}>
                            <strong>PUT (Update)</strong>: Atualizar informações de desenhos existentes (simulado localmente)
                        </li>
                        <li className={styles.listItem}>
                            <strong>DELETE</strong>: Remover desenhos da lista (simulado localmente)
                        </li>
                    </ul>
                    
                    <p className={styles.paragraph} style={{marginTop: '15px'}}>
                        <strong>Objetivo principal:</strong> Criar uma aplicação completa que permita visualizar, 
                        adicionar, editar e remover informações sobre desenhos animados 2D, proporcionando 
                        uma experiência interativa ao usuário com todas as operações básicas de um sistema CRUD.
                    </p>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}