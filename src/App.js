import './App.css';
import { Routes, Route } from "react-router-dom";
import Top from './components/header/Top'
import Search from './components/header/Search'
import Home from './components/pages/Home'

function App() {
  return (
    <div className="App">
      <Top/>
      <Search/>
          {/* <ul className="App-header">
              <li>
                  <Link to="/">Home</Link>
              </li>
              <li>
                  <Link to="/top">
                      Top Menu
                  </Link>
              </li>
              <li>
                  <Link to="/search">
                      Search Bar
                  </Link>
              </li>
          </ul> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top" element={<Top />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      </div>
  );
}

export default App;
