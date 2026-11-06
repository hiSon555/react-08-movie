import SearchBar from "../components/SearchBar.jsx";
import styles from "./Home.module.css";

function Home() {

    return (
        <div className={styles.container}>
            <span className={styles.title}>영화 검색</span>
            <SearchBar keyword={""} />
        </div>
);
}

export default Home;