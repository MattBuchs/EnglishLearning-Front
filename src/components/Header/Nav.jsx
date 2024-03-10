import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Nav({ isAuthenticated, setIsAuthenticated }) {
    const navigate = useNavigate();
    const [isDisconnected, setIsDisconnected] = useState(false);
    const menu = isAuthenticated
        ? [
              {
                  id: 1,
                  path: "/",
                  name: "Home",
              },
              {
                  id: 2,
                  path: "/profile",
                  name: "Profile",
              },
              {
                  id: 3,
                  path: "/signout",
                  name: "Sign out",
              },
          ]
        : [
              {
                  id: 1,
                  path: "/",
                  name: "Home",
              },
              {
                  id: 2,
                  path: "/signin",
                  name: "Sign in",
              },
              {
                  id: 3,
                  path: "/signup",
                  name: "Sign up",
              },
          ];

    const logout = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(null);
        setIsDisconnected(true);
    };

    useEffect(() => {
        if (isDisconnected) {
            setIsDisconnected(false);
            navigate("/");
        }
    }, [navigate, isDisconnected]);

    return (
        <header className="flex justify-between items-center px-6 text-lg h-16 bg-slate-400 border-b border-slate-500 shadow">
            <h1 className="text-xl font-semibold">EnglishLearning</h1>

            <nav>
                <ul className="flex">
                    {menu.map((obj) => (
                        <li key={obj.id} className="mr-1 last-of-type:mr-0">
                            <NavLink
                                to={obj.path}
                                onClick={() =>
                                    obj.path === "/signout" && logout()
                                }
                                className={({ isActive }) =>
                                    `${
                                        isActive &&
                                        "bg-blue-400 font-semibold rounded-md text-slate-100"
                                    } px-3 py-1`
                                }
                            >
                                {obj.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
