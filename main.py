from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
from models import engine, SessionLocal, MediaCreate, MediaResponse, Media
from typing import List
from fastapi.middleware.cors import CORSMiddleware

# Cria as tabelas no banco de dados
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Meu Acervo API",
    description="API para gerenciar um acervo pessoal de mídias (livros, filmes e séries).",
    version="1.0.0"
)

# --- CONFIGURAÇÃO DO CORS ---
origins = [
    "http://localhost:3000",
    "https://super-duper-space-acorn-gv5jw6vq9p6cp45x-3000.app.github.dev", 
    "https://*.app.github.dev" # SEM barra no final
    "*"  # TEMPORÁRIO para debug 
]
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Dependência para obter a sessão do banco de dados ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Endpoints ---
@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API do Meu Acervo!"}

@app.post("/midias", response_model=MediaResponse)
def create_media(media: MediaCreate, db: Session = Depends(get_db)):
    print(f"Recebido: {media.model_dump()}")  # Debug
    db_media = models.Media(**media.model_dump())
    db.add(db_media)
    db.commit()
    db.refresh(db_media)
    return db_media

@app.get("/midias", response_model=List[MediaResponse])
def read_midias(db: Session = Depends(get_db)):
    midias = db.query(Media).all()
    return midias

@app.get("/midias/{media_id}", response_model=MediaResponse)
def read_media(media_id: int, db: Session = Depends(get_db)):
    db_media = db.query(Media).filter(Media.id == media_id).first()
    if db_media is None:
        raise HTTPException(status_code=404, detail="Mídia não encontrada")
    return db_media

@app.put("/midias/{media_id}", response_model=MediaResponse)
def update_media(media_id: int, media_update: MediaCreate, db: Session = Depends(get_db)):
    db_media = db.query(Media).filter(Media.id == media_id).first()
    if db_media is None:
        raise HTTPException(status_code=404, detail="Mídia não encontrada")
    
    for key, value in media_update.model_dump().items():
        setattr(db_media, key, value)
    
    db.commit()
    db.refresh(db_media)
    return db_media

@app.delete("/midias/{media_id}")
def delete_media(media_id: int, db: Session = Depends(get_db)):
    db_media = db.query(Media).filter(Media.id == media_id).first()
    if db_media is None:
        raise HTTPException(status_code=404, detail="Mídia não encontrada")
    
    db.delete(db_media)
    db.commit()
    return {"message": "Mídia deletada com sucesso"}