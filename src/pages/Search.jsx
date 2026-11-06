import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";

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
            <h3>검색 키워드 : {keyword}</h3>

            <SearchBar keyword={keyword} />
            {loading ? (
                <div>로딩 중입니다...</div>
            ) : list.length === 0 ? (
                <div>검색 결과가 없습니다.</div>
            ) : (
                list.map(item => {
                    return (
                        <Link key={item.imdbID} to={`/detail/${item.imdbID}`}>
                            {item.Poster ? (
                                <img src={item.Poster} alt={item.Title} />
                            ) : (
                                <div>No cover</div>
                            )}

                            <div>{item.Title}</div>
                            {/*
                                authors는 array임
                                그럼 map을 돌려서 표현해야 하는가?
                                .join() : array 안에 요소들을 하나로 합쳐주는 메서드
                                          string 요소가 들어있을 때 가장 많이 씀

                                          const arr = ["홍길동", "김철수", "홍영희"]
                                          arr.join(", ");       => "홍길동, 김철수, 홍영희"

                                저자가 없는 경우가 발생됨 => 옵셔널 체이닝 연산자
                            */}
                            <div>개봉년도 : {item.Year}년</div>
                        </Link>
                    );
                })
            )}
        </div>
    );
}

export default Search;
