import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ShowEvent } from "./page/ShowEvent";
import { ShowUserData } from "./page/ShowUserData";
import { Location } from "./page/Location";
import { Login } from "./page/Login";
import Main from "./page/Main";
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="w-px font-normal hover:font-bold">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header> */}
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/location/:venueName" element={<Location />}></Route>
            <Route path="/showEvent" element={<ShowEvent />}></Route>
            <Route path="/showUserData" element={<ShowUserData />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
