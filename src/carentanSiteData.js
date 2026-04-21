/** Données publiques du site https://carentanlesmarais.fr/ */
export const SITE = 'https://carentanlesmarais.fr';

export const ASSETS = {
  logoHorizontal: '/carentan/logo-carentan-officiel.png',
  logoCarre: SITE + '/wp-content/uploads/2019/03/logo-2018.png',
  heroPrincipal: '/carentan/hero-place-republique.webp',
  heroSecondaire: SITE + '/wp-content/uploads/2025/12/GABARIT_Image_SC2026.jpg',
  slideHaut: SITE + '/wp-content/uploads/2026/01/SLIDE_HISSEZ-HAUT.jpg',
  numerosUrgence: SITE + '/wp-content/uploads/2023/06/carentant-numero-urgence-1030x568.jpg',
  planVille: SITE + '/wp-content/uploads/2015/11/footerPlan.png',
  partenaireComcom: SITE + '/wp-content/uploads/2015/12/comcom-logo-pour-lien-utile-page-accueil.png',
  partenaireAquadick: SITE + '/wp-content/uploads/2015/12/ville-carentan-Aquadick.jpg',
  partenaireBaie: SITE + '/wp-content/uploads/2015/11/baiecotentin.png',
};

export const LINKS = {
  accueil: SITE + '/',
  agenda: SITE + '/agenda/',
  cartographie: SITE + '/cartographie',
  nousContacter: SITE + '/nous-contacter/',
  demarches: SITE + '/demarches/',
  demarchesAdmin: SITE + '/ma-ville/demarches-administratives/',
  passeport: SITE + '/la-mairie/passeport-et-carte-didentite/',
  genealogie: SITE + '/recherches-genealogiques/',
  listesElectorales: SITE + '/inscription-listes-electorales/',
  jdc: SITE + '/journee-defense-et-citoyennete/',
  collectes: SITE + '/collectes/',
  dechetsVerts: SITE + '/dechets-verts/',
  eau: SITE + '/y-vivre/service-des-eaux/',
  ccas: SITE + '/ma-ville/ccas/',
  educationJeunesse: SITE + '/y-vivre/enfance-jeunesse-2/',
  enseignementPublic: SITE + '/y-vivre/enfance-jeunesse-2/enseignement-public/',
  menusScolaires: SITE + '/y-vivre/enfance-jeunesse-2/menus-des-restaurants-scolaires/',
  communeNouvelle: SITE + '/la-mairie/la-commune-nouvelle/',
  bulletinMunicipal: SITE + '/bulletin-municipal-2/',
  budgets: SITE + '/les-budgets/',
  marchesPublics: SITE + '/marche-public/',
  conseilsMunicipaux: SITE + '/la-mairie/mairie/conseils-municipaux/',
  arretes: SITE + '/la-mairie/mairie/arrete-municipal-en-cours/',
  histoire: SITE + '/decouvrir/histoire-de-carentan/',
  marcheHistoire: SITE + '/decouvrir/a-pied-dans-l-histoire/',
  venir: SITE + '/decouvrir/venir-a-carentan/',
  officeTourisme: SITE + '/decouvrir/office-de-tourisme-2/',
  port: SITE + '/decouvrir/port-de-carentan/',
  parcMarais: SITE + '/decouvrir/parc-des-marais/',
  musees: SITE + '/musees/',
  mapping: SITE + '/mapping/',
  saisonCulturelle: SITE + '/saison-culturelle-2025/',
  passSport: SITE + '/passsport/',
  bosseNDrive: SITE + '/y-vivre/enfance-jeunesse-2/bosse-n-drive/',
  facebook: 'https://www.facebook.com/villedecarentanlesmarais/',
  otBaieCotentin: 'http://www.ot-baieducotentin.fr/',
  ccbdc: 'http://www.ccbdc.fr/',
};

export const HISTOIRE_PDFS = [
  { label: 'La guerre de Cent ans', href: SITE + '/wp-content/uploads/2015/12/Carentan-dans-la-guerre-de-Cent-ans-Octobre-2013.pdf' },
  { label: '1790 — Le district de Carentan', href: SITE + '/wp-content/uploads/2015/12/ville_carentan-1790-Il-etait-une-fois-le-district-de-Carentan-Avril-2013.pdf' },
  { label: '23 juin 1901 — jour de fête à Carentan', href: SITE + '/wp-content/uploads/2015/12/ville_carentan-23-juin-1901-jour-de-fete-a-Carentan-Avril-2015.pdf' },
  { label: 'Le canal des Espagnols', href: SITE + '/wp-content/uploads/2015/12/ville-carentan-Le-canal-des-Espagnols-Octobre-2011.pdf' },
];

