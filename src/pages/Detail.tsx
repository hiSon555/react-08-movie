import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Container } from "./Home.tsx";
import styled from "styled-components";

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

const Plot = styled.p`
    line-height: 1.6;
    margin-top: 20px;
`;

type MovieInfo = {
    Title: string;
    Year: string;
    Genre: string;
    Director: string;
    Plot: string;
    Poster: string;
}


function Detail() {
    const navigate = useNavigate();

    const { imdbID } = useParams();
    // URL 경로에 값이 없는 undefined를 고려하여
    // 리턴 처리
    if (!imdbID) return;

    const [movie, setMovie] = useState<MovieInfo | null>(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${imdbID}&plot=full`).then(res =>
            res
                .json()
                .then((json: MovieInfo) => setMovie(json))
                .catch((err: unknown) => {
                    if (err instanceof Error) {
                        console.log(err.message)
                    }
                }
        ))
    }, [imdbID]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <BackBtn
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; Back
            </BackBtn>
            <div>
                <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div>
                <h1>{movie.Title}</h1>
                <div>
                    <span>Year:</span> {movie.Year}
                </div>
                <div>
                    <span></span> {movie.Genre}
                </div>
                <div>
                    <span></span> {movie.Director}
                </div>
            </div>
            <Plot dangerouslySetInnerHTML={{ __html: movie.Plot }}></Plot>
        </Container>
    );
}

export default Detail;
