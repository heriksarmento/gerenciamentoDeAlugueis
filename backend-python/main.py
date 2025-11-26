from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from routers import auth, imoveis, unidades, locatarios

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sistema de Gerenciamento de Aluguéis",
    description="API REST para gerenciar imóveis, unidades e locatários",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(imoveis.router)
app.include_router(unidades.router)
app.include_router(locatarios.router)

@app.get("/")
def root():
    return {
        "message": "API de Gerenciamento de Aluguéis",
        "docs": "/docs",
        "version": "1.0.0"
    }
