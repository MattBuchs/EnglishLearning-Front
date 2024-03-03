import { useState } from "react";

export default function Signup() {
    const [inputs, setInputs] = useState([
        {
            id: 1,
            name: "username",
            type: "text",
            label: "Your username : ",
            for: "signup-text",
            isError: false,
            messageError: "",
        },
        {
            id: 2,
            name: "email",
            type: "email",
            label: "Your email : ",
            for: "signup-email",
            isError: false,
            messageError: "",
        },
        {
            id: 3,
            name: "password",
            type: "password",
            label: "Your password : ",
            for: "signup-password",
            isError: false,
            messageError: "",
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            label: "confirm password : ",
            for: "signup-confirm_password",
            isError: false,
            messageError: "",
        },
    ]);

    const [userInfos, setUserInfos] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setUserInfos({
            ...userInfos,
            [e.target.name]: e.target.value,
        });

        console.log(userInfos);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(e);
    };

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
