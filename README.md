# 🛋️ FORMA — Frontend

React + Tailwind CSS фронтенд для системи рекомендацій меблів з AR.

---

## 📋 Вимоги

- Node.js **18+**
- npm або yarn

---

## 🚀 Запуск

### 1. Розпакуй та перейди у папку

```bash
cd frontend
```

### 2. Встанови залежності

```bash
npm install
```

### 3. Налаштуй змінні середовища

```bash
cp .env.example .env
```

Вміст `.env`:
```env
VITE_API_URL=http://localhost:8000
```

> Якщо бекенд на іншому порту — зміни значення.

### 4. Запусти dev-сервер

```bash
npm run dev
```

Відкрий: **http://localhost:5173**

---

## 📦 Build для продакшну

```bash
npm run build
# Файли з'являться у папці dist/
npm run preview  # Локальний перегляд білда
```

---

## 🗂️ Структура сторінок

| Маршрут | Сторінка | Опис |
|---------|----------|------|
| `/` | LandingPage | Головна, опис сервісу |
| `/auth` | AuthPage | Логін / Реєстрація |
| `/upload` | UploadPage | 🔒 Завантаження фото |
| `/recommendations` | RecommendationsPage | 🔒 Результати + товари |
| `/cabinet` | CabinetPage | 🔒 Кабінет користувача |

> 🔒 — потрібна авторизація

---

## 📦 Бібліотеки

| Бібліотека | Для чого |
|------------|----------|
| `react-router-dom` | Клієнтський роутинг |
| `axios` | HTTP-запити до бекенду |
| `zustand` | Глобальний стан (auth, аналіз) |
| `framer-motion` | Анімації та переходи |
| `react-dropzone` | Drag-and-drop завантаження фото |
| `react-hot-toast` | Сповіщення |
| `tailwindcss` | Утилітарний CSS |

---

## 🔌 AR — як це працює

У `index.html` підключено Google Model Viewer:
```html
<script type="module" src="https://ajax.googleapis.com/.../model-viewer.min.js"></script>
```

Компонент `ModelViewer.jsx` рендерить `<model-viewer>` з `.glb` для веб та `.usdz` для iOS Quick Look.

На **iPhone**: натискання «AR» відкриває нативний Quick Look без будь-яких додатків.

---

## ⚙️ Проксі до бекенду (dev)

У `vite.config.js` налаштований проксі:
```
/api/* → http://localhost:8000/*
```
Можна робити запити як на `/api/analyze` замість повного URL.
