import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Header/Nav";
import Home from "./components/Home/Home";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import NotFound from "./components/Error/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <main
                style={{
                    height: "calc(100vh - 4rem)",
                    minHeight: "calc(100vh - 4rem)",
                }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
