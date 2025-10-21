# backend/config.py 
import os
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env para o ambiente
load_dotenv()

# Lê as chaves de API do ambiente
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
GOOGLE_BOOKS_API_KEY = os.getenv("GOOGLE_BOOKS_API_KEY")

# Validação básica para garantir que as chaves foram carregadas
if not TMDB_API_KEY or not GOOGLE_BOOKS_API_KEY:
    raise ValueError("Chaves de API (TMDB_API_KEY e GOOGLE_BOOKS_API_KEY) não foram encontradas no arquivo .env")
