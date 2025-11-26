from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db
from auth import get_current_user

router = APIRouter(prefix="/api/unidades", tags=["unidades"])

def verificar_propriedade_imovel(imovel_id: int, usuario_id: int, db: Session):
    imovel = db.query(models.Imovel).filter(
        models.Imovel.id == imovel_id,
        models.Imovel.usuario_id == usuario_id
    ).first()
    if not imovel:
        raise HTTPException(status_code=403, detail="Você não tem permissão para acessar este imóvel")
    return imovel

@router.post("", response_model=schemas.Unidade)
def criar_unidade(unidade: schemas.UnidadeCreate, db: Session = Depends(get_db), current_user: models.Usuario = Depends(get_current_user)):
    verificar_propriedade_imovel(unidade.imovel_id, current_user.id, db)
    
    # Verificar se já existe unidade com mesmo número no imóvel
    unidade_existente = db.query(models.Unidade).filter(
        models.Unidade.imovel_id == unidade.imovel_id,
        models.Unidade.numero == unidade.numero
    ).first()
    if unidade_existente:
        raise HTTPException(status_code=400, detail="Já existe uma unidade com este número neste imóvel")
    
    db_unidade = models.Unidade(**unidade.dict())
    db.add(db_unidade)
    db.commit()
    db.refresh(db_unidade)
    return db_unidade

@router.put("/{unidade_id}", response_model=schemas.Unidade)
def atualizar_unidade(unidade_id: int, unidade: schemas.UnidadeBase, db: Session = Depends(get_db), current_user: models.Usuario = Depends(get_current_user)):
    db_unidade = db.query(models.Unidade).join(models.Imovel).filter(
        models.Unidade.id == unidade_id,
        models.Imovel.usuario_id == current_user.id
    ).first()
    if not db_unidade:
        raise HTTPException(status_code=404, detail="Unidade não encontrada")
    
    for key, value in unidade.dict().items():
        setattr(db_unidade, key, value)
    
    db.commit()
    db.refresh(db_unidade)
    return db_unidade

@router.delete("/{unidade_id}")
def deletar_unidade(unidade_id: int, db: Session = Depends(get_db), current_user: models.Usuario = Depends(get_current_user)):
    db_unidade = db.query(models.Unidade).join(models.Imovel).filter(
        models.Unidade.id == unidade_id,
        models.Imovel.usuario_id == current_user.id
    ).first()
    if not db_unidade:
        raise HTTPException(status_code=404, detail="Unidade não encontrada")
    
    db.delete(db_unidade)
    db.commit()
    return {"message": "Unidade deletada com sucesso"}
