# Design System Strategy: Patrick ASSO Couture

## 1. Overview & Creative North Star: \"The Sovereign Monolith\"
Ce système de design est conçu pour refléter la précision de la haute couture africaine—où chaque point est intentionnel et chaque silhouette est une déclaration de puissance. Nous nous éloignons de l'interface de type \"application\" pour nous diriger vers un **Monolithe Éditorial Numérique**.

L'Étoile du Nord Créative est **Le Monolithe Souverain**. L'esthétique rejette la douceur \"amicale\" du design web moderne (angles arrondis, ombres douces) au profit d'angles vifs à 90 degrés et de blocs tonaux à fort contraste. Nous atteignons le luxe grâce à une **asymétrie intentionnelle** et au **rythme de l'espace négatif**. En traitant l'écran comme une toile pour un magazine de mode haut de gamme (Vogue/Harper's Bazaar), nous laissons la photographie respirer tandis que l'interface agit comme un cadre rigide et sophistiqué.

## 2. Couleurs & Profondeur Chromatique
La palette est enracinée dans la relation entre le \"Minuit\" (`surface`) et l' \"Argent\" (`secondary_fixed/on_surface`), ponctuée par l' \"Or\" (`primary_container`) de l'atelier de Patrick ASSO.

### La Règle du \"Pas de Ligne\"
Les bordures standard de 1px sont strictement interdites dans ce système de design. Elles sont la marque des modèles génériques. Pour définir les sections, vous devez utiliser :
- **Blocs de Couleurs :** Transition de `surface` (#131313) à `surface_container_low` pour marquer le début d'une nouvelle zone de contenu.
- **Espace Négatif (Blackspace) :** Utilisation des niveaux supérieurs de notre échelle d'espacement pour créer un \"vide\" physique qui signale une transition.

### La Palette (Material Design Tokens)
- **Fond/Surface :** `#131313` (Midnight)
- **Primaire (Or) :** `#f2ca50` (Utilisé pour les actions critiques et les points forts)
- **Secondaire (Argent) :** `#e2e2e2` (Lecture et textes secondaires)
- **Tiers de Surface :** de `surface_container_lowest` (#0e0e0e) à `surface_container_highest` (#353534).

## 3. Typographie : Le Dialogue Éditorial
La typographie est traitée comme un élément structurel, pas seulement pour la lisibilité.

*   **Titres & Affichage (Newsreader) :** Ce serif représente l'héritage et l'aspect \"Couture\" de la marque. Utilisez `display-lg` pour les titres de héros, souvent avec un chevauchement intentionnel sur l'imagerie.
*   **Corps & UI (Manrope) :** Ce sans-serif représente l'aspect \"Avant-Garde\" et la précision technique.
*   **Contraste de Puissance :** Associez un grand titre display (Newsreader) avec un très petit label tout en majuscules (Manrope avec un espacement de lettres de +10%) pour un effet de linotypie de luxe.

## 4. Géométrie & Physique de l'Interface
- **Angles :** **0px radius (Angles vifs)**. Toujours. Sans exception.
- **Élévation :** Uniquement par superposition tonale. Pas d'ombres portées génériques.
- **Glassmorphism :** Les menus de navigation utilisent `surface` à 70% d'opacité avec un flou d'arrière-plan de 20px.
- **Champs de saisie :** Soulignement minimaliste uniquement (Or #f2ca50). Pas de cadres.

## 5. Composants
- **Boutons :** Rectangulaires, angles vifs, gradient métallique Or subtil ou fond plein Or.
- **Grilles :** Layouts asymétriques où les images ne sont pas alignées de manière prévisible.

## 6. À Faire et À Éviter
### À Faire
- Utiliser le logo blanc en filigrane (opacité 5%) en arrière-plan.
- Laisser des marges massives (\"Blackspace\").
- Faire chevaucher les textes Newsreader sur les silhouettes.
### À Éviter
- Utiliser le radius (même 1px).
- Utiliser le bleu standard pour les liens (Privilégier l'Or ou l'Argent).
- Surcharger l'écran. Si une section semble encombrée, augmentez l'espacement.

---
*Ce document est la référence officielle pour toutes les générations assistées par IA du projet Patrick ASSO Couture.*
