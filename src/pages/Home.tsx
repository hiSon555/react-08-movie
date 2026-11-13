import SearchBar from "../components/SearchBar.tsx";
import styled from "styled-components";

// eslint-disable-next-line
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
`

function Home() {

    return (
        <Container>
            <span>Movie Search</span>
            <SearchBar keyword={""} />
        </Container>
);
}

export default Home;