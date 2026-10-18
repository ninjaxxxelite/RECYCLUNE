# Site de Recyclune

Site vitrine de **Recyclune**, ressourcerie associative à Lunéville (6 rue du Coq, 54300 Lunéville).

Site statique en HTML, CSS et JavaScript, sans dépendance ni étape de compilation.

## Pages

| Fichier | Page |
|---|---|
| `index.html` | Accueil, activités, chiffres clés, infos pratiques, agenda |
| `association.html` | Projet, histoire, témoignages, partenaires |
| `activites.html` | Détail des activités et liste des dons acceptés (vêtements refusés) |
| `actualite.html` | Agenda filtrable |

## Arborescence

```
├── index.html
├── association.html
├── activites.html
├── actualite.html
├── css/
│   └── style.css         Styles du site (couleurs de la charte en variables CSS)
├── js/
│   ├── alphabet.js       Liste des lettres découpées disponibles
│   └── main.js           Lettres découpées, formes aléatoires, menu mobile, filtres
└── images/
    ├── logo-recyclune.png
    ├── illustration.webp
    ├── favicon.png
    ├── apple-touch-icon.png
    └── alphabet/         90 lettres découpées (3 variantes par lettre, avec À È É Ê)
```

## Mettre en ligne avec GitHub Pages

1. Pousser ce dossier sur un dépôt GitHub.
2. Dans le dépôt : **Settings → Pages**.
3. Source : **Deploy from a branch**, branche `main`, dossier `/ (root)`.
4. Le site est publié après quelques minutes à l’adresse indiquée par GitHub.

Pour utiliser le nom de domaine `www.recyclune.fr`, renseigner le domaine dans **Settings → Pages → Custom domain** puis configurer le DNS chez l’hébergeur du domaine.

## Tester en local

Ouvrir `index.html` dans un navigateur suffit. Pour un rendu identique à la mise en ligne :

```
python3 -m http.server 8000
```

puis aller sur http://localhost:8000.

## Charte graphique

- Couleurs : `#fff2dd` (crème), `#6d311d` (brun), `#7fcecd` (turquoise), `#f89a57` (orange), définies dans `:root` de `css/style.css`.
- Police : Roboto (Google Fonts, licence Apache 2.0), Roboto Black italique pour les titres.
- Titres en lettres découpées : ajouter l’attribut `data-cut="Mon titre"` à un élément, `js/main.js` compose le mot avec les images de `images/alphabet/`. Les caractères absents de l’alphabet (apostrophe, trait d’union, chiffres) s’affichent en Roboto.

## Reste à faire

- Remplacer les emplacements photo et le plan d’accès par de vraies images et une carte.
- Remplacer les pictogrammes simplifiés par ceux de la charte.
- Compléter les dates entre crochets (agenda, frise historique).
- Ajouter les logos des partenaires.
- Ajouter les liens des réseaux sociaux et créer les pages Mentions légales et Confidentialité.
- Publier de vrais témoignages uniquement avec l’accord de leurs auteurs.
