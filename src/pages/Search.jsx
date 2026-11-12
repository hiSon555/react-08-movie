import { useNavigate, useSearchParams } from "react-router";
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

const BackBtn = styled.button`
display: block;
    text-align: start;
margin-bottom: 20px;
background: none;
border: none;
color: #ff5959;
font-size: 16px;
cursor: pointer;
padding: 0;

&:hover {
    text-decoration: underline;
}
`;

function Search() {
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const keyword = searchParams.get("keyword");

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); // loading true인 상태 / 화면에 띄울 에러 메세지를 저장할 목적의 state

    useEffect(() => {
        // keyword 변수 값이 null일 때는 fetch하면 안 됨
        if (!keyword) return;

        // setLoading(true); // error에선 loading true인 상태면 없어도 됨

        // 초기화를 해줘야 화면에 이전의 화면값이 안 남음
        // fetch가 실행되지 않으니까ㅏ까까ㅏㅏ
        // eslint-disable-next-line
        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${encodeURIComponent(keyword)}`)
            .then(res => res.json())
            .then(json => setList(json.Search))
            .catch(err => {
                console.log(err); // 개발자가 개발자 도구에서 에러 분석 내용을 보기 위해서 하는 것
                setError("검색 오류");
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <Container>
            <BackBtn onClick={() => {navigate("/")}}>return Home</BackBtn>
            <h2>검색 키워드 : {keyword}</h2>

            <SearchBar keyword={keyword} />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <List>
                {Array.isArray(list)
                    ? list.map((x, index) => <MovieCard key={index} movie={x} />)
                    : "검색 결과가 없습니다."}
            </List>
        </Container>
    );
}

export default Search;
