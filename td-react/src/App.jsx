import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";

function Header() {
    return (
        <header>
            <h1>Introduction à React</h1>
            <h2>A la découverte des premières notions de React</h2>
        </header>
    );
}

function MainContent() {
    const now = new Date();
    const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const mois = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    const jour = jours[now.getDay()];
    const moisNom = mois[now.getMonth()];
    const annee = now.getFullYear();
    const heure = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const seconde = String(now.getSeconds()).padStart(2, "0");

    return (
        <p>
            Bonjour, on est le <b>{jour}</b>, <b>{moisNom}</b>, <b>{annee}</b>
            et il est <b>{heure}:{minute}:{seconde}</b>.
        </p>
    );
}

function Footer() {
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
    const [randomItem, setRandomItem] = useState(null);

    useEffect(() => {
        fetch("./data.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                setError(error.message || error);
                console.error("Error fetching data:", error);
            });
    }, []);

    const getRandomItem = () => {
        if (data && data.length > 0) {
            const item = data[Math.floor(Math.random() * data.length)];
            setRandomItem(item);
        }
    };

    if (error) {
        return <p>Error loading data...</p>;
    }

    if (!data) {
        return <p>Loading data...</p>;
    }

    return (
        <div>
            <h3>Random Item</h3>
            <button onClick={getRandomItem}>Get Random Item</button>
            {randomItem && (
                <div>
                    <p><b>Course:</b> {randomItem.course}</p>
                    <p><b>Student:</b> {randomItem.student.firstname} {randomItem.student.lastname}</p>
                    <p><b>Date:</b> {randomItem.date}</p>
                    <p><b>Grade:</b> {randomItem.grade}</p>
                </div>
            )}
        </div>
    );
}

function Menu() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = (item) => {
        alert(`Vous avez cliqué sur : ${item}`);
        setMenuOpen(false);
    };

    return (
        <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
            <button className="hamburger" onClick={() => setMenuOpen(!isMenuOpen)}>
                &#9776;
            </button>
            <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
                <ul>
                    <li onClick={() => handleMenuClick("Notes")}>Notes</li>
                    <li onClick={() => handleMenuClick("Etudiants")}>Etudiants</li>
                    <li onClick={() => handleMenuClick("Matières")}>Matières</li>
                    <li onClick={() => handleMenuClick("A propos")}>A propos</li>
                </ul>
            </nav>
        </div>
    );
}

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Header />
            <Menu />
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

            <h1>Vite + React</h1>

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
