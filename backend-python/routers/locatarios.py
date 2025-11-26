from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db
from auth import get_current_user

router = APIRouter(prefix="/api/locatarios", tags=["locatarios"])

def verificar_propriedade_unidade(unidade_id: int, usuario_id: int, db: Session):
    unidade = db.query(models.Unidade).join(models.Imovel).filter(
        models.Unidade.id == unidade_id,
        models.Imovel.usuario_id == usuario_id
    ).first()
    if not unidade:
        raise HTTPException(status_code=403, detail="Você não tem permissão para acessar esta unidade")
    return unidade

@router.post("", response_model=schemas.Locatario)
def criar_locatario(locatario: schemas.LocatarioCreate, db: Session = Depends(get_db), current_user: models.Usuario = Depends(get_current_user)):
    unidade = verificar_propriedade_unidade(locatario.unidade_id, current_user.id, db)
    
    # Verificar se já existe locatário nesta unidade
    locatario_existente = db.query(models.Locatario).filter(
        models.Locatario.unidade_id == locatario.unidade_id
    ).first()
    if locatario_existente:
        raise HTTPException(status_code=400, detail="Esta unidade já possui um locatário")
    
    db_locatario = models.Locatario(**locatario.dict())
    db.add(db_locatario)
    
    # Atualizar status da unidade para "alugado"
    unidade.status = "alugado"
    
    db.commit()
    db.refresh(db_locatario)
    return db_locatario

@router.put("/{locatario_id}", response_model=schemas.Locatario)
def atualizar_locatario(locatario_id: int, locatario: schemas.LocatarioBase, db: Session = Depends(get_db), current_user: models.Usuario = Depends(get_current_user)):
    db_locatario = db.query(models.Locatario).join(models.Unidade).join(models.Imovel).filter(
        models.Locatario.id == locatario_id,
        models.Imovel.usuario_id == current_user.id
    ).first()
    if not db_locatario:
        raise HTTPException(status_code=404, detail="Locatário não encontrado")
    
    for key, value in locatario.dict().items():
        setattr(db_locatario, key, value)
    
    db.commit()
    db.refresh(db_locatario)
    return db_locatario

@router.delete("/{locatario_id}")
def deletar_locatario(locatario_id: int, db: Session = Depends(get_db), current_user: models.Usuario = Depends(get_current_user)):
    db_locatario = db.query(models.Locatario).join(models.Unidade).join(models.Imovel).filter(
        models.Locatario.id == locatario_id,
        models.Imovel.usuario_id == current_user.id
    ).first()
    if not db_locatario:
        raise HTTPException(status_code=404, detail="Locatário não encontrado")
    
    # Atualizar status da unidade para "disponivel"
    unidade = db.query(models.Unidade).filter(models.Unidade.id == db_locatario.unidade_id).first()
    if unidade:
        unidade.status = "disponivel"
    
    db.delete(db_locatario)
    db.commit()
    return {"message": "Locatário removido com sucesso"}
