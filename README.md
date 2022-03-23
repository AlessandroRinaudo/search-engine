## Script pour initialiser les données
- Récupérer X livres dans Gutendex
- Télécharger les X livres de Gutendex dans le dossier Data
- Pour chaque livre :
  - Lancer une requête pour indexer ce livre dans fwdindex
  - Lancer une requête pour insérer les métadonnées de ce livre dans books
  - NB: Faire attention aux ids de livres pour qu'ils correspondent entre books et fwdindex
- Lancer une requête qui va faire le bwd index sur tous les livres présents dans fwdindex