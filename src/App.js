import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Location } from "./page/Location";
import { Login } from "./page/Login";
import Main from "./page/Main";
import { ShowEvent } from "./page/ShowEvent";
import { ShowUserData } from "./page/ShowUserData";

function App() {
  return (
    <div className="App">
      <div>
        <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />
        <BrowserRouter>
          <Routes>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/location/:venueName" element={<Location />}></Route>
            <Route path="/showEvent" element={<ShowEvent />}></Route>
            <Route path="/showUserData" element={<ShowUserData />}></Route>
            <Route path="/*" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
