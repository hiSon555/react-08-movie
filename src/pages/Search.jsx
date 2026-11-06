import { Link, useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import styles from "./Search.module.css";

function Search() {
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const keyword = searchParams.get("keyword");

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // loading true인 상태 / 화면에 띄울 에러 메세지를 저장할 목적의 state

    useEffect(() => {
        // keyword 변수 값이 null일 때는 fetch하면 안 됨
        if (!keyword) return;

        setLoading(true); // error에선 loading true인 상태면 없어도 됨
        
        // 초기화를 해줘야 화면에 이전의 화면값이 안 남음
        // fetch가 실행되지 않으니까ㅏ까까ㅏㅏ
        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${encodeURIComponent(keyword)}`)
            .then(res => res.json())
            .then(json => setList(json.Search))
            .catch(err => {
                console.log(err);   // 개발자가 개발자 도구에서 에러 분석 내용을 보기 위해서 하는 것
                setError("검색 오류 뜸");
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <div className={styles.searchContainer}>
            <button
                className={styles.backBtn}
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; Home
            </button>
            <span className={styles.SearchBar}>검색 키워드 : {keyword}</span>
            <SearchBar keyword={keyword} />
            {/*{loading && <div>Loading...</div>}*/}
            {/*{error && <p>{error}</p>}*/}
            {/*삼항이 아닌 걸로 */}
            {loading ? (
                <div>로딩 중입니다...</div>
            ) : list.length === 0 ? (
                <div>검색 오류 뜸</div>
            ) : (
                <div className={styles.container}>
                    {/* 우리는 Search를 가공해서 map을 돌리니 Search값이 없다면 오류 뜸*/}
                    {Array.isArray(list) && list.map(item => {
                        return (
                            <Link
                                className={styles.card}
                                key={item.imdbID}
                                to={`/detail/${item.imdbID}`}>
                                {item.Poster ? (
                                    <img
                                        className={styles.img}
                                        src={item.Poster}
                                        alt={item.Title}
                                    />
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
