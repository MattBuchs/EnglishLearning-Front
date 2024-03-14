import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAPI from "../hook/useAPI";
import "./AnimCard.css";

export default function Card({ cardKey, url, token }) {
    const navigate = useNavigate();
    const cardsRef = useRef([]);
    const { get, error } = useAPI();
    const { isAuthenticated } = useSelector((state) => state.user);
    const [cards, setCards] = useState(null);

    function updateRefs(element, index) {
        if (element && !cardsRef.current[index]) {
            cardsRef.current[index] = element;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await get(url, token);

            if (result.error) {
                if (
                    result.status === 403 ||
                    result.status === 401 ||
                    !isAuthenticated
                )
                    return navigate("/signin");

                setCards(null);
            }
            return setCards(result.cards);
        };
        fetchData();
    }, [cardKey]);

    function adjustFontSize(text) {
        const textLength = text.length;
        let fontSize = "2rem";

        // Ajuste la taille de la police en fonction de la longueur de la phrase
        if (textLength > 10) {
            fontSize = "1.8rem";
        } else if (textLength > 20) {
            fontSize = "1.6rem";
        } else if (textLength > 30) {
            fontSize = "1.4rem";
        } else if (textLength > 40) {
            fontSize = "1.2rem";
        }

        return fontSize;
    }

    return (
        <>
            {cards && (
                <section className="section-card">
                    <div className="pt-10">
                        <button
                            onClick={() =>
                                cardsRef.current.map((el) =>
                                    el.classList.remove("active")
                                )
                            }
                            className="bg-blue-600 text-white px-4 py-1 rounded shadow mr-1 hover:bg-blue-700"
                        >
                            Anglais
                        </button>
                        <button
                            onClick={() =>
                                cardsRef.current.map((el) =>
                                    el.classList.add("active")
                                )
                            }
                            className="bg-blue-600 text-white px-4 py-1 rounded shadow hover:bg-blue-700"
                        >
                            Français
                        </button>
                    </div>
                    <div className="card-container">
                        {cards &&
                            cards.map((card, index) => (
                                <div
                                    key={index}
                                    ref={(element) =>
                                        updateRefs(element, index)
                                    }
                                    className="card-wrapper"
                                    onClick={(e) =>
                                        e.currentTarget.classList.toggle(
                                            "active"
                                        )
                                    }
                                >
                                    <div className="card">
                                        <div
                                            className="card-front"
                                            style={{
                                                fontSize: adjustFontSize(
                                                    card.sentence
                                                ),
                                            }}
                                        >
                                            <p>{card.sentence}</p>
                                        </div>
                                        <div
                                            className="card-back"
                                            style={{
                                                fontSize: adjustFontSize(
                                                    card.translation
                                                ),
                                            }}
                                        >
                                            <p>{card.translation}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            )}

            {error && <p className="text-red-600">{error}</p>}
        </>
    );
}
