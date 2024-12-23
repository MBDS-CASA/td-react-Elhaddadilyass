import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
function Header(){
    return(
        <header>
            <img src={"data:image/jpeg;base64,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"} className="logo" alt="Nice logo"/>
            <h1>Introduction à React</h1>
            <h2>A la découverte des premières notions de React</h2>
        </header>
    )
}
function MainContent() {
    // Récupérer la date actuelle
    const now = new Date();
    const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const mois = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    const jour = jours[now.getDay()]; // Jour de la semaine
    const moisNom = mois[now.getMonth()]; // Mois en texte
    const annee = now.getFullYear(); // Année
    const heure = String(now.getHours()).padStart(2, "0"); // Heure avec zéro initial
    const minute = String(now.getMinutes()).padStart(2, "0"); // Minute avec zéro initial
    const seconde = String(now.getSeconds()).padStart(2, "0"); // Seconde avec zéro initial

    return (
        <p>
            Bonjour, on est le <b>{jour}</b>, <b>{moisNom}</b>, <b>{annee}</b>
             et il est <b>{heure}:{minute}:{seconde}</b>.
        </p>
    );
}

function Footer() {
    // Récupérer l'année actuelle
    const annee = new Date().getFullYear();

    return (
        <p>
            © {annee} - Ilyass El Haddad, Tous droits réservés.
        </p>
    );
}

function App() {
    const [count, setCount] = useState(0)

    return (
    <>
        <Header />
        <MainContent/>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + dorr+ React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
        <Footer/>
    </>

  )
}

export default App
