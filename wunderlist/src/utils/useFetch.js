import {useState, useEffect} from 'react';

export default function useFetch({ api, method, url, data = null, config = null}) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [update, setUpdate] = useState(true); 

    const causeRerender = () => {
        setUpdate(!update)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                api[method](url, JSON.parse(config), JSON.parse(data))
                    .then(res => {
                        setResponse(res);
                        console.log(res);
                    })
                    .finally(() => {
                        setIsLoading(false)
                    });
            }
            catch (err) {
                setError(err)
            }
        };
        fetchData();
    }, [api, method, url, data, config, update]);

    return {response, error, isLoading, causeRerender}
}