import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

function Header() {
    return (
        <header>
            <h1>Introduction à React</h1>
            <h2>A la découverte des premières notions de React</h2>
        </header>
    );
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
        <footer>
            <p>© {annee} - Ilyass El Haddad, Tous droits réservés.</p>
        </footer>
    );
}

function GetRandomItems() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('./data.json')  // Ensure this is the correct path to your data.json
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                setError(error.message || error);
                console.error('Error fetching data:', error);
            });
    }, []);

    // If there's an error or data is still loading, show a message
    if (error) {
        return <p>Error loading data...</p>;
    }

    if (!data) {
        return <p>Loading data...</p>;
    }

    // Select a random item from the data array
    const randomItem = data[Math.floor(Math.random() * data.length)];

    return (
        <div>
            <h3>Random Item:</h3>
            <p><b>Course:</b> {randomItem.course}</p>
            <p><b>Student:</b> {randomItem.student.firstname} {randomItem.student.lastname}</p>
            <p><b>Date:</b> {randomItem.date}</p>
            <p><b>Grade:</b> {randomItem.grade}</p>
        </div>
    );
}

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Header />
            <GetRandomItems />
            <MainContent />

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
                <button onClick={() => setCount(count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>

            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>

            <Footer />
        </>
    );
}

export default App;
