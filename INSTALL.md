# Instruções de Instalação e Distribuição

## Jogo Educacional de Inteligência Emocional

Este documento fornece instruções completas para instalar e distribuir o jogo educacional em diferentes ambientes.

---

## Requisitos do Sistema

Antes de instalar, certifique-se de que seu sistema atende aos seguintes requisitos:

- **Node.js:** Versão 18.0 ou superior
- **npm ou pnpm:** Gerenciador de pacotes
- **Navegador moderno:** Chrome, Firefox, Safari ou Edge (versão recente)
- **Espaço em disco:** Mínimo 500 MB para instalação completa

---

## Opção 1: Instalação em Servidor (Recomendado para Escolas)

### Passo 1: Preparar o Ambiente

```bash
# Clone ou extraia os arquivos do projeto
cd jogo_emocional

# Instale as dependências
npm install
# ou
pnpm install
```

### Passo 2: Compilar o Projeto

```bash
# Gere a versão de produção otimizada
npm run build
# ou
pnpm build
```

Isso criará uma pasta `dist/` com todos os arquivos estáticos prontos para distribuição.

### Passo 3: Servir em um Servidor Web

#### Opção A: Usando Node.js com Express

```bash
# Instale o Express
npm install express

# Crie um arquivo server.js
cat > server.js << 'EOF'
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
EOF

# Inicie o servidor
node server.js
```

#### Opção B: Usando Apache

1. Copie o conteúdo da pasta `dist/` para o diretório raiz do seu servidor Apache (geralmente `/var/www/html/`)
2. Crie um arquivo `.htaccess` na raiz:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Opção C: Usando Nginx

Configure seu arquivo `nginx.conf`:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    
    root /var/www/jogo_emocional/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Passo 4: Acessar o Jogo

Abra seu navegador e acesse:
- Localmente: `http://localhost:3000`
- Remotamente: `http://seu-servidor.com`

---

## Opção 2: Instalação em Computador Individual

### Windows

1. **Instale Node.js:**
   - Baixe de https://nodejs.org/
   - Execute o instalador e siga as instruções

2. **Extraia os arquivos do jogo**

3. **Abra o Prompt de Comando e navegue até a pasta:**
   ```cmd
   cd caminho\para\jogo_emocional
   ```

4. **Instale as dependências:**
   ```cmd
   npm install
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```cmd
   npm run dev
   ```

6. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

### macOS

1. **Instale Node.js:**
   ```bash
   # Usando Homebrew
   brew install node
   ```

2. **Extraia os arquivos do jogo**

3. **Abra o Terminal e navegue até a pasta:**
   ```bash
   cd /caminho/para/jogo_emocional
   ```

4. **Instale as dependências:**
   ```bash
   npm install
   ```

5. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

6. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

### Linux

1. **Instale Node.js:**
   ```bash
   # Debian/Ubuntu
   sudo apt-get update
   sudo apt-get install nodejs npm
   
   # Fedora
   sudo dnf install nodejs npm
   ```

2. **Extraia os arquivos do jogo**

3. **Abra o Terminal e navegue até a pasta:**
   ```bash
   cd /caminho/para/jogo_emocional
   ```

4. **Instale as dependências:**
   ```bash
   npm install
   ```

5. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

6. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

---

## Opção 3: Distribuição Offline (Arquivo Único)

Para distribuir o jogo sem necessidade de servidor:

1. **Compile o projeto:**
   ```bash
   npm run build
   ```

2. **Comprima a pasta `dist/`:**
   ```bash
   # Windows
   # Use o Explorador de Arquivos para criar um arquivo ZIP
   
   # Linux/macOS
   zip -r jogo_emocional.zip dist/
   ```

3. **Distribua o arquivo ZIP** para escolas ou usuários

4. **Para usar:**
   - Extraia o arquivo ZIP
   - Abra o arquivo `index.html` diretamente no navegador
   - Funciona offline uma vez carregado

---

## Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto para configurar:

```env
VITE_APP_TITLE=Jogo de Inteligência Emocional
VITE_APP_LOGO=/logo.png
```

---

## Troubleshooting

### Porta 3000 já está em uso

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS
lsof -i :3000
kill -9 <PID>
```

### Erro de permissão ao instalar dependências

```bash
# Limpe o cache do npm
npm cache clean --force

# Tente instalar novamente
npm install
```

### Jogo não carrega no navegador

1. Verifique se o servidor está rodando
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Tente em outro navegador
4. Verifique o console do navegador para erros (F12)

---

## Suporte e Documentação

Para mais informações sobre o desenvolvimento ou personalização do jogo, consulte:

- **Documentação React:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Vite:** https://vitejs.dev

---

## Licença

Este jogo educacional foi desenvolvido para fins educacionais. Sinta-se livre para usar, modificar e distribuir conforme necessário para sua instituição.

---

## Contato

Para dúvidas ou sugestões sobre o jogo, entre em contato com a equipe de desenvolvimento.

**Data de Criação:** Novembro de 2025  
**Versão:** 1.0.0
