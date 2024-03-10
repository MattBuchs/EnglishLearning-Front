import { useState } from "react";

export default function useAPI() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isComplete, setIsComplete] = useState(false);

    const callApi = async (url, method, body = null) => {
        setError(null);
        setLoading(true);

        let response;
        try {
            response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error);
                throw new Error(result.error);
            }

            setError(null);
            setData(result);
            setIsComplete(true);

            return data;
        } catch (err) {
            setData(null);
            setIsComplete(false);

            if (response && (response.status >= 400 || response.status < 500))
                return { error: err.message };

            return { error: "An error has occured" };
        } finally {
            setLoading(false);
        }
    };

    // const get = (url, objectKey) => callApi(url, 'get', null, objectKey);
    const post = (url, body) => callApi(url, "post", body);
    // const patch = (url, body) => callApi(url, 'patch', body);
    // const del = (url) => callApi(url, 'delete');

    return { data, loading, error, setError, isComplete, post };
}
