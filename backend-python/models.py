from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    senha_hash = Column(String, nullable=False)
    
    imoveis = relationship("Imovel", back_populates="usuario", cascade="all, delete-orphan")

class Imovel(Base):
    __tablename__ = "imoveis"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    endereco = Column(String, nullable=False)
    cidade = Column(String, nullable=False)
    estado = Column(String, nullable=False)
    cep = Column(String, nullable=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"), nullable=False)
    
    usuario = relationship("Usuario", back_populates="imoveis")
    unidades = relationship("Unidade", back_populates="imovel", cascade="all, delete-orphan")

class Unidade(Base):
    __tablename__ = "unidades"
    
    id = Column(Integer, primary_key=True, index=True)
    imovel_id = Column(Integer, ForeignKey("imoveis.id", ondelete="CASCADE"), nullable=False)
    numero = Column(String, nullable=False)
    valor_aluguel = Column(Float, nullable=False)
    status = Column(String, default="disponivel")
    
    __table_args__ = (UniqueConstraint('imovel_id', 'numero', name='_imovel_numero_uc'),)
    
    imovel = relationship("Imovel", back_populates="unidades")
    locatario = relationship("Locatario", back_populates="unidade", uselist=False, cascade="all, delete-orphan")

class Locatario(Base):
    __tablename__ = "locatarios"
    
    id = Column(Integer, primary_key=True, index=True)
    unidade_id = Column(Integer, ForeignKey("unidades.id", ondelete="CASCADE"), unique=True, nullable=False)
    nome = Column(String, nullable=False)
    cpf = Column(String, nullable=False)
    telefone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    data_inicio_contrato = Column(Date, nullable=False)
    data_fim_contrato = Column(Date, nullable=True)
    
    unidade = relationship("Unidade", back_populates="locatario")
