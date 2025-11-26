from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date

# Usuario Schemas
class UsuarioBase(BaseModel):
    nome: str
    email: EmailStr

class UsuarioCreate(UsuarioBase):
    senha: str

class Usuario(UsuarioBase):
    id: int
    
    class Config:
        from_attributes = True

# Locatario Schemas
class LocatarioBase(BaseModel):
    nome: str
    cpf: str
    telefone: Optional[str] = None
    email: Optional[str] = None
    data_inicio_contrato: date
    data_fim_contrato: Optional[date] = None

class LocatarioCreate(LocatarioBase):
    unidade_id: int

class Locatario(LocatarioBase):
    id: int
    unidade_id: int
    
    class Config:
        from_attributes = True

# Unidade Schemas
class UnidadeBase(BaseModel):
    numero: str
    valor_aluguel: float
    status: str = "disponivel"

class UnidadeCreate(UnidadeBase):
    imovel_id: int

class Unidade(UnidadeBase):
    id: int
    imovel_id: int
    locatario: Optional[Locatario] = None
    
    class Config:
        from_attributes = True

# Imovel Schemas
class ImovelBase(BaseModel):
    nome: str
    endereco: str
    cidade: str
    estado: str
    cep: Optional[str] = None

class ImovelCreate(ImovelBase):
    pass

class Imovel(ImovelBase):
    id: int
    usuario_id: int
    
    class Config:
        from_attributes = True

class ImovelDetalhado(Imovel):
    unidades: List[Unidade] = []
    
    class Config:
        from_attributes = True

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    senha: str
