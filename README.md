# Wael Souabni — Portfolio

Portfolio professionnel statique de Wael Souabni, développeur Full Stack JavaScript / TypeScript à Djerba, Tunisie.

- Production : https://wael-souabni-portfolio.vercel.app/
- Dépôt : https://github.com/WaelSouabni/wael-souabni-portfolio

## Référencement (SEO)

- `robots.txt` autorise l'exploration du site, bloque uniquement `/api/` et référence le sitemap XML.
- `sitemap.xml` répertorie la page d'accueil et les études de cas publiques.
- La page d'accueil et les pages de projets déclarent leurs URL canoniques et autorisent l'indexation.
- Les pages de projets utilisent des métadonnées propres à chaque étude de cas et des données structurées.

### IndexNow

La clé publique de vérification IndexNow est publiée à la racine du site :

https://wael-souabni-portfolio.vercel.app/8f3c1a7d9e624b50a4d8c2f6710be935.txt

Le workflow GitHub Actions `.github/workflows/indexnow.yml` :
1. se déclenche après chaque push sur `master` (ou manuellement depuis GitHub Actions) ;
2. attend que Vercel serve la clé et le sitemap correspondant au commit ;
3. lit les URL du sitemap et les soumet à l'API IndexNow.

IndexNow notifie les moteurs participants qu'une URL a changé ; cela ne garantit ni son exploration ni son indexation. Google et Brave ne doivent pas être considérés comme directement couverts par cette soumission. Continuer à gérer Google via Search Console et à surveiller séparément la découverte dans Brave.

### Après une modification SEO

1. Vérifier les URL canoniques et les directives robots.
2. Mettre à jour `sitemap.xml` si une URL publique est ajoutée, supprimée ou déplacée.
3. Pousser les modifications sur `master`.
4. Vérifier le déploiement Vercel et l'exécution du workflow IndexNow dans l'onglet **Actions** du dépôt.
