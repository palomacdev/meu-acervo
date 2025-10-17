# models.py

from sqlalchemy import create_engine, Column, Integer, String, Enum as SQLAlchemyEnum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
import enum

# --- Configuração do Banco de Dados com SQLAlchemy ---

# URL de conexão com o banco de dados SQLite
# O arquivo do banco de dados será criado como 'acervo.db' na mesma pasta
DATABASE_URL = "sqlite:///./acervo.db"

# Cria o "motor" do banco de dados
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Cria uma sessão para interagir com o banco de dados
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os modelos de tabela do banco de dados
Base = declarative_base()

# --- Modelo da Tabela do Banco de Dados ---

class MediaType(str, enum.Enum):
    LIVRO = "Livro"
    FILME = "Filme"
    SERIE = "Série"

class MediaStatus(str, enum.Enum):
    QUERO = "Quero Ver/Ler"
    JA_VI = "Já Vi/Li"

class Media(Base):
    __tablename__ = "midias"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    media_type = Column(SQLAlchemyEnum(MediaType))
    status = Column(SQLAlchemyEnum(MediaStatus))
    rating = Column(Integer, nullable=True) # A nota pode ser nula

# --- Modelos de Dados da API (Pydantic) ---

class MediaBase(BaseModel):
    title: str
    media_type: MediaType
    status: MediaStatus
    rating: int | None = None # A nota é opcional

class MediaCreate(MediaBase):
    pass

class MediaResponse(MediaBase):
    id: int

    class Config:
        from_attributes = True # Permite que o Pydantic leia dados de objetos SQLAlchemy