# Le Manoir des Ombres &bull; Halloween 2026

Experience web immersive d'exploration nocturne en front-end pur (Vite + React + Tailwind CSS v3).

Plongez dans le noir complet et explorez le manoir muni de votre seule lampe torche pour decouvrir les reliques, affronter le miroir et sculpter votre citrouille.

---

## 1. Demarrage Rapide

### Prerequis
- Node.js >= 18
- npm >= 9

### Commandes
```bash
# Installation des dependances
npm install

# Serveur de developpement local
npm run dev

# Construction de production
npm run build

# Previsualisation locale du build
npm run preview
```

---

## 2. Architecture du Projet

```text
halloween/
├── netlify.toml            # Deploiement continu Netlify (command & publish dist)
├── vercel.json             # Configuration Vercel
├── public/
│   ├── _redirects          # Routage SPA Netlify
│   └── vite.svg            # Favicon
├── src/
│   ├── components/
│   │   ├── common/         # Lampe torche, indicateur d'acte, son
│   │   │   ├── ActIndicator.jsx  # Progression Acte 1 a 4
│   │   │   ├── SoundToggle.jsx   # Controle du son
│   │   │   └── TorchCursor.jsx   # Masque interactif du cone de lumiere
│   │   └── sections/       # Les 4 actes immersifs
│   │       ├── Act1Gate.jsx      # Acte 1 : Le Portail & la bougie solitaire
│   │       ├── Act2Mansion.jsx   # Acte 2 : Le Hall, la bibliotheque & les 5 reliques
│   │       ├── Act3Mirror.jsx    # Acte 3 : Le Miroir des ames & quiz
│   │       └── Act4Pumpkin.jsx   # Acte 4 : La Citrouille obscure & partage
│   ├── hooks/
│   │   └── useLenisScroll.js     # Scroll fluide Lenis synchronise avec GSAP
│   ├── App.jsx             # Orchestration du parcours
│   ├── index.css           # Directives Tailwind v3 et ambiance nocturne
│   └── main.jsx            # Point d'entree React
├── tailwind.config.js      # Palette Halloween (manoir, abysse, fantome, citrouille)
└── vite.config.js          # Configuration Vite
```

---

## 3. Feuille de Route par Etapes

- [x] **Etape 1** : Setup du projet, tokens visuels (noir `#07060a`, abysse `#1b1030`, creme fantome `#e9e4d0`, orange citrouille `#ff6a1a`), typographies (Cormorant Garamond & Inter), structure des 4 actes, masque de lampe torche interactif, Lenis + GSAP ScrollTrigger.
- [ ] **Etape 2** : Scene 3D de base + shader de lampe torche + brume volumetrique + vignette.
- [ ] **Etape 3** : Acte 2 (pieces, 5 objets interactifs, compteur d'exploration, effets sonores).
- [ ] **Etape 4** : Acte 4 (sculpteur de citrouille canvas 2D, bougie vacillante, persistance localStorage).
- [ ] **Etape 5** : Partage par URL securise (`?c=...`) et export PNG de la carte 1080x1920.
- [ ] **Etape 6** : Acte 3 (quiz des ames et revelation du monstre dans le miroir).
- [ ] **Etape 7** : Version degradee 2D, optimisation des assets, jump scare subtil et securise, tests.
- [ ] **Etape 8** : Deploiement statique et revue finale.
