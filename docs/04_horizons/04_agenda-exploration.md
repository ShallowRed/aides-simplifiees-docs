# Agenda d'exploration

Pour concrétiser les horizons explorés dans cette section, plusieurs chantiers d'expérimentation doivent être ouverts. Ce document synthétise les pistes de travail identifiées pour lever les verrous techniques, juridiques et de design.

## 1. La standardisation des preuves (fixtures)
Si nous voulons mutualiser les règles, nous devons mutualiser leur validation.
*   **Question d'exploration** : Comment décrire une situation usager complexe (historique, foyer) dans un format JSON/YAML agnostique du moteur de calcul ?

## 2. La dette de représentation
Le fossé se creuse souvent entre ce que le système fait réellement (le code) et ce que l'organisation croit qu'il fait (la documentation, les schémas).
*   **Question d'exploration** : Comment créer des représentations "compilables" (diagrammes, graphes) qui soient directement générées depuis le code des règles, garantissant un alignement parfait entre la documentation et l'exécution ?

## 3. Le design de la traduction
Traduire le droit en code n'est pas une simple transcription, c'est un acte de design qui implique des choix d'interprétation. Comme le souligne Mireille Hildebrandt ("Law for Computer Scientists"), il existe une friction irréductible entre l'ambiguïté féconde du droit et la rigidité binaire du code.
*   **Question d'exploration** : Quels artefacts (registres d'interprétation, glossaires partagés) permettent de documenter explicitement les arbitrages faits lors de la modélisation ?

## 4. L'IA comme "colle" documentaire
Plutôt que de générer du code, l'IA pourrait servir à maintenir la cohérence entre des objets hétérogènes.
*   **Question d'exploration** : Comment utiliser les LLM pour orchestrer la continuité entre le texte légal, les règles techniques et les cas de tests, en signalant automatiquement les divergences ?

## 5. L'humain dans la boucle IA
L'usage de l'IA pour l'extraction de règles (comme dans le projet *Tous à bord*) est prometteur mais risqué. Il faut formaliser les protocoles de collaboration Homme-Machine.
*   **Question d'exploration** : Quelle interface permet à un expert métier de valider efficacement une suggestion probabiliste d'un LLM sans tomber dans le biais d'automatisation ?

## 6. La performance embarquée (Wallet)
Le scénario du "Wallet" impose des contraintes techniques fortes.
*   **Question d'exploration** : Comment faire tourner un moteur de calcul socio-fiscal complet dans un environnement contraint (mobile), sans latence et sans connexion ?

## 7. Les méthodologies de co-conception
Au-delà des outils, c'est le processus de production de la loi qui doit évoluer.
*   **Inspiration** : L'approche **"Better Rules"** (Nouvelle-Zélande) qui réunit juristes, développeurs et designers *avant* la rédaction de la loi, ou la méthode **Calculemus** (Pays-Bas) qui structure l'analyse normative.
*   **Question d'exploration** : Comment adapter ces méthodologies anglo-saxonnes à la culture administrative et juridique française (Légistique) ?
