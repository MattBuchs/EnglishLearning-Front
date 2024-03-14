import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../hook/useAPI";
import { decodeToken } from "../../utils/token";

export default function UserProfile() {
    const navigate = useNavigate();
    const { username } = useParams();
    const { get, error } = useAPI();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userProfile = async () => {
            const token = localStorage.getItem("user");

            if (!token) return navigate("/signin");

            const tokenDecoded = decodeToken(token);
            const result = await get(`user/${username}`, token);

            if (!result.error) {
                if (tokenDecoded.userId === result.user.id)
                    return navigate("/my-profile");

                setUser(result.user);
            }
        };
        userProfile();
    }, [username]);

    return (
        <div>
            {user && (
                <div>
                    <p>
                        Username : <span>{user.username}</span>
                    </p>
                    <p>
                        email : <span>{user.email}</span>
                    </p>
                    <p>
                        isAdmin : <span>{user.is_admin.toString()}</span>
                    </p>
                </div>
            )}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
}
