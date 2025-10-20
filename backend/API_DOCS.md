# 📚 Documentação da API - Meu Acervo

## Base URL
```
http://localhost:8000
```

## Endpoints

### 🏥 Health Check

#### GET /health
Verifica o status da API e conexão com o banco de dados.

**Resposta:**
```json
{
  "status": "healthy",
  "database": "connected"
}
```

---

### 📖 Mídias

#### GET /midias
Lista todas as mídias cadastradas.

**Parâmetros de Query:**
- `skip` (int, opcional): Número de registros para pular (padrão: 0)
- `limit` (int, opcional): Número máximo de registros (padrão: 100)

**Resposta:**
```json
[
  {
    "id": 1,
    "titulo": "O Senhor dos Anéis",
    "tipo": "Livro",
    "status": "Já Vi/Li",
    "nota": 5
  }
]
```

---

#### GET /midias/{midia_id}
Busca uma mídia específica por ID.

**Parâmetros de Path:**
- `midia_id` (int): ID da mídia

**Resposta (200):**
```json
{
  "id": 1,
  "titulo": "O Senhor dos Anéis",
  "tipo": "Livro",
  "status": "Já Vi/Li",
  "nota": 5
}
```

**Resposta (404):**
```json
{
  "detail": "Mídia com ID 1 não encontrada"
}
```

---

#### POST /midias
Cria uma nova mídia.

**Body:**
```json
{
  "titulo": "Matrix",
  "tipo": "Filme",
  "status": "Já Vi/Li",
  "nota": 5
}
```

**Campos:**
- `titulo` (string, obrigatório): Título da mídia
- `tipo` (string, obrigatório): "Livro", "Filme" ou "Série"
- `status` (string, opcional): "Quero Ver/Ler" ou "Já Vi/Li" (padrão: "Quero Ver/Ler")
- `nota` (int, opcional): Nota de 1 a 5

**Resposta (201):**
```json
{
  "id": 2,
  "titulo": "Matrix",
  "tipo": "Filme",
  "status": "Já Vi/Li",
  "nota": 5
}
```

---

#### PUT /midias/{midia_id}
Atualiza uma mídia existente.

**Parâmetros de Path:**
- `midia_id` (int): ID da mídia

**Body (todos os campos opcionais):**
```json
{
  "titulo": "Matrix Reloaded",
  "tipo": "Filme",
  "status": "Já Vi/Li",
  "nota": 4
}
```

**Resposta (200):**
```json
{
  "id": 2,
  "titulo": "Matrix Reloaded",
  "tipo": "Filme",
  "status": "Já Vi/Li",
  "nota": 4
}
```

**Resposta (404):**
```json
{
  "detail": "Mídia com ID 2 não encontrada"
}
```

---

#### DELETE /midias/{midia_id}
Deleta uma mídia.

**Parâmetros de Path:**
- `midia_id` (int): ID da mídia

**Resposta (204):** Sem conteúdo

**Resposta (404):**
```json
{
  "detail": "Mídia com ID 2 não encontrada"
}
```

---

### 🔍 Filtros

#### GET /midias/tipo/{tipo}
Busca mídias por tipo.

**Parâmetros de Path:**
- `tipo` (string): "Livro", "Filme" ou "Série"

**Resposta:**
```json
[
  {
    "id": 1,
    "titulo": "O Senhor dos Anéis",
    "tipo": "Livro",
    "status": "Já Vi/Li",
    "nota": 5
  }
]
```

---

#### GET /midias/status/{status_midia}
Busca mídias por status.

**Parâmetros de Path:**
- `status_midia` (string): "Quero Ver/Ler" ou "Já Vi/Li"

**Resposta:**
```json
[
  {
    "id": 1,
    "titulo": "O Senhor dos Anéis",
    "tipo": "Livro",
    "status": "Já Vi/Li",
    "nota": 5
  }
]
```

---

## Códigos de Status HTTP

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `204 No Content`: Recurso deletado com sucesso
- `404 Not Found`: Recurso não encontrado
- `422 Unprocessable Entity`: Erro de validação

---

## Exemplos com cURL

### Criar uma mídia
```bash
curl -X POST "http://localhost:8000/midias" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Breaking Bad",
    "tipo": "Série",
    "status": "Quero Ver/Ler"
  }'
```

### Listar todas as mídias
```bash
curl http://localhost:8000/midias
```

### Buscar mídia por ID
```bash
curl http://localhost:8000/midias/1
```

### Atualizar mídia
```bash
curl -X PUT "http://localhost:8000/midias/1" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Já Vi/Li",
    "nota": 5
  }'
```

### Deletar mídia
```bash
curl -X DELETE "http://localhost:8000/midias/1"
```

### Filtrar por tipo
```bash
curl http://localhost:8000/midias/tipo/Livro
```

### Filtrar por status
```bash
curl "http://localhost:8000/midias/status/Já%20Vi/Li"
```

---

## Documentação Interativa

A API possui documentação interativa gerada automaticamente pelo FastAPI:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc


