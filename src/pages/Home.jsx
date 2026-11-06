import SearchBar from "../components/SearchBar.jsx";
import styles from "./Home.module.css";

function Home() {

    return (
        <div className={styles.container}>
            <span className={styles.title}>Movie Search</span>
            <SearchBar keyword={""} />
        </div>
);
}

export default Home;