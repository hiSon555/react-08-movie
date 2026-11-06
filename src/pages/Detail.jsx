import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";

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
        <div className={styles.container}>
            <button
                className={styles.backBtn}
                onClick={() => {
                    navigate("/");
                }}>
                &larr; Back
            </button>
            <div>
                <img className={styles.img} src={movie.Poster} alt={movie.Title} />
            </div>
            <div className={styles.description}>
                <h1>{movie.Title}</h1>
                <div>
                    <span className={styles.bold}>Year:</span> {movie.Year}
                </div>
                <div>
                    <span className={styles.bold}>Genre:</span> {movie.Genre}
                </div>
                <div>
                    <span className={styles.bold}>Director:</span> {movie.Director}
                </div>
            </div>
            <p dangerouslySetInnerHTML={{ __html: movie.Plot }}></p>
        </div>
    );
}

export default Detail;
