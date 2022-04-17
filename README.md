## Installation

Prérequis:

-  Mongodb
-  Nodejs 16+
-  Python 3

```bash
git clone <url-projet>
cd back
npm install #or
yarn install
```

## Lancement de l'api

```
npm run server
```

Pour vérifier que l'api fonctionne :

```
$ curl -s http://localhost:3000/
> API Running
```

## Initialisation de la base

À lancer dans un autre terminal, il est nécessaire que l'api soit lancé avant d'exécuter ces scripts.  
Télécharge une centaine de livres, insère les métadonnées dans la base, effectue le forward indexing.

Attention l'exécution de la tâche peut aller à plus de 4h. Pour diminuer le temps, il faudrait prendre un nombre de livre moins conséquente. (détaillé dans la prochaine section)

```bash
cd data-loading
npm install
chmod +x run.sh
./run.sh
```

Inverted indexing:

```bash
python3 backward_index.py
```

Distance de Jaccard entre tous les couples de livres :

```bash
python3 jaccard_distance.py
```

## Tester avec 30 livres

Nous pouvons testé les scripts avec 30 livres pour commencer.
Aller dans `data-loading/test/data.csv`, conserver que les 30 premières lignes.
