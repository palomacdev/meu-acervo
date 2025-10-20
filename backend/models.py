# models.py 

from sqlalchemy import Column, Integer, String, Enum
from database import Base
import enum

class TipoMidia(str, enum.Enum):
    """Tipos de mídia disponíveis"""
    LIVRO = "Livro"
    FILME = "Filme"
    SERIE = "Série"

class StatusMidia(str, enum.Enum):
    """Status de consumo da mídia"""
    QUERO_VER = "Quero Ver/Ler"
    JA_VI = "Já Vi/Li"

class Midia(Base):
    """Modelo de dados para itens do acervo"""
    __tablename__ = "midias"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False, index=True)
    tipo = Column(Enum(TipoMidia), nullable=False)
    status = Column(Enum(StatusMidia), nullable=False, default=StatusMidia.QUERO_VER)
    nota = Column(Integer, nullable=True)  # 1 a 5 estrelas, pode ser None se ainda não avaliou

    def __repr__(self):
        return f"<Midia(id={self.id}, titulo='{self.titulo}', tipo='{self.tipo}')>"