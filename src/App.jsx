import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Header/Nav";
import Home from "./components/Home/Home";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import NotFound from "./components/Error/NotFound";
import { decodeToken } from "./utils/token";

function App() {
    const token = localStorage.getItem("user");
    const tokenDecoded = decodeToken(token);
    const [isAuthenticated, setIsAuthenticated] = useState(tokenDecoded);

    return (
        <BrowserRouter>
            <Nav
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
            />
            <main
                style={{
                    height: "calc(100vh - 4rem)",
                    minHeight: "calc(100vh - 4rem)",
                }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/signin"
                        element={
                            <Signin
                                setIsAuthenticated={setIsAuthenticated}
                                token={token}
                            />
                        }
                    />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
