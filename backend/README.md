# Backend

### `npm run build:ui`

Dá build na versão de produção da interface do React e copia a pasta para o backend

### `npm run deploy`

Dá deploy no Heroku

# API

## Pacientes

| URL         | Método | Funcionalidade                          |
|-------------|--------|-----------------------------------------|
| patients    | GET    | pega todos os recursos                  |
| patients/10 | GET    | pega um único recurso                   |
| patients    | POST   | cria um novo recurso                    |
| patients/10 | DELETE | remove um recurso                       |
| patients/10 | PUT    | troca o recurso com os dados de request |
