import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import styles from "./Search.module.css";

function Search() {
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get("keyword");

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!keyword) return;

        setLoading(true);

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${encodeURIComponent(keyword)}`)
            .then(res => res.json())
            .then(json => setList(json.Search || []))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <div>
            <span className={styles.SearchBar}>검색 키워드 : {keyword}</span>
            <SearchBar keyword={keyword} />
                {loading ? (
                    <div>로딩 중입니다...</div>
                ) : list.length === 0 ? (
                    <div>검색 결과가 없습니다.</div>
                ) : (
                    <div className={styles.container}>
                        {list.map(item => {
                            return (
                                <Link className={styles.card} key={item.imdbID} to={`/detail/${item.imdbID}`}>
                                    {item.Poster ? (
                                        <img className={styles.img} src={item.Poster} alt={item.Title} />
                                    ) : (
                                        <div>No cover</div>
                                    )}
                                    <div className={styles.title}>{item.Title}</div>
                                    <div>{item.Year}</div>
                                </Link>
                            );
                        })}
                    </div>
                )}
        </div>
    );
}

export default Search;
