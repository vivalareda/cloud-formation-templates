# Super serveur web
Documentation pour les applications utilisées dans le cadre du cours IND250 de l'ÉTS [lien](https://www.etsmtl.ca/etudes/cours/ind250/).
Ces deux applications sont basées sur le même code source ce qui permet de les lancer et les configurer de la même manière.

Veuillez vous référer à votre énoncé pour déterminer quelle application à utiliser et les différentes configurations
requises pour le contexte présenté.

| Application                                     | description                                                    |
|-------------------------------------------------|----------------------------------------------------------------|
| WebServer-{version}.jar                         | Serveur web pour le service backend (API)                      |
| ImageWorker-{version}-jar-with-dependencies.jar | Application pour traiter des messages dans une file de message |

## Lancer les applications
Les deux applications (fichiers jar) utilisent **Java JDK 21** qui doit être installé avant de lancer l'application.
Vous pouvez télécharger celui-ci sur le site d’Oracle: [lien](https://www.oracle.com/ca-en/java/technologies/downloads/).

Pour démarrer les applications en Linux:

```
nohup java -jar <application>.jar [arguments] &
``` 

La commande `nohup` empêche la fermeture de l'application après la fin de l'exécution du script de démarrage.
Le `&` permet d'executé la ligne de commande en arrière plan.
Si vous voulez tester les applications en **Windows** veuillez retirer `nohup` et `&`.



## Configuration

Les deux applications peuvent être configurées via des arguments d'application ou des variables d'environnement.
Tous les arguments d'application ont une variable d'environnement équivalent qui correspond à la concaténation de
"WEBSERVER_" et du nom de l'argument en majuscule.

Par exemple, pour l'argument "port" de l'application, le nom de la variable d'environnement sera "WEBSERVER_PORT".

Dans le cas qu'une même configuration soit spécifiée de plusieurs manières différentes, les applications vont toujours
prioriser les configurations dans cet ordre:
- Les arguments de l'application
- Les variables d'environnement
- Les valeurs par défaut

Pour déterminer les configurations requises et la méthode pour les passer à l'application,
veuillez-vous référer à l'énoncer du laboratoire.

### Arguments de l'application
| Argument         | Description                                               | Valeur par défaut |
|------------------|-----------------------------------------------------------|------------------:|
| port             | Port écouté par le serveur Web                            |              8080 |
|                  |                                                           |                   |
|                  | **Serveur de licence**                                    |                   |
| cryptoprotocol   | Protocol du serveur de licence (http\|https)              |              http |
| cryptoserver     | Ip ou dns du serveur de licence                           |         127.0.0.1 |
| cryptoserverport | Port du serveur de licence                                |              8080 |
| cryptolicence    | Licence utilisée pour l'application                       |                   |
|                  |                                                           |                   |
|                  | **Base de données**                                       |                   |
| dbtype           | Type de base de données (valeur: SQL\|DYNAMO)             |               SQL | 
| dbtable          | Nom de la table/base de données utilisée                  |            Pizzas |
| dbhost           | Ip ou dns de la base de données SQL                       |         127.0.0.1 |
| dbport           | Port de la base de données SQL                            |              3306 |
| dbuser           | Nom d'utilisateur pour la base de données SQL             |              root |
| dbpass           | Mot de passe de l'utilisateur pour la base de données SQL |                   |



## Service web du serveur backend
| Page                        | Description                                                                      | Requiers une licence |
|-----------------------------|----------------------------------------------------------------------------------|:--------------------:|
|                             | **Diagnostic**                                                                   |                      |
| /diag                       | Affiche les configurations passées à l'application et comment ils ont été passés |         Faux         |
| /status                     | Affiche les statuts de chaque service interne de l'application                   |         Faux         |
|                             |                                                                                  |                      |
|                             | **Pizza**                                                                        |                      |
| /Pizzas                     | Affiche la liste de toutes les pizzas                                            |         Vrai         |
| /Pizzas/{id}                | Affiche les données sur une pizza dont l'identifiant est ID                      |         Vrai         |
| /Pizzas/{id}/generateImage  | Génère une image pour la pizza dont l'identifiant est ID (prends 10 minutes)     |         Vrai         |
|                             |                                                                                  |                      |
|                             | **Autre**                                                                        |                      |
| /loadtest?duration=X&load=Y | Simule un traitement sur le CPU de X ms occupant Y% du CPU                       |         Faux         |

