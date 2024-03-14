import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Header/Nav";
import Home from "./components/Home/Home";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import MyCard from "./components/MyCard/MyCard";
import MyProfile from "./components/Profile/MyProfile";
import UserProfile from "./components/Profile/UserProfile";
import NotFound from "./components/Error/NotFound";
import { checkToken } from "./features/user";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch]);

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
                    <Route path="/card" element={<MyCard />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/user/:username" element={<UserProfile />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
