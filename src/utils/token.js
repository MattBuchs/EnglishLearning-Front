import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
    if (token || token !== undefined) {
        try {
            const decoded = jwtDecode(token);
            const userData = {
                userId: decoded.userId,
                username: decoded.username,
                isAdmin: decoded.isAdmin,
            };
            return userData;
        } catch (error) {
            return null;
        }
    } else {
        return null;
    }
};
