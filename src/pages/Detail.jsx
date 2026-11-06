import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

function Detail() {
    const navigate = useNavigate();

    const { imdbID } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${imdbID}&plot=full`)
            .then(res => res.json()
                .then(json => setMovie(json))
                .catch(err => console.log(err)),
        );
    }, [imdbID]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; Back
            </button>
            <div>
                <img src={movie.Poster} alt={movie.Title} />
            </div>
            <h2>{movie.Title}</h2>
            <div>Year: {movie.Year}</div>
            <div>Genre: {movie.Genre}</div>
            <div>Director: {movie.Director}</div>
            <p dangerouslySetInnerHTML={{ __html: movie.Plot }}></p>
        </div>
    );
}

export default Detail;
