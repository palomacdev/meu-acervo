# crud.py

from sqlalchemy.orm import Session
from models import Midia
from schemas import MidiaCreate, MidiaUpdate
from typing import List, Optional
from sqlalchemy.orm import Session


def criar_midia(db: Session, midia: MidiaCreate) -> Midia:
    """Criar uma nova mídia no banco de dados"""
    db_midia = Midia(
        titulo=midia.titulo,
        tipo=midia.tipo,
        status=midia.status,
        nota=midia.nota
    )
    db.add(db_midia)
    db.commit()
    db.refresh(db_midia)
    return db_midia

def listar_midias(db: Session, skip: int = 0, limit: int = 100) -> List[Midia]:
    """Listar todas as mídias com paginação"""
    return db.query(Midia).offset(skip).limit(limit).all()

def buscar_midia_por_id(db: Session, midia_id: int) -> Optional[Midia]:
    """Buscar uma mídia específica por ID"""
    return db.query(Midia).filter(Midia.id == midia_id).first()

def atualizar_midia(db: Session, midia_id: int, midia_update: MidiaUpdate) -> Optional[Midia]:
    """Atualizar uma mídia existente"""
    db_midia = buscar_midia_por_id(db, midia_id)
    if not db_midia:
        return None
    
    # Atualizar apenas os campos fornecidos
    update_data = midia_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_midia, field, value)
    
    db.commit()
    db.refresh(db_midia)
    return db_midia

def deletar_midia(db: Session, midia_id: int) -> bool:
    """Deletar uma mídia do banco de dados"""
    db_midia = buscar_midia_por_id(db, midia_id)
    if not db_midia:
        return False
    
    db.delete(db_midia)
    db.commit()
    return True

def buscar_midias_por_tipo(db: Session, tipo: str) -> List[Midia]:
    """Buscar mídias por tipo (Livro, Filme, Série)"""
    return db.query(Midia).filter(Midia.tipo == tipo).all()

def buscar_midias_por_status(db: Session, status: str) -> List[Midia]:
    """Buscar mídias por status (Quero Ver/Ler, Já Vi/Li)"""
    return db.query(Midia).filter(Midia.status == status).all()

def listar_midias(db: Session, skip = 0, limit: int = 100):
    """
    Lista as mídias aplicando skip e limit, e retorna o total de itens."""
    #1. Obter o total de registros (COUNT)
    total_midias = db.query(models.Midia).count()

    #2. Obter a lista de midias paginada
    midias = (
        db.query(models.Midia)
        .offset(skip)
        .limit(limit)
        .all()
    )

    # Retornar os dados e o total
    return {
        "total": total_midias,
        "midias": midias
    }