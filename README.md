## Installation
Prérequis:
* Mongodb 
* Nodejs 16+
* Python 3
```bash
git clone <url-projet>
cd back-gutenberg
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
