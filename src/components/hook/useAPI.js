import { useState } from "react";

export default function useAPI() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isComplete, setIsComplete] = useState(false);

    const callApi = async (url, method, body = null, token = null) => {
        setError(null);
        setLoading(true);

        let response;
        try {
            const headers = { "Content-Type": "application/json" };

            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null,
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error);
                throw new Error(result.error);
            }

            setError(null);
            setData(result);
            setIsComplete(true);

            return result;
        } catch (err) {
            console.log(err.message);
            setData(null);
            setIsComplete(false);
            setError(err.message);

            if (response && response.status >= 400 && response.status < 500)
                return { error: err.message, status: response.status };

            setError("An error has occured");
            return { error: "An error has occured", status: response.status };
        } finally {
            setLoading(false);
        }
    };

    const get = (url, token = null) => callApi(url, "get", null, token);
    const post = (url, body, token = null) => callApi(url, "post", body, token);
    // const patch = (url, body) => callApi(url, 'patch', body);
    // const del = (url) => callApi(url, 'delete');

    return { data, loading, error, setError, isComplete, post, get };
}
