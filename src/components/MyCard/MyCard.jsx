import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkToken } from "../../features/user";
import Card from "./Card";
import useAPI from "../hook/useAPI";

export default function MyCard() {
    const dispatch = useDispatch();
    const { get, post } = useAPI();
    const [cardKey, setCardKey] = useState(Date.now());
    const [categories, setCategories] = useState(null);
    const [card, setCard] = useState({
        sentence: "",
        translation: "",
        isPublic: false,
        categoryId: "",
    });

    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch]);

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await get("categories", null);

            if (!result) return;

            setCategories(result.categories);
        };
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        setCard({
            ...card,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post("card", card, localStorage.getItem("user"));
        setCardKey(Date.now());
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="card-sentence">Sentence : </label>
                    <input
                        type="text"
                        id="card-sentence"
                        name="sentence"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="card-translation">Translation : </label>
                    <input
                        type="text"
                        id="card-translation"
                        name="translation"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <p>Do you want the card to be public or private : </p>
                    <label htmlFor="card-private">Private</label>
                    <input
                        type="radio"
                        name="isPublic"
                        id="card-private"
                        value={false}
                        onChange={handleChange}
                        defaultChecked
                    />
                    <label htmlFor="card-public">Public</label>
                    <input
                        type="radio"
                        name="isPublic"
                        id="card-public"
                        onChange={handleChange}
                        value={true}
                    />
                </div>
                <select name="categoryId" onChange={handleChange}>
                    <option value="">Choose category</option>
                    {categories &&
                        categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                </select>
                <button
                    className="block bg-blue-600 px-4 py-1 text-white rounded"
                    type="submit"
                >
                    Send
                </button>
            </form>
            <Card
                cardKey={cardKey}
                url={"card"}
                token={localStorage.getItem("user")}
            />
        </div>
    );
}
