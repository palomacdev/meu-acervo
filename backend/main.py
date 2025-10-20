# main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import engine, Base, get_db
import models
import schemas
import crud

# Criar as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Meu Acervo API",
    description="API para gerenciar seu acervo de filmes, séries e livros",
    version="1.0.0"
)

# Configurar CORS para permitir requisições do frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "https://super-duper-space-acorn-gv5jw6vq9p6cp45x-3000.app.github.dev"],  # URLs do React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    """Endpoint raiz com informações da API"""
    return {
        "message": "Bem-vindo à API Meu Acervo!",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    """Verificar saúde da API"""
    return {"status": "healthy", "database": "connected"}

# ==================== ENDPOINTS CRUD ====================

@app.post("/midias", response_model=schemas.MidiaResponse, status_code=status.HTTP_201_CREATED)
def criar_midia(midia: schemas.MidiaCreate, db: Session = Depends(get_db)):
    """
    Criar uma nova mídia no acervo
    
    - **titulo**: Título da mídia
    - **tipo**: Tipo (Livro, Filme ou Série)
    - **status**: Status de consumo (Quero Ver/Ler ou Já Vi/Li)
    - **nota**: Nota de 1 a 5 estrelas (opcional)
    """
    return crud.criar_midia(db=db, midia=midia)

@app.get("/midias", response_model=List[schemas.MidiaResponse])
def listar_midias(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Listar todas as mídias do acervo
    
    - **skip**: Número de registros para pular (paginação)
    - **limit**: Número máximo de registros a retornar
    """
    return crud.listar_midias(db=db, skip=skip, limit=limit)

@app.get("/midias/{midia_id}", response_model=schemas.MidiaResponse)
def buscar_midia(midia_id: int, db: Session = Depends(get_db)):
    """
    Buscar uma mídia específica por ID
    """
    db_midia = crud.buscar_midia_por_id(db=db, midia_id=midia_id)
    if db_midia is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Mídia com ID {midia_id} não encontrada"
        )
    return db_midia

@app.put("/midias/{midia_id}", response_model=schemas.MidiaResponse)
def atualizar_midia(midia_id: int, midia: schemas.MidiaUpdate, db: Session = Depends(get_db)):
    """
    Atualizar uma mídia existente
    
    Permite atualizar qualquer campo da mídia (título, tipo, status, nota)
    """
    db_midia = crud.atualizar_midia(db=db, midia_id=midia_id, midia_update=midia)
    if db_midia is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Mídia com ID {midia_id} não encontrada"
        )
    return db_midia

@app.delete("/midias/{midia_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_midia(midia_id: int, db: Session = Depends(get_db)):
    """
    Deletar uma mídia do acervo
    """
    sucesso = crud.deletar_midia(db=db, midia_id=midia_id)
    if not sucesso:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Mídia com ID {midia_id} não encontrada"
        )
    return None

# ==================== ENDPOINTS DE FILTRO ====================

@app.get("/midias/tipo/{tipo}", response_model=List[schemas.MidiaResponse])
def buscar_por_tipo(tipo: models.TipoMidia, db: Session = Depends(get_db)):
    """
    Buscar mídias por tipo (Livro, Filme ou Série)
    """
    return crud.buscar_midias_por_tipo(db=db, tipo=tipo)

@app.get("/midias/status/{status_midia}", response_model=List[schemas.MidiaResponse])
def buscar_por_status(status_midia: models.StatusMidia, db: Session = Depends(get_db)):
    """
    Buscar mídias por status (Quero Ver/Ler ou Já Vi/Li)
    """
    return crud.buscar_midias_por_status(db=db, status=status_midia)