export const ACCES_RAPIDES = [
  { t: 'Agenda', d: 'Événements et rendez-vous', href: LINKS.agenda, img: ASSETS.heroSecondaire, icon: 'calendar' },
  { t: 'Cartographie', d: 'Plans et cartes', href: LINKS.cartographie, img: ASSETS.planVille, icon: 'mapPin' },
  { t: 'Passeport & CNI', d: 'Rendez-vous mairie', href: LINKS.passeport, img: ASSETS.logoCarre, icon: 'idCard' },
  { t: 'Démarches', d: 'Démarches administratives', href: LINKS.demarchesAdmin, img: ASSETS.slideHaut, icon: 'paper' },
  { t: 'Collectes', d: 'Ordures, encombrants…', href: LINKS.collectes, img: ASSETS.partenaireBaie, icon: 'recycle' },
  { t: 'École & jeunesse', d: 'Scolarité, restauration', href: LINKS.educationJeunesse, img: ASSETS.partenaireAquadick, icon: 'school' },
];

export const BLOC_MAIRIE_LINKS = [
  { label: 'La commune nouvelle', href: LINKS.communeNouvelle },
  { label: 'Bulletin municipal « Le Mag »', href: LINKS.bulletinMunicipal },
  { label: 'Les budgets', href: LINKS.budgets },
  { label: 'Marchés publics', href: LINKS.marchesPublics },
  { label: 'Conseils municipaux', href: LINKS.conseilsMunicipaux },
  { label: 'Arrêtés en cours', href: LINKS.arretes },
];

export const DEMARCHES_LINKS = [
  { label: 'Passeport & carte d’identité', href: LINKS.passeport, icon: 'idCard' },
  { label: 'Recherches généalogiques / actes', href: LINKS.genealogie, icon: 'scroll' },
  { label: 'Inscription listes électorales', href: LINKS.listesElectorales, icon: 'vote' },
  { label: 'Démarches & urbanisme', href: LINKS.demarchesAdmin, icon: 'building' },
  { label: 'Journée défense et citoyenneté', href: LINKS.jdc, icon: 'shield' },
];

export const INFOS_LINKS = [
  { t: 'Eau & assainissement', d: 'Service des eaux', href: LINKS.eau, img: ASSETS.partenaireAquadick, icon: 'droplet', tag: 'Régie municipale' },
  { t: 'Éducation & jeunesse', d: 'Écoles, menus, loisirs', href: LINKS.educationJeunesse, img: ASSETS.heroSecondaire, icon: 'school', tag: '6 écoles' },
  { t: 'CCAS & solidarité', d: 'Aides, accompagnement', href: LINKS.ccas, img: ASSETS.logoCarre, icon: 'heart', tag: 'Accueil social' },
  { t: 'Collectes & déchets', d: 'Calendriers, déchets verts', href: LINKS.collectes, img: ASSETS.partenaireBaie, icon: 'recycle', tag: 'Calendrier PDF' },
];

export const PATRIMOINE_LINKS = [
  { t: 'Venir à Carentan-les-Marais', d: 'Accès, transports', href: LINKS.venir, img: ASSETS.heroPrincipal, tags: [{ icon: 'mapPin', label: 'Cotentin · Manche' }, { icon: 'signpost', label: 'RN13 · SNCF' }] },
  { t: 'Office de tourisme', d: 'Baie du Cotentin', href: LINKS.officeTourisme, img: ASSETS.partenaireBaie, tags: [{ icon: 'church', label: 'Centre-ville' }, { icon: 'book', label: 'Guides & plans' }] },
  { t: 'Le port de plaisance', d: 'Base nautique', href: LINKS.port, img: ASSETS.slideHaut, tags: [{ icon: 'droplet', label: '250 anneaux' }, { icon: 'mapPin', label: 'Face à la baie' }] },
  { t: 'Parc des Marais', d: 'Patrimoine naturel', href: LINKS.parcMarais, img: ASSETS.heroSecondaire, tags: [{ icon: 'heart', label: 'PNR classé' }, { icon: 'signpost', label: '145 000 ha' }] },
  { t: 'Musées', d: 'D-Day Experience, Normandy Victory Museum…', href: LINKS.musees, img: ASSETS.mapping, tags: [{ icon: 'parachute', label: 'Juin 1944' }, { icon: 'book', label: '2 musées' }] },
];
