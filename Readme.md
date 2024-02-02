# Портфолио и личный сайт

# Переменные окружения для сервера

- NODE_ENV = development/production
- PORT = 7001

## БД

- DATABASE_URL = postgresql://[user]:[password]@[address]:[port]/[database]?schema = [public]

## JWT токены доступа

- JWT_ACCESS_SECRET = some secret text
- JWT_REFRESH_SECRET = some secret text

## Почтовый клиент

- SMTP_HOST = smtp.mail.ru
- SMTP_PORT = 587
- SMTP_USER = [email@mail.ru]
- SMTP_PASSWORD = [password]
- API_URL = http://[address]:[PORT]
- CLIENT_URL = http://[address]:[CLIENT_PORT]

# Переменные окружения для клиента

- VITE_API_URL = http://[address]:[PORT]/api
- VITE_API_STATIC_URL = http://[address]:[PORT]/
