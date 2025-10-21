# backend/external_apis.py 
import httpx
from typing import List
import config
import schemas

# URL base para imagens do TMDb
TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

async def search_tmdb(query: str) -> List[schemas.SearchResult]:
    """
    Busca por filmes e séries na API do TMDb.
    """
    search_url = "https://api.themoviedb.org/3/search/multi"
    params = {
        "api_key": config.TMDB_API_KEY,
        "query": query,
        "language": "pt-BR",
        "include_adult": "false"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(search_url, params=params)
        response.raise_for_status() # Lança um erro se a requisição falhar
        data = response.json()

    results = []
    for item in data.get("results", []):
        if item.get("media_type") == "movie":
            results.append(schemas.SearchResult(
                id_externo=str(item.get("id")),
                titulo=item.get("title"),
                ano=item.get("release_date", "")[:4],
                tipo="Filme",
                poster_url=f"{TMDB_IMAGE_BASE_URL}{item.get('poster_path')}" if item.get('poster_path') else None,
            ))
        elif item.get("media_type") == "tv":
            results.append(schemas.SearchResult(
                id_externo=str(item.get("id")),
                titulo=item.get("name"),
                ano=item.get("first_air_date", "")[:4],
                tipo="Série",
                poster_url=f"{TMDB_IMAGE_BASE_URL}{item.get('poster_path')}" if item.get('poster_path') else None,
            ))
    return results

async def search_google_books(query: str) -> List[schemas.SearchResult]:
    """
    Busca por livros na API do Google Books.
    """
    search_url = "https://www.googleapis.com/books/v1/volumes"
    params = {
        "q": query,
        "key": config.GOOGLE_BOOKS_API_KEY,
        "maxResults": 10
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(search_url, params=params)
        response.raise_for_status()
        data = response.json()
    
    results = []
    for item in data.get("items", []):
        volume_info = item.get("volumeInfo", {})
        results.append(schemas.SearchResult(
            id_externo=item.get("id"),
            titulo=volume_info.get("title"),
            ano=volume_info.get("publishedDate", "    ")[:4],
            tipo="Livro",
            poster_url=volume_info.get("imageLinks", {}).get("thumbnail"),
        ))
    return results
