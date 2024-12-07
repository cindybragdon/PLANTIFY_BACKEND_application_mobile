<h2 align="center">Plantify : Suivi et Notifications pour Vos Plantes</h2> 

<h1 align="center"><i> Epreuve Finale </i></h1>
<h2 align="center">Remis par :</h2>
<h2 align="center">Cindy Bragdon</h2>
<h2 align="center">Olivier Poirier</h2>
<h2 align="center">Jenna-Lee Lecavalier</h2>

<h2 align="center">Dans le cadre du cours Développement d'applications 420-XXX-MV</h2> 
<h2 align="center">Enseigné par Maxime Fournier, Cégep Marie-Victorin</h2>

<p align="center">
  <a href="https://github.com/cindybragdon">
    <img src="https://github.com/cindybragdon.png?size=64" width="64" height="64" alt="Cindy" style="border-radius: 50%; overflow: hidden;">
  </a>
  <a href="https://github.com/olivierpoirier">
    <img src="https://github.com/olivierpoirier.png?size=64" width="64" height="64" alt="Olivier" style="border-radius: 50%; overflow: hidden;">
  </a>
  <a href="https://github.com/JennaLeeL">
    <img src="https://github.com/JennaLeeL.png?size=64" width="64" height="64" alt="Jenna" style="border-radius: 50%; overflow: hidden;">
  </a>

---

## :label: Table des matières

- [Contexte du travail](#contexte-du-travail)
- [Outils et Technologies utilisés](#outils-et-technologies-utilisés)
- [Installation et mise en route](#installation-et-mise-en-route)
- [Tests](#tests)
- [Étapes de déploiement](#étapes-de-déploiement)
- [Documentation](#documentation)

---

## Contexte du travail
:mortar_board:  
Développement d'une application mobile nommée **Plantify**, conçue pour la gestion de plantes d’intérieur.  
L’application permet :  
- La création de compte utilisateur.
- L’ajout de fiches personnalisées de plantes (nom, photo, localisation, type).  
- L’intégration d’APIs externes ([Meteomatics](https://www.meteomatics.com/en/api/getting-started/) et [Perenual](https://perenual.com/docs/api)) pour fournir des recommandations adaptées selon la météo et la localisation de l’utilisateur.  
- Des notifications personnalisées pour l’arrosage ou la protection des plantes.

---

## Outils et Technologies utilisés
:toolbox:  
- ![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)
- ![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
- ![NativeWind](https://img.shields.io/badge/NativeWind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

---

## Installation et mise en route
### Prérequis
- **Node.js** : [Installer ici](https://nodejs.org/)  
- **MySQL** : [Télécharger ici](https://dev.mysql.com/downloads/)  
- **Expo CLI** : Installer avec :  
  ```bash
  npx expo install expo-router 
  ```

1. Clonez le dépôt
Clonez ce projet sur votre machine locale en exécutant la commande suivante :
  ```bash
  git clone https://github.com/votre-utilisateur/votre-projet.git
  cd votre-projet
  ```

2. Installez les dépendances
Installez les dépendances nécessaires pour le projet React Native et le back-end :
```bash
  npm install
  ```

3. Configurer la base de données
Vous devez créer la base de données MySQL pour l'application. Pour cela, suivez ces étapes :

Ouvrez votre client MySQL.
Créez une nouvelle base de données en utilisant le script makeBD.sql présent dans le dossier du projet :
```bash
  mysql -u root -p < makeBD.sql
  ```
Vérifiez que la base de données a bien été créée et que les tables sont présentes.
Les identifiants de connexion sont :

Utilisateur: root
Mot de passe: abc-123


4. Lancer le serveur back-end
Dans le dossier du projet, démarrez le serveur back-end avec la commande suivante :
```bash
  npm run dev
  ```
Cela démarrera l'API Express.js sur le port 5000 par défaut.


5. Lancer l'application mobile
Ouvrez un autre terminal dans le même dossier du projet et exécutez la commande suivante pour démarrer l'application mobile avec Expo :
```bash
  npm start
  ```
Cela ouvrira une page dans votre navigateur avec un QR code. Scannez ce code avec l'application Expo Go sur votre appareil Android pour voir l'application en action.


6. Déploiement
Lorsque vous êtes prêt à déployer l'application en format .apk pour la distribution sur des appareils Android, vous pouvez créer l'APK en exécutant la commande suivante :
```bash
  expo build:android
  ```
Cela générera un fichier .apk que vous pourrez installer sur des appareils Android.


cindybragdon/PLANTIFY_projet_session_Applications_Mobiles
