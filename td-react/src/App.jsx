import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material"; // Import Material UI components
import "./App.css";

function Header() {
    return (
        <header>
            <img src={"https://newsroom.univ-cotedazur.fr/images/vignette_par_defaut.jpg"} style={{ width: "auto", height: "100px" }} />
            <h1>Introduction à React</h1>
            <h2>À la découverte des premières notions de React</h2>
        </header>
    );
}

function MainContent({ activeMenu, data, searchQuery }) {
    if (activeMenu === "Notes") {
        return (
            <div>
                <h3>Liste des Notes</h3>
                <Note data={data} searchQuery={searchQuery} />
            </div>
        );
    }
    if (activeMenu === "Étudiants") {
        return (
            <div>
                <h3>Liste des Étudiants</h3>
                <Students data={data} searchQuery={searchQuery} />
            </div>
        );
    }
    if (activeMenu === "Matières") {
        return (
            <div>
                <h3>Liste des Matières</h3>
                <Matières data={data} searchQuery={searchQuery} />
            </div>
        );
    }
    if (activeMenu === "À propos") {
        return (
            <div>
                <h3>À propos</h3>
                <p>Ceci est une application d'exemple pour démontrer React.</p>
            </div>
        );
    }
    return null;
}

function Note({ data, searchQuery }) {
    const filteredData = data.filter((item) => {
        const gradeString = item.grade.toString(); // Convert grade to string for comparison
        const query = searchQuery.toLowerCase().trim();
        const fullName = `${item.student.firstname} ${item.student.lastname}`.toLowerCase();
        return (
            fullName.includes(query) || gradeString.includes(query)
        );
    });

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>Grade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.student.firstname} {item.student.lastname}</TableCell>
                            <TableCell>{item.grade}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Students({ data, searchQuery }) {
    const filteredData = data.filter((item) => {
        const query = searchQuery.toLowerCase().trim();
        const fullName = `${item.student.firstname} ${item.student.lastname}`.toLowerCase();
        return (
            fullName.includes(query) ||
            item.student.id.toString().includes(query) // Include search by student ID
        );
    });

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Student ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.student.firstname}</TableCell>
                            <TableCell>{item.student.lastname}</TableCell>
                            <TableCell>{item.student.id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Matières({ data, searchQuery }) {
    const filteredData = data.filter((item) => {
        const query = searchQuery.toLowerCase().trim();
        return item.course.toLowerCase().includes(query);
    });

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Course</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.course}</TableCell>
                            <TableCell>{item.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
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

function Menu({ onMenuClick }) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("Notes");

    const menuItems = ["Notes", "Étudiants", "Matières", "À propos"];

    const handleMenuClick = (item) => {
        setActiveItem(item);
        setMenuOpen(false);
        onMenuClick(item); // Notify parent about the selected item
    };

    return (
        <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
            <button className="hamburger" onClick={() => setMenuOpen(!isMenuOpen)}>
                &#9776;
            </button>
            <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
                <ul>
                    {menuItems.map((item) => (
                        <li
                            key={item}
                            onClick={() => handleMenuClick(item)}
                            className={activeItem === item ? "active" : ""}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

function App() {
    const [activeMenu, setActiveMenu] = useState("Notes");
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

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

    const handleMenuClick = (item) => {
        setActiveMenu(item);
        setSearchQuery("");
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (error) {
        return <p>Error loading data...</p>;
    }

    if (!data.length) {
        return <p>Loading data...</p>;
    }

    return (
        <>
            <Header />
            <Menu onMenuClick={handleMenuClick} />
            <div className="main-content">
                {/* Search Bar positioned to the right above the table */}
                <div className="search-container" style={{ marginBottom: "20px" }}>
                    <TextField
                        label="Recherche"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ backgroundColor: "white", width: "250px" }}
                    />
                </div>
                {/* Display content based on the selected menu */}
                <MainContent activeMenu={activeMenu} data={data} searchQuery={searchQuery} />
            </div>
            <Footer />
        </>
    );
}

export default App;
