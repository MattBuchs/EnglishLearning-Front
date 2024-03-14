import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../features/user";

export default function MyProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.user);

    dispatch(checkToken());

    useEffect(() => {
        console.log(isAuthenticated);
        if (!isAuthenticated) navigate("/signin");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return <div>Profile</div>;
}
