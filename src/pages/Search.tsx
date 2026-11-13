import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.tsx";
import { Container } from "./Home.tsx";
import styled from "styled-components";
import MovieCard from "../components/MovieCard.tsx";

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

type MDescription = {
    Title : string;
    Year : string;
    Poster : string;
    imdbID : string;
}

type MList = {
    Search : MDescription[];
}

function Search() {
    const [searchParams] = useSearchParams();
    // URL의 쿼리스트링 매개변수가 없으면 null

    const navigate = useNavigate();

    const keyword = searchParams.get("keyword");

    const [list, setList] = useState<MDescription[]>([]);
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
            .then((json:MList) => setList(json.Search))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log("알 수 없는 에러 + " + err.message)
                }
                // 개발자가 개발자 도구에서 에러 분석 내용을 보기 위해서 하는 것
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <Container>
            <BackBtn onClick={() => {navigate("/")}}>return Home</BackBtn>
            <h2>검색 키워드 : {keyword}</h2>

            <SearchBar keyword={keyword ?? ""} />
            {/*

            */}

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <List>
                {/*
                    array에 맵을 돌렸을 때, 리턴되는 최상단 태그에는
                    반복적으로 화면을 출력하기 때문에 리액트 엔진이 알아볼 수 있도록
                    일련 번호를 붙여서 리턴 시켰어야 함
                    그 속성이 key이고, 그 속성값은 반복 요소들 중 유일한 값을 가졌어야 함
                    그러한 이유로 key 속성이 있기 때문에 Props로 전달되진 않음
                */}
                {Array.isArray(list)
                    ? list.map((x, index) => <MovieCard key={index} movie={x} />)
                    : "검색 결과가 없습니다."}
            </List>
        </Container>
    );
}

export default Search;
