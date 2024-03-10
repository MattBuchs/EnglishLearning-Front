import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../hook/useAPI";
import { decodeToken } from "../../utils/token";

export default function Signin({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const { error, setError, data, isComplete, post } = useAPI();

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            label: "Your email : ",
            for: "signin-email",
        },
        {
            id: 2,
            name: "password",
            type: "password",
            label: "Your password : ",
            for: "signin-password",
        },
    ];

    const [userInfos, setUserInfos] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setError(null);
        const { name, value } = e.target;

        setUserInfos((prevState) => ({
            ...prevState,
            [name]: value.trim(),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post("signin", userInfos);
    };

    useEffect(() => {
        if (isComplete) {
            localStorage.setItem("user", data.token);

            const token = localStorage.getItem("user");
            setIsAuthenticated(decodeToken(token));

            navigate("/");
        }
    }, [isComplete, data, navigate, setIsAuthenticated]);

    return (
        <section className="bg-blue-50 min-h-full">
            <form onSubmit={(e) => handleSubmit(e)} className="pl-10 pt-2">
                {inputs.map((obj) => (
                    <div key={obj.id} className="py-2">
                        <label htmlFor={obj.for}>{obj.label}</label>
                        <input
                            type={obj.type}
                            id={obj.for}
                            name={obj.name}
                            onChange={(e) => handleChange(e)}
                            className="border"
                        />
                    </div>
                ))}
                {error && <div className="text-red-600">{error}</div>}
                <button
                    type="submit"
                    className="bg-blue-600 text-slate-100 px-4 pb-1 rounded"
                >
                    register
                </button>
            </form>
        </section>
    );
}
