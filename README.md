# Verset du Jour - Application de Tirage de Versets Bibliques

Une application web simple permettant aux utilisateurs de tirer un verset biblique unique par email, avec une interface d'administration pour gérer les versets.

## Fonctionnalités

- **Tirage de versets** : Les utilisateurs entrent leur email pour recevoir un verset biblique personnel
- **Un verset par email** : Chaque adresse email ne peut tirer qu'un seul verset
- **Administration** : Interface pour ajouter, supprimer et gérer les versets
- **Base de données SQLite** : Stockage local des versets et tirages

## Technologies utilisées

- **Backend** : Flask (Python)
- **Frontend** : HTML5, CSS3, JavaScript
- **Base de données** : SQLite
- **Sécurité** : Sessions Flask, hachage des mots de passe

## Installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/junnyjoe/verset_de_l-ann-e.git
   cd verset_de_l-ann-e
   ```

2. **Créer un environnement virtuel** :
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Sur Windows : .venv\Scripts\activate
   ```

3. **Installer les dépendances** :
   ```bash
   pip install -r requirements.txt
   ```

4. **Lancer l'application** :
   ```bash
   python app.py
   ```

5. **Accéder à l'application** :
   - Page utilisateur : http://localhost:5000
   - Page admin : http://localhost:5000/admin
     - Identifiants par défaut : `admin` / `admin123`

## Structure du projet

```
verset_de_l-ann-e/
├── app.py                 # Application Flask principale
├── database.py            # Gestion de la base de données
├── requirements.txt       # Dépendances Python
├── .gitignore            # Fichiers à ignorer
├── templates/            # Templates HTML
│   ├── index.html
│   └── admin.html
└── static/               # Fichiers statiques
    ├── css/
    │   └── style.css
    └── js/
        ├── main.js
        └── admin.js
```

## API Endpoints

### Utilisateur
- `GET /` : Page d'accueil
- `POST /api/draw-verse` : Tirer un verset

### Administration
- `GET /admin` : Page d'administration
- `POST /api/admin/login` : Connexion admin
- `POST /api/admin/logout` : Déconnexion admin
- `GET /api/admin/check` : Vérifier la session
- `GET /api/admin/verses` : Lister les versets
- `POST /api/admin/verses` : Ajouter un verset
- `DELETE /api/admin/verses/<id>` : Supprimer un verset

## Développement

L'application utilise Flask en mode debug, ce qui permet le rechargement automatique lors des modifications.

## Licence

Ce projet est open source. N'hésitez pas à contribuer !