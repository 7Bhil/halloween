# Le Manoir des Ombres &bull; Halloween 2026

Expérience web immersive d'exploration nocturne en **Front-End pur** (Vite + React JSX + Tailwind CSS v3 + Three.js / React Three Fiber + Web Audio API).

Plongez dans le noir complet et explorez le manoir muni de votre seule lampe torche pour découvrir les 5 reliques ancestrales, sonder votre reflet dans le miroir des âmes et sculpter votre citrouille rituelle avant de partager votre offrande.

---

## 1. Principes et Contraintes Architecturales

- **Front-End UNIQUEMENT** : Aucun serveur d'application, aucune base de données distante, aucun appel API externe.
- **Export Statique Pur** : Dossier `dist/` prêt pour un hébergement gratuit instantané sur Vercel, Netlify ou GitHub Pages.
- **Persistance Navigateur** : Toute la progression (reliques trouvées, quiz, configuration de la citrouille et préférences d'accessibilité) est sauvegardée dans le `localStorage`.
- **Partage par URL sécurisé** : Encodage compact en Base64 UTF-8 (`?c=...`) avec assainissement anti-XSS et mode lecture seule pour les visiteurs.
- **Synthèse Sonore Procédurale** : Tous les sons (battements de cœur réactifs à la tension, vents nocturnes, tintements spectraux, portes qui grincent) sont générés en direct par l'API Web Audio native du navigateur (< 5 Ko de code, zéro fichier audio lourd à télécharger).

---

## 2. Démarrage Rapide

### Prérequis
- Node.js >= 18
- npm >= 9

### Commandes
```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement local
npm run dev

# Construction statique de production
npm run build

# Prévisualisation locale du résultat compilé
npm run preview
```

---

## 3. Guide de Personnalisation des Contenus

### Modifier les Reliques Cachées (Acte II)
Ouvrez le fichier [`src/components/sections/Act2Mansion.jsx`](file:///home/bhil/Documents/projet/web/halloween/src/components/sections/Act2Mansion.jsx) et modifiez la constante `RELICS` :
```javascript
{
  id: 'portrait',
  name: 'Le Portrait Ancestral',
  room: 'Le Grand Escalier',
  icon: Eye,
  hint: 'Indice visible avant découverte...',
  lore: 'Texte d archive révélé lors de l inspection...',
}
```

### Modifier les Questions du Miroir (Acte III)
Ouvrez le fichier [`src/components/sections/Act3Mirror.jsx`](file:///home/bhil/Documents/projet/web/halloween/src/components/sections/Act3Mirror.jsx) et personnalisez les questions et profils de monstres dans `QUESTIONS` et `MONSTER_LORE`.

### Personnaliser les Formes de Sculpture de Citrouille (Acte IV)
Ouvrez [`src/components/sections/Act4Pumpkin.jsx`](file:///home/bhil/Documents/projet/web/halloween/src/components/sections/Act4Pumpkin.jsx) et [`src/components/canvas/PumpkinCanvas.jsx`](file:///home/bhil/Documents/projet/web/halloween/src/components/canvas/PumpkinCanvas.jsx). Vous pouvez y ajouter de nouvelles formes d'yeux, nez ou bouches.

---

## 4. Déploiement en Ligne

### Déploiement sur Netlify
1. Connectez votre dépôt GitHub `https://github.com/7Bhil/halloween` à votre tableau de bord Netlify.
2. Configuration de build automatique pré-remplie par [`netlify.toml`](file:///home/bhil/Documents/projet/web/halloween/netlify.toml) :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
3. Le fichier [`public/_redirects`](file:///home/bhil/Documents/projet/web/halloween/public/_redirects) assure la redirection transparente des routes SPA.

### Déploiement sur Vercel
1. Importez le dépôt dans l'interface Vercel.
2. La configuration est gérée automatiquement par [`vercel.json`](file:///home/bhil/Documents/projet/web/halloween/vercel.json).
3. Le dossier de sortie est défini sur `dist`.

---

## 5. Bilan des 8 Étapes Réalisées

- [x] **Étape 1** : Setup du projet, tokens visuels gothiques (noir `#07060a`, abysse `#1b1030`, crème fantôme `#e9e4d0`, orange citrouille `#ff6a1a`), polices Cormorant Garamond et Inter, structure des 4 actes, lampe torche dynamique et scroll fluide Lenis + GSAP.
- [x] **Étape 2** : Scène 3D WebGL (Three.js / React Three Fiber), architecture gothique (colonnes octogonales, dalles de pierre, grimoire, horloge, miroir, autel), brume volumétrique, shader de torche GLSL avec vignetage et grain.
- [x] **Étape 3** : Acte 2 interactif avec 5 reliques à inspecter, suivi du regard du portrait sur le curseur, fiches de lore, compteur discret de progression et moteur sonore procédural Web Audio API.
- [x] **Étape 4** : Acte 4 avec sculpteur de citrouille en Canvas 2D haute définition (variantes d'yeux, nez, bouches, flamme vacillante en temps réel), serment de 40 caractères et persistance `localStorage`.
- [x] **Étape 5** : Système de partage par URL sécurisé `?c=...` (encodage UTF-8 Base64, assainissement strict anti-XSS, mode visiteur en lecture seule) et exportateur de carte PNG 1080x1920 (format Story) généré 100% côté client.
- [x] **Étape 6** : Acte 3 avec quiz de 5 questions d'ambiance, calcul local de l'affinité du monstre (fantôme, vampire, sorcière, loup-garou, momie) et apparition spectrale dans le miroir.
- [x] **Étape 7** : Version dégradée 2D (CSS pure + Canvas) pour appareils faibles ou `prefers-reduced-motion`, jump scare subtil et non agressif (jamais avant 10s, désactivable à tout moment avec sauvegarde des préférences).
- [x] **Étape 8** : Configurations de déploiement statique (`netlify.toml`, `vercel.json`, `public/_redirects`), vérification du build de production et documentation finale.
