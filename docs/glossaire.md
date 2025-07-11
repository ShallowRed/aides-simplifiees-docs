# Glossaire

Ce glossaire définit les termes techniques et méthodologiques utilisés dans la documentation d'Aides simplifiées.

## A

### Aide publique
Dispositif financier mis en place par une collectivité publique (État, région, département, commune) pour soutenir certains publics ou activités selon des critères définis.

### Algorithme
Ensemble de règles et d'instructions logiques permettant de résoudre un problème ou d'effectuer un calcul de manière automatisée.

### API (Application Programming Interface)
Interface permettant à différents logiciels de communiquer entre eux. Dans notre contexte, permet d'intégrer les calculs d'éligibilité dans d'autres services.

## B

### Barème
Grille de valeurs (montants, seuils, taux) utilisée pour calculer une aide selon différents critères (revenus, situation familiale, etc.).

## C

### Calcul
Opération mathématique permettant de déterminer le montant d'une aide à partir des données de situation d'un demandeur.

### Critères d'éligibilité
Conditions à remplir pour pouvoir bénéficier d'une aide publique (âge, revenus, situation familiale, etc.).

## D

### Dispositif (réglementaire)
Ensemble cohérent de règles juridiques visant à réguler une situation particulière ou produire un effet juridique précis. Exemple : l'aide personnalisée au logement.

### DMN (Decision Model and Notation)
Standard de modélisation des règles métier permettant de représenter la logique de décision de manière visuelle et exécutable.

## E

### Éligibilité
Fait de remplir les conditions requises pour bénéficier d'une aide ou d'un service public.

## L

### Liquidateur
Système informatique utilisé par une administration pour calculer et attribuer automatiquement des prestations. Se distingue d'un simulateur par son caractère opérationnel.

## M

### Modèle (de règles)
Représentation formalisée et structurée des règles d'attribution d'une aide, permettant leur implémentation informatique.

### Moteur de règles
Logiciel spécialisé dans l'exécution de règles métier formalisées. Exemples : OpenFisca, Publicodes.

## P

### Personal Regulation Assistant (PRA)
Concept d'assistant numérique personnel capable d'analyser la situation d'un individu au regard de multiples réglementations pour l'informer de ses droits et obligations.

### Publicodes
Moteur de règles open source développé par beta.gouv.fr, privilégiant la lisibilité et la facilité de contribution par des non-techniques.

## R

### Règle (réglementaire)
Portion d'un texte réglementaire identifiable comme une instruction précise émise par les législateurs. Exemple : "condition d'âge pour l'éligibilité à l'APL en location".

### Rules as Code
Approche consistant à traduire directement les règles juridiques en code informatique, permettant leur application automatisée tout en maintenant la traçabilité vers les sources légales.

## S

### Simulateur
Outil permettant à un utilisateur d'estimer son éligibilité et le montant potentiel d'une ou plusieurs aides publiques, à partir de la description de sa situation.

## T

### Texte réglementaire
Document juridique officiel (loi, décret, arrêté, circulaire) définissant les règles d'attribution et de calcul d'une aide publique.

## V

### Variable
Élément d'information nécessaire au calcul d'une aide (âge, revenus, type de logement, etc.). Peut être :
- **Variable d'entrée** : saisie par l'utilisateur
- **Variable calculée** : résultat d'un calcul intermédiaire  
- **Variable de référence** : valeur de barème officiel

## Acronymes courants

| Acronyme | Signification | Description |
|----------|---------------|-------------|
| **APL** | Aide Personnalisée au Logement | Aide au logement calculée selon les revenus et le loyer |
| **CAF** | Caisse d'Allocations Familiales | Organisme versant de nombreuses aides sociales |
| **RSA** | Revenu de Solidarité Active | Aide garantissant un revenu minimum |
| **UX** | User Experience | Expérience utilisateur, qualité d'usage d'un service |
| **API** | Application Programming Interface | Interface de programmation permettant l'interopérabilité |
| **CI/CD** | Continuous Integration/Continuous Deployment | Pratiques d'automatisation du développement |

## Ressources complémentaires

### Documentation technique
- [OpenFisca](https://openfisca.org/) : Moteur de règles pour la fiscalité et les prestations sociales
- [Publicodes](https://publi.codes/) : Moteur de règles orienté contribution collaborative

### Références juridiques
- [Légifrance](https://www.legifrance.gouv.fr/) : Service public de diffusion du droit français
- [Service-public.fr](https://www.service-public.fr/) : Information officielle sur les droits et démarches

### Méthodologie
- [Guide des algorithmes publics](https://guides.etalab.gouv.fr/algorithmes/) : Bonnes pratiques pour l'administration
- [Règles as Code](https://oecd-opsi.org/wp-content/uploads/2020/08/OECD-OPSI-Primer-Rules-as-Code.pdf) : Approche internationale (OCDE)

::: tip Contribution
Ce glossaire est évolutif. N'hésitez pas à proposer des ajouts ou corrections via [notre dépôt GitHub](https://github.com/betagouv/aides-simplifiees-docs).
:::

## Voir aussi

- [Historique des simulateurs publics](/historique)
- [Guide complet des simulateurs](/simulateurs/)
- [Introduction au projet](/introduction)
