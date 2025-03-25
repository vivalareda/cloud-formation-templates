# Serveur de licence
Documentation pour les applications utilisées dans le cadre du cours IND250 de l'ÉTS [lien](https://www.etsmtl.ca/etudes/cours/ind250/).

Le serveur de licence permet de valider la licence dans le serveur dorsal de MenuGraphique pour activer ces différents services.
Le serveur de licence permet aussi de générer une licence gratuite.

## Démarrer et configurer le serveur de licence
Pour démarrer le serveur de licence:
````
nohup node index.js [port] &
````
La commande `nohup` empêche la fermeture de l'application après la fin de l'exécution du script de démarrage.
Le `&` permet d'executé la ligne de commande en arrière plan.
Si vous voulez tester les applications en **Windows** veuillez retirer `nohup` et `&`.

### Configuration du port écouté
Le port écouté par le serveur de licence est **8080** par défaut. Ce port peut être changé de deux façons:
- Passer un numéro de port comme 2e paramètre lors du lancement du serveur
- Définir une variable d'environnement nommée `IND250_SECURE_SERVER_PORT` contenant le nouveau numéro de port

### Service du serveur de licence
| Page                | Description                                                                                                 |
|---------------------|-------------------------------------------------------------------------------------------------------------|
| /diag               | Affiche les différentes configurations du serveur                                                           |
| /validate/{licence} | Permets de valider une licence passée dans l'URL. HTTP200:Licence ok, HTTP400:Licence invalide ou manquante |

## Obternir une licence gratuite
Pour obtenir une licence gratuite, exécutez la ligne suivante:
````
node generate.js
````
La licence sera affichée directement à la console.