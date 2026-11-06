import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Detail from "./pages/Detail.jsx";
import { GlobalStyle } from "./GlobalStyle.js";


function App() {
  return (
      <>
          <GlobalStyle />
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/detail/:imdbID" element={<Detail />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;