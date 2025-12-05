# Guide de Déploiement Gratuit

Voici comment déployer **Rafiq-AI** gratuitement en utilisant **Render** (pour le Backend) et **Vercel** (pour le Frontend).

## 1. Préparation (Déjà fait)
Le code a été mis à jour pour lire l'URL de l'API depuis les variables d'environnement. Assurez-vous d'avoir poussé vos dernières modifications sur GitHub :
```bash
git add .
git commit -m "Prepare for deployment"
git push
```

## 2. Déployer le Backend (sur Render)
Render offre un hébergement gratuit pour les services Web Python.

1.  Créez un compte sur [render.com](https://render.com).
2.  Cliquez sur **"New +"** -> **"Web Service"**.
3.  Connectez votre compte GitHub et sélectionnez le repo `Rafiq-AI`.
4.  Configurez les paramètres suivants :
    *   **Name**: `rafiq-ai-backend` (ou autre)
    *   **Root Directory**: `backend` (Important !)
    *   **Runtime**: `Python 3`
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
    *   **Instance Type**: `Free`
5.  Cliquez sur **"Create Web Service"**.
6.  Attendez que le déploiement soit terminé. Render vous donnera une URL (ex: `https://rafiq-ai-backend.onrender.com`). **Copiez cette URL**.

> **Note** : Sur l'offre gratuite de Render, le serveur se met en veille après 15 min d'inactivité. Le premier chargement peut prendre 50 secondes.
> **Attention** : Le système de fichiers est éphémère. Si le serveur redémarre, le fichier `knowledge.json` sera réinitialisé à son état d'origine (vide ou celui du repo). Pour une vraie persistance, il faudrait une base de données (Render propose aussi PostgreSQL gratuit pour 90 jours).

## 3. Déployer le Frontend (sur Vercel)
Vercel est optimisé pour React/Vite.

1.  Créez un compte sur [vercel.com](https://vercel.com).
2.  Cliquez sur **"Add New..."** -> **"Project"**.
3.  Importez le repo `Rafiq-AI` depuis GitHub.
4.  Configurez le projet :
    *   **Framework Preset**: `Vite` (devrait être détecté auto).
    *   **Root Directory**: Cliquez sur "Edit" et sélectionnez le dossier `frontend`.
    *   **Environment Variables** :
        *   Nom : `VITE_API_URL`
        *   Valeur : L'URL de votre backend Render (ex: `https://rafiq-ai-backend.onrender.com`) **sans le slash à la fin**.
5.  Cliquez sur **"Deploy"**.

## 4. C'est en ligne !
Vercel vous donnera une URL (ex: `https://rafiq-ai.vercel.app`). Vous pouvez la partager avec tout le monde.
