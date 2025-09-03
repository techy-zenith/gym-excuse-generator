# 🏋️ Gym Excuse Generator

A fun web app that generates random elaborate excuses for skipping the gym.  
Built with **React (frontend)** + **Django (backend)** + (future) **Gemini AI**.

---

## 🚀 Features
- Generate excuses by category:
  - 🧪 Scientific & nerdy
  - 😭 Emotional drama
  - 🕵️ Conspiracy theories
- Add your own custom twist to the excuse
- Random excuse button
- Clean React frontend with Django backend API

---

## 🛠️ Tech Stack
- **Frontend:** React + Vite
- **Backend:** Django + Django REST Framework
- **AI (planned):** Google Gemini API
- **Styling:** CSS / Tailwind 

---

## 📂 Project Structure
📦 gym-excuse-generator<br>
┣ 📂 frontend *# React frontend*<br>
┣ 📂 backend *# Django backend*<br>
┣ 📜 README.md *# Project info*

---

## ⚙️ Setup Instructions

### 1. Backend (Django)
<h6>cd gym_excuse_backend<br>python -m venv venv<br>venv\Scripts\activate    # On Windows<br>pip install -r requirements.txt<br>python manage.py migrate<br>python manage.py runserver</h6>

### 2. Frontend (React)
<h6>cd gym-excuse-frontend<br>npm install<br>npm run dev</h6>

---

## ✅ Example API Call
### Endpoint:
GET http://127.0.0.1:8000/api/excuse/?category=conspiracy&theory=leg%20injury

### Response:
{"excuse": "The government's been experimenting with new fitness technologies, subtly altering gravity to make exercise impossibly strenuous! My leg injury? Collateral damage from a rogue elliptical machine, obviously.  They'll deny it, but I saw a man in a trench coat near the treadmills..."}

---

## 📌 To-Do
- Excuse Streak Tracker: Shows how many consecutive days you’ve “avoided” gym.
- Track Recorder: Add a history of generated excuses
- Voice Excuse Mode: Text-to-speech reads the excuse in a dramatic movie trailer voice.
