import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Container } from "./Home.jsx";
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

function Detail() {
    const navigate = useNavigate();

    const { imdbID } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${imdbID}&plot=full`).then(res =>
            res
                .json()
                .then(json => setMovie(json))
                .catch(err => console.log(err)),
        );
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
