# Rafiq-AI 🤖

**Rafiq-AI** est un secrétaire virtuel intelligent conçu pour le **Défi National Nuit de l'Info 2025**. Il répond aux questions des visiteurs en utilisant une base de connaissances dynamique et supporte le dialecte mauritanien (Hassaniya).

## 🚀 Fonctionnalités

- **Chatbot Intelligent** : Répond aux questions en se basant uniquement sur la base de connaissances fournie.
- **Support Hassaniya** : Comprend et traduit les termes courants du dialecte mauritanien (ex: "mata" -> "quand").
- **Base de Connaissances Dynamique** :
    - Interface Admin pour coller/mettre à jour le texte de référence.
    - Persistance des données (sauvegarde automatique dans `knowledge.json`).
- **Interface Premium** : Design moderne "Glassmorphism" avec React et Vanilla CSS.
- **Authentification Admin** : Protection de la zone de mise à jour par mot de passe.

## 🛠️ Stack Technique

- **Backend** : Python, FastAPI, Scikit-learn (TF-IDF pour la recherche sémantique).
- **Frontend** : React, Vite, CSS3 (Variables & Animations).
- **Stockage** : Fichier JSON local (pas de base de données complexe requise).

## 📦 Installation et Lancement

### Prérequis
- Python 3.8+
- Node.js 16+

### 1. Démarrer le Backend

```bash
cd backend
# Créer un environnement virtuel (recommandé)
python -m venv venv
# Activer l'environnement (Windows)
.\venv\Scripts\activate
# Installer les dépendances
pip install -r requirements.txt
# Lancer le serveur
python -m uvicorn main:app --reload
```
Le serveur API sera accessible sur `http://127.0.0.1:8000`.

### 2. Démarrer le Frontend

```bash
cd frontend
# Installer les dépendances
npm install
# Lancer le serveur de développement
npm run dev
```
L'application sera accessible sur `http://localhost:5173`.

## 📖 Guide d'Utilisation

### Pour les Visiteurs
1.  Ouvrez l'application.
2.  Posez votre question dans le chat (en français ou avec des mots Hassaniya).
3.  Rafiq-AI vous répondra en citant ses sources.

### Pour les Administrateurs
1.  Cliquez sur le bouton **"Admin"** en haut à droite.
2.  Entrez le mot de passe : `admin123`.
3.  Dans le panneau de gauche, collez votre texte (présentation, FAQ, règles...).
4.  Cliquez sur **"Update Knowledge"**.
5.  Le chatbot est immédiatement mis à jour !

## 🧪 Vérification

Un script de vérification est disponible pour tester le backend :
```bash
cd backend
python verify_backend.py
```

## 👥 Auteur
Projet réalisé pour la Nuit de l'Info 2025.
