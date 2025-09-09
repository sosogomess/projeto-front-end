# Projeto Front-end - Personagens 2D

> **Aplicação web moderna para explorar personagens de desenhos animados clássicos**

Este projeto foi desenvolvido como parte do curso de **Desenvolvimento Front-end** do **SESI & SENAI Valinhos - 2TDS**, utilizando **Next.js 15** e consumindo APIs externas para demonstrar conceitos fundamentais de desenvolvimento web moderno.

## ✨ Funcionalidades

- **Listagem de Personagens**: Visualize uma coleção completa de personagens 2D
- **Detalhes Completos**: Explore informações detalhadas de cada personagem
- **Performance Otimizada**: Carregamento rápido com Next.js
- **UX Intuitiva**: Navegação fluida e feedback visual ao usuário
- **Notificações**: Sistema de alertas com React Toastify

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React de produção
- **Axios** - Cliente HTTP para requisições à API
- **CSS Modules** - Estilização componetizada
- **React Toastify** - Sistema de notificações
- **ESLint** - Linting e qualidade de código

## 🌐 API Utilizada

**Cartoons 2D API**: `https://api.sampleapis.com/cartoons/cartoons2D`

Fornece dados sobre personagens clássicos de desenhos animados, incluindo:
- Nome e ano de criação
- Criador/estúdio
- Gêneros e classificação
- Imagens e informações adicionais

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- npm 

### Instalação

```bash
# Clone o repositório
git clone https://github.com/sosogomess/projeto-front-end.git

# Entre no diretório
cd projeto-front-end

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

### Acessar a aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎯 Funcionalidades Implementadas

### 📊 Página de Listagem (`/personagens`)
- Fetch de dados da API externa
- Renderização em grid responsivo
- Cards informativos com preview
- Links para página de detalhes
- Estados de loading e erro

### 🔍 Página de Detalhes (`/personagens/[id]`)
- Fetch específico por ID
- Layout detalhado com informações completas
- Breadcrumb de navegação
- Botões de retorno e navegação
- Tratamento de erros com Toastify
- Design responsivo premium

### 🧭 Componentes Reutilizáveis
- **Header**: Navegação principal com logo
- **Footer**: Informações do projeto


## 👨‍💻 Desenvolvido por

**Sophia Gomes SESI & SENAI Valinhos - Turma 2TDS**

---

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
```

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso de Desenvolvimento Front-end.

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**
