import { useNavigate } from "react-router";
import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ keyword }) {
    const navigate = useNavigate();
    const [input, setInput] = useState(keyword);

    const onChangeHandler = e => setInput(e.target.value);

    const onSubmitHandler = e => {
        e.preventDefault();
        const k = input.trim();
        if (!k) return;
        navigate(`/search?keyword=${encodeURIComponent(k)}`);
    };

    return (
        <form onSubmit={onSubmitHandler} className={styles.form}>
            <input onChange={onChangeHandler} value={input} className={styles.input} />
            <button className={styles.btn}>Search</button>
        </form>
    );
}

export default SearchBar;