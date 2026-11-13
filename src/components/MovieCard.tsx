import { Link } from "react-router";
import styled from "styled-components";

const StyledLink = styled(Link)`
    width: 200px;
    border-radius: 12px;
    padding: 10px;
    background-color: white;
    color: #333;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: all 0.5s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    
    img {
        width: 100%;
        border-radius: 8px;
    }
    
    &:hover {
        transform: scale(1.2);
    }
`;

type Props = {
    movie: {
        imdbID : string;
        Title : string;
        Poster : string;
        Year : string;
    };
};

function MovieCard({ movie } : Props) {
    return <StyledLink to={`/detail/${movie.imdbID}`}>
    {movie.Poster ? (
        <img src={movie.Poster} alt={movie.Title} />
    ) : (
        <div>No cover</div>
    )}
    <div>{movie.Title}</div>
    <div>{movie.Year}</div>
</StyledLink>;
}

export default MovieCard;
