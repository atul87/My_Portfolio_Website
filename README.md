# ATUL - Portfolio Website 🚀

A **cutting-edge 3D portfolio** with stunning animations, interactive features, and a secure backend. Built with Flask and Vanilla JS.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Flask](https://img.shields.io/badge/Flask-3.0+-green)
![Security](https://img.shields.io/badge/Security-Hardened-red)

## 🌟 Key Features

### 🎨 Frontend

- **10 Stunning Background Effects** (Aurora, Particles, Matrix, etc.)
- **Interactive Command Palette** (Ctrl+K)
- **Voice Commands** & 3D Tilt Effects
- **Glassmorphism Design**

### 🛡️ Backend (Secured)

- **Rate Limiting**: Contact form protected (5 req/min)
- **Input Sanitization**: XSS protection with `bleach`
- **Security Headers**: HSTS, X-Frame-Options, X-Content-Type-Options
- **Async Email**: Non-blocking email delivery

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/atul87/My_Portfolio_Website.git
cd My_Portfolio_Website

# Install dependencies
pip install -r requirements.txt
```

### Running Locally

```bash
# Start the server (Windows)
python app.py
```

Visit `http://localhost:5000` in your browser.

## 📁 Project Structure

```
atul-portfolio/
├── app.py                 # Secured Flask application
├── requirements.txt       # Dependencies (incl. Flask-Limiter, Bleach)
├── static/
│   ├── style.css         # Modern CSS3 variables & animations
│   └── app.js            # Vanilla JS logic (45+ features)
├── templates/
│   └── index.html        # Main single-page application
└── deploy.bat            # Deployment script
```

## 🚢 Deployment

1. **GitHub Pages** (Static content only):
   - Go to Repo Settings > Pages > Source: `main` branch.
   - URL: `https://atul87.github.io/My_Portfolio_Website/`

2. **Heroku/Render** (Full Backend):
   - Connect repository to Heroku/Render.
   - Set environment variables (`SENDER_EMAIL`, `SENDER_PASSWORD`).

## 👤 Author

**Atul Varma**

- GitHub: [@atul87](https://github.com/atul87)
- LinkedIn: [Atul Varma](https://www.linkedin.com/in/atul-varma-102b5b2a9)
