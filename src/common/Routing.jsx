import { BrowserRouter, Routes, Route } from "react-router-dom";
import Instructions from "../views/Instructions/instructions";
import LandingPage from "../views/LandingPage/landingPage";
import AboutUs from "../views/Aboutus/aboutus";
import Register from "../views/Session/register";
import Login from "../views/Session/login";
import Game from "../game/Game";
import WaitRoom from "../game/WaitRoom";
import Navbar from "../components/Navbar";
import Temporizador from "../components/Temporizador";
import CardDisplay from "../game/CardDisplay";
import Join from "../views/Search/join";
import Code from "../views/Search/code";
import EnterCode from "../views/Search/enterCode";
import Authorization from "../views/Authorization/authorization";
import Admin from "../views/Admin/admin";
import Endpoints from "../test/endpoints";
import Renta from "../test/pagarRenta";
import Impuesto from "../test/pagarImpuesto";
import ComprarPropiedad from "../test/comprarPropiedad";
import ComprarCasas from "../test/comprarCasa";
import Ranking from "../views/Ranking/ranking"; 

function Routing() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
        <Routes>
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/game/:idPartida" element={<Game />} />
            <Route path="waitingRoom/:idPartida" element={<WaitRoom />} />
            <Route path="/join" element={<Join />} />
            <Route path="/code" element={<Code />} />
            <Route path="/enterCode" element={<EnterCode />} />
            <Route path="/unauthorized" element={<Authorization />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/endpoints" element={<Endpoints />} />
            <Route path="/pagarRenta" element={<Renta />} />
            <Route path="/pagarImpuesto" element={<Impuesto />} />
            <Route path="/comprarPropiedad" element={<ComprarPropiedad />} />
            <Route path="/comprarCasas" element={<ComprarCasas />} />
            <Route path="/ranking" element={<Ranking />} />



        </Routes>
    </BrowserRouter>
    </>
    )
}

export default Routing;