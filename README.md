# MMNVK API

🔗 **[Live Swagger Documentation](https://mnvk-api-node-js.onrender.com/api-docs)**

## Опис проєкту

**MMNVK API** Реєстрація та авторизація учня в навчальній базі закладу.

### Основні функції:

- Реєстрація та Авторизація.
- Верифікація електронної пошти.
- Додавання фотографії user.
- Панель адміністратора (Додавання-видалення професій, лекцій, фотографій)

## Технічні характеристики

- **Основа**: "Node.js",
- **Фреймворк**: "Express.js",
- **База даних**: "MongoDB з Mongoose",
- **Автентифікація**: "JWT та Bcrypt",
- **Хмарне сховище файлів**: "Cloudinary",
- **Сервіс розсилки email**: "Brevo",
- **Валідація**: "Joi",
- **Документація**: "Swagger UI",
- **Інше**: "Docker"

## Як почати роботу

### 1. **Зклонуйте репозиторій:**

```bash
   git clone https://github.com/Dmytro1117/mnvk-api_node.js.git
```

### 2. **Встановіть залежності:**

```bash
   npm install
```

### 3. **Налаштуйте змінні оточення:**

Створіть файл `.env` у кореневій папці та додайте ваші ключі (використовуйте `.env.example` як зразок).

```env
PORT=8080
BASE_URL=your_deployed_frontend_or_localhost
DB_HOST=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
API_KEY_BREVO=your_brevo_key
CLOUDINARY_NAME=name
CLOUDINARY_KEY=key
CLOUDINARY_SECRET=secret
```

### 4. **Запустіть додаток:**

```bash
npm run dev
```

Сервер буде запущено за адресою: http://localhost:8080
