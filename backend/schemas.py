# backend/schemas.py 

from pydantic import BaseModel, Field, validator
from typing import Optional, List
from models import TipoMidia, StatusMidia

class MidiaBase(BaseModel):
    """Schema base para Mídia"""
    titulo: str = Field(..., min_length=1, max_length=200, description="Título da mídia")
    tipo: TipoMidia = Field(..., description="Tipo da mídia (Livro, Filme ou Série)")
    status: StatusMidia = Field(default=StatusMidia.QUERO_VER, description="Status de consumo")
    nota: Optional[int] = Field(None, ge=1, le=5, description="Nota de 1 a 5 estrelas")

    @validator('nota')
    def validar_nota(cls, v, values):
        """Validar que a nota só pode ser definida se o status for 'Já Vi/Li'"""
        if v is not None:
            if v < 1 or v > 5:
                raise ValueError('A nota deve estar entre 1 e 5')
        return v

class MidiaCreate(MidiaBase):
    """Schema para criar uma nova mídia"""
    pass

class MidiaUpdate(BaseModel):
    """Schema para atualizar uma mídia existente"""
    titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    tipo: Optional[TipoMidia] = None
    status: Optional[StatusMidia] = None
    nota: Optional[int] = Field(None, ge=1, le=5)

    @validator('nota')
    def validar_nota(cls, v):
        if v is not None and (v < 1 or v > 5):
            raise ValueError('A nota deve estar entre 1 e 5')
        return v

class MidiaResponse(MidiaBase):
    """Schema para resposta de mídia (inclui ID)"""
    id: int

    class Config:
        from_attributes = True  # Permite criar a partir de modelos SQLAlchemy

class ListaMidiasPaginada(BaseModel):
    """
    Schema de resposta para a listagem paginada de mídias.
    Contém a lista de itens e o total para o frontend calcular as páginas
    """
    total: int # o número total de mídias no banco (sem considerar filtro)
    midias: List[MidiaResponse]
