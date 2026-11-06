import { Link, useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import { Container } from "./Home.jsx";
import styled from "styled-components";
import MovieCard from "../components/MovieCard.jsx";

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 100px;
    justify-content: center;
`;

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
                console.log(err); // 개발자가 개발자 도구에서 에러 분석 내용을 보기 위해서 하는 것
                setError("검색 오류 뜸");
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <Container>
            <button
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; Home
            </button>
            <h2>검색 키워드 : {keyword}</h2>
            <SearchBar keyword={keyword} />
            {/*{loading && <div>Loading...</div>}*/}
            {/*{error && <p>{error}</p>}*/}
            {/*삼항이 아닌 걸로 */}
            {loading ? (
                <div>로딩 중입니다...</div>
            ) : list.length === 0 ? (
                <div>검색 오류 뜸</div>
            ) : (
                <List>
                    {/* 우리는 Search를 가공해서 map을 돌리니 Search값이 없다면 오류 뜸*/}
                    {Array.isArray(list) &&
                        list.map(item => {
                            return (
                                <MovieCard key={item.imdbID} movie={item} />
                            );
                        })}
                </List>
            )}
        </Container>
    );
}

export default Search;
