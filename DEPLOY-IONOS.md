# Déploiement IONOS — kyrio.fr

## Déjà fait dans le projet (rien à refaire côté code)

- **public/.htaccess** : règles Apache pour que /demos et les autres routes React fonctionnent.
- **public/robots.txt** : indexation de base.
- **index.html** : titre, meta description, canonical https://kyrio.fr/
- **Script** : `npm run build:ionos` génère `dist/` + `kyrio-dist-ionos.zip` à la racine du dossier du projet.
- Scripts de dev déplacés hors de `public/` pour ne pas être publiés par erreur.

## Secrets GitHub (déploiement automatique)

Sur **https://github.com/kyriostudio/README** → *Settings → Secrets and variables → Actions* :

| Secret | Valeur attendue |
|--------|-----------------|
| `IONOS_SFTP_HOST` | `access-5020224280.webspace-host.com` |
| `IONOS_SFTP_USERNAME` | `su247348` (ancien compte `su359443` → ne plus utiliser) |
| `IONOS_SFTP_PASSWORD` | Mot de passe SFTP IONOS, **sans** retour à la ligne en trop lors du collage |

Si le workflow échoue sur « Test connexion SFTP », rouvrez le secret mot de passe : recopiez-le depuis la fiche IONOS et enregistrez à nouveau.

**Note :** sur un compte IONOS souvent réservé au SFTP, `ssh user@host` peut afficher `PTY allocation request failed` / `shell request failed` **après** le mot de passe — c’est attendu. Testez plutôt avec un client SFTP (FileZilla, WinSCP) ou le workflow GitHub.

## À faire par vous (IONOS + upload)

### Étape 1 — Domaine
Dans IONOS : associer **kyrio.fr** (et éventuellement **www.kyrio.fr**) à votre hébergement web. Suivre l’assistant DNS / domaine.

### Étape 2 — SSL
Activer le certificat **HTTPS** (Let’s Encrypt ou équivalent) pour kyrio.fr.

### Étape 3 — Build + archive (sur votre PC)
Dans le dossier du projet :
```
cd crm-web-demos
npm install
npm run build:ionos
```
Vous obtenez **`kyrio-dist-ionos.zip`** dans le dossier `crm-web-demos` (même niveau que `package.json`). Décompressez-le : vous retrouvez le même contenu que `dist/`.

### Étape 4 — Upload
- Ouvrir le **gestionnaire de fichiers** ou **FTP** IONOS.
- Aller au dossier racine du site (**httpdocs**, **htdocs** ou nom indiqué par IONOS).
- **Vider** l’ancien contenu si besoin, puis uploader **tout le contenu** décompressé (équivalent au dossier `dist/`) : à la racine du site doivent apparaître `index.html`, le dossier `assets/`, `.htaccess`, `clients.json`, etc.

### Étape 5 — Vérifier
- https://kyrio.fr/
- https://kyrio.fr/demos
- Recharger la page sur /demos (doit rester OK grâce au .htaccess)

### Étape 6 — EmailJS (formulaire contact)
Si le formulaire ne part plus : dans le tableau de bord EmailJS, autoriser le domaine **kyrio.fr** si une restriction existe.

---
*Généré pour le déploiement Kyrio — IONOS*
