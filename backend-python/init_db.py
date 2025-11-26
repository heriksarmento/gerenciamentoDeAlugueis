from database import SessionLocal, engine
import models
from auth import get_password_hash

# Criar tabelas
models.Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Verificar se já existem usuários
usuarios_existentes = db.query(models.Usuario).count()
if usuarios_existentes > 0:
    print("Banco de dados já inicializado!")
    db.close()
    exit()

# Criar usuários de teste
usuario1 = models.Usuario(
    nome="Usuário 1",
    email="usuario1@email.com",
    senha_hash=get_password_hash("usuario1")
)

usuario2 = models.Usuario(
    nome="Usuário 2",
    email="usuario2@email.com",
    senha_hash=get_password_hash("usuario2")
)

db.add(usuario1)
db.add(usuario2)
db.commit()

print("✅ Banco de dados inicializado com sucesso!")
print("\n👤 Usuários de teste criados:")
print("   - usuario1@email.com / usuario1")
print("   - usuario2@email.com / usuario2")

db.close()
