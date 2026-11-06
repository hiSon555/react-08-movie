import { useNavigate } from "react-router";
import { useState } from "react";

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
        <form onSubmit={onSubmitHandler}>
            <input onChange={onChangeHandler} value={input} />
            <button>검색</button>
        </form>
    );
}

export default SearchBar;