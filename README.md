# 📚 Meu Acervo

Uma aplicação web completa para catalogar filmes, séries e livros que você já consumiu ou pretende consumir.

## 🎯 Funcionalidades

- **Adicionar Mídia**: Cadastre novos itens especificando título, tipo, status e nota
- **Visualizar Acervo**: Liste todos os itens cadastrados com suas informações
- **Atualizar Mídia**: Edite informações de qualquer item (status, nota, etc.)
- **Deletar Mídia**: Remova itens do seu acervo
- **Filtros**: Filtre por tipo (Livro, Filme, Série) e status (Quero Ver/Ler, Já Vi/Li)

## 🏗️ Arquitetura

### Backend
- **Framework**: FastAPI (Python)
- **Banco de Dados**: SQLite
- **ORM**: SQLAlchemy
- **Validação**: Pydantic
- **Porta**: 8000

### Frontend
- **Framework**: React.js
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Porta**: 5173

### Comunicação
- **API REST** com troca de dados em formato JSON
- **CORS** configurado para permitir comunicação entre frontend e backend

## 📁 Estrutura do Projeto

```
meu-acervo/
├── backend/
│   ├── main.py              # Aplicação FastAPI principal
│   ├── database.py          # Configuração do banco de dados
│   ├── models.py            # Modelos SQLAlchemy
│   ├── schemas.py           # Schemas Pydantic
│   ├── crud.py              # Operações CRUD
│   ├── requirements.txt     # Dependências Python
│   └── meu_acervo.db       # Banco de dados SQLite
│
└── frontend/
    ├── src/
    │   ├── components/      # Componentes React
    │   │   ├── FormularioMidia.jsx
    │   │   ├── ListaMidias.jsx
    │   │   ├── MidiaCard.jsx
    │   │   └── Filtros.jsx
    │   ├── App.jsx          # Componente principal
    │   ├── api.js           # Cliente API
    │   ├── main.jsx         # Entry point
    │   └── index.css        # Estilos globais
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🚀 Como Executar

### Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
pip3 install -r requirements.txt
```

3. Inicie o servidor:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

4. Acesse a documentação interativa da API:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
pnpm install
```

3. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

4. Acesse a aplicação em: http://localhost:5173

## 🔌 Endpoints da API

### Mídias
- `GET /midias` - Listar todas as mídias
- `GET /midias/{id}` - Buscar mídia por ID
- `POST /midias` - Criar nova mídia
- `PUT /midias/{id}` - Atualizar mídia
- `DELETE /midias/{id}` - Deletar mídia

### Filtros
- `GET /midias/tipo/{tipo}` - Buscar por tipo (Livro, Filme, Série)
- `GET /midias/status/{status}` - Buscar por status

### Saúde
- `GET /health` - Verificar status da API

## 📊 Modelo de Dados

```python
{
    "id": int,                          # ID único (gerado automaticamente)
    "titulo": str,                      # Título da mídia
    "tipo": "Livro" | "Filme" | "Série", # Tipo da mídia
    "status": "Quero Ver/Ler" | "Já Vi/Li", # Status de consumo
    "nota": int | null                  # Nota de 1 a 5 estrelas (opcional)
}
```

## 🎨 Características do Frontend

- **Design Responsivo**: Funciona em desktop e mobile
- **Interface Intuitiva**: Cores e ícones diferenciados por tipo de mídia
- **Feedback Visual**: Animações e transições suaves
- **Validação de Formulários**: Validação em tempo real
- **Sistema de Filtros**: Filtre por tipo e status simultaneamente

## 🛠️ Tecnologias Utilizadas

### Backend
- Python 3.11
- FastAPI 0.104.1
- SQLAlchemy 2.0.23
- Pydantic 2.5.0
- Uvicorn 0.24.0

### Frontend
- React 18.2.0
- Vite 5.0.0
- Axios 1.6.0
- CSS3 (com gradientes e animações)

## 📝 Exemplos de Uso da API

### Criar uma nova mídia
```bash
curl -X POST "http://localhost:8000/midias" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "O Senhor dos Anéis",
    "tipo": "Livro",
    "status": "Já Vi/Li",
    "nota": 5
  }'
```

### Listar todas as mídias
```bash
curl http://localhost:8000/midias
```

### Atualizar uma mídia
```bash
curl -X PUT "http://localhost:8000/midias/1" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Já Vi/Li",
    "nota": 4
  }'
```

### Deletar uma mídia
```bash
curl -X DELETE "http://localhost:8000/midias/1"
```

## 🌟 Próximas Melhorias

- [ ] Adicionar campo de comentários/resenhas
- [ ] Implementar busca por título
- [ ] Adicionar data de conclusão
- [ ] Implementar autenticação de usuários
- [ ] Adicionar paginação na listagem
- [ ] Integração com APIs externas (TMDB, Google Books)
- [ ] Exportar acervo para CSV/PDF
- [ ] Dark mode

## 📄 Licença

Este projeto foi criado para fins educacionais.

## 👨‍💻 Autor

Paloma Cordeiro

---

Projeto desenvolvido como exemplo de aplicação full-stack com Python, FastAPI e React.

