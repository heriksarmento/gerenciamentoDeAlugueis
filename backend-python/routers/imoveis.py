from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import get_db
from auth import get_current_user
import httpx
import re

router = APIRouter(prefix="/api/imoveis", tags=["imoveis"])

async def buscar_endereco_por_cep(cep: str):
    """Busca endereço na API ViaCEP"""
    # Remove caracteres não numéricos
    cep_limpo = re.sub(r'\D', '', cep)
    
    if len(cep_limpo) != 8:
        return None
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://viacep.com.br/ws/{cep_limpo}/json/")
            if response.status_code == 200:
                data = response.json()
                if not data.get('erro'):
                    return {
                        'endereco': f"{data.get('logradouro', '')}",
                        'bairro': data.get('bairro', ''),
                        'cidade': data.get('localidade', ''),
                        'estado': data.get('uf', ''),
                        'cep': cep
                    }
    except Exception:
        pass
    
    return None

@router.get("", response_model=List[schemas.Imovel])
def listar_imoveis(db: Session = Depends(get_db), current_user: models.Usuario = Depends(get_current_user)):
    return db.query(models.Imovel).filter(models.Imovel.usuario_id == current_user.id).all()

@router.get("/{imovel_id}", response_model=schemas.ImovelDetalhado)
def obter_imovel(imovel_id: int, db: Session = Depends(get_db), current_user: models.Usuario = Depends(get_current_user)):
    imovel = db.query(models.Imovel).filter(
        models.Imovel.id == imovel_id,
        models.Imovel.usuario_id == current_user.id
    ).first()
    if not imovel:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")
    return imovel

@router.post("", response_model=schemas.Imovel)
async def criar_imovel(imovel: schemas.ImovelCreate, db: Session = Depends(get_db), current_user: models.Usuario = Depends(get_current_user)):
    db_imovel = models.Imovel(**imovel.dict(), usuario_id=current_user.id)
    db.add(db_imovel)
    db.commit()
    db.refresh(db_imovel)
    return db_imovel

@router.get("/buscar-cep/{cep}")
async def buscar_cep(cep: str):
    """Busca endereço pelo CEP na API ViaCEP"""
    resultado = await buscar_endereco_por_cep(cep)
    if resultado:
        return resultado
    raise HTTPException(status_code=404, detail="CEP não encontrado")

@router.put("/{imovel_id}", response_model=schemas.Imovel)
def atualizar_imovel(imovel_id: int, imovel: schemas.ImovelCreate, db: Session = Depends(get_db), current_user: models.Usuario = Depends(get_current_user)):
    db_imovel = db.query(models.Imovel).filter(
        models.Imovel.id == imovel_id,
        models.Imovel.usuario_id == current_user.id
    ).first()
    if not db_imovel:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")
    
    for key, value in imovel.dict().items():
        setattr(db_imovel, key, value)
    
    db.commit()
    db.refresh(db_imovel)
    return db_imovel

@router.delete("/{imovel_id}")
def deletar_imovel(imovel_id: int, db: Session = Depends(get_db), current_user: models.Usuario = Depends(get_current_user)):
    db_imovel = db.query(models.Imovel).filter(
        models.Imovel.id == imovel_id,
        models.Imovel.usuario_id == current_user.id
    ).first()
    if not db_imovel:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")
    
    db.delete(db_imovel)
    db.commit()
    return {"message": "Imóvel deletado com sucesso"}
