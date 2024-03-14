import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAPI from "../hook/useAPI";
import { getToken } from "../../features/user";

export default function Signin() {
    const dispatch = useDispatch();
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
            dispatch(getToken(data.token));
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isComplete]);

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
