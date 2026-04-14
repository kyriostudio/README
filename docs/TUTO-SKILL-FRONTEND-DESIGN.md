# Tutoriel — skill « frontend-design » dans ce projet

Ce dépôt contient le skill Cursor dans **`.cursor/skills/frontend-design/SKILL.md`**, plus une règle **`.cursor/rules/frontend-design.mdc`** qui l’applique aux fichiers `src/**/*.jsx`.

## Ce que ça change (et ce que ça ne change pas)

| Effet | Détail |
|--------|--------|
| **Build / site en ligne** | Aucun. Vite ne lit pas `.cursor/`. Le déploiement IONOS envoie surtout le contenu de `dist/` après `npm run build`. |
| **Cursor (toi + l’IA)** | L’assistant peut suivre les principes du skill : direction visuelle forte, typo/couleurs soignées, motion, etc. |

## Trois façons de l’utiliser

### 1. Automatique (règle projet)

Quand tu modifies un fichier sous `src/` (ex. `CarentanVitrine.jsx`), Cursor peut attacher la règle **frontend-design** selon les **globs** du fichier `.mdc`. Tu n’as rien à taper : l’IA a le contexte « design soigné, pas générique ».

### 2. Mention explicite `@`

Dans le chat Cursor, tape :

```text
@.cursor/skills/frontend-design/SKILL.md
```

Puis ta demande, par exemple :

```text
Refais le hero de Carentan avec une direction éditoriale institutionnelle (sans look startup).
```

Ça **force** le chargement du fichier skill dans le contexte.

### 3. Phrase déclencheuse

Sans `@`, tu peux écrire clairement :

```text
Applique le skill frontend-design pour la section Contact de Carentan :
fonds avec texture légère, titre en serif, une animation d’entrée au scroll.
```

L’assistant peut aller lire le skill s’il est pertinent (règle + consigne).

## Exemples de prompts (copier-coller)

**Maquette mairie — ton institutionnel**

```text
@.cursor/skills/frontend-design/SKILL.md
Sur CarentanVitrine.jsx : palette vert pierre + bleu ardoise, typo display distinctive + corps lisible,
hero avec dégradé discret et grain, pas de violet néon. Accessibilité : contrastes AA sur le texte.
```

**Composant précis**

```text
@.cursor/skills/frontend-design/SKILL.md
Ajoute une grille d’actualités 3 cartes : hover avec élévation légère, image ratio 16/9,
stagger animation-delay au chargement (CSS uniquement).
```

**Itération**

```text
La section Démarches est trop plate. Skill frontend-design : asymétrie légère,
fond pas 100 % blanc, une couleur d’accent pour les liens.
```

## Fichiers utiles

- Skill : `.cursor/skills/frontend-design/SKILL.md`
- Règle Cursor : `.cursor/rules/frontend-design.mdc`
- Maquette client : `src/CarentanVitrine.jsx`

## Si le skill ne semble pas pris en compte

1. Recharge la fenêtre Cursor (`Ctrl+Shift+P` → *Developer: Reload Window*).
2. Vérifie que le workspace ouvert est bien la racine **`crm-web-demos`**.
3. Utilise **`@.cursor/skills/frontend-design/SKILL.md`** dans le message pour forcer le contexte.
