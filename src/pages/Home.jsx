import SearchBar from "../components/SearchBar.jsx";


function Home() {

    return (
        <div>
            <span>영화 검색</span>
            <SearchBar keyword={""} />
        </div>
);
}

export default Home;