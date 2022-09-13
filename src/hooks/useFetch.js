import axios from 'axios';
import { useEffect, useState } from 'react';

function useFetch(url) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setData(null);
		setError(null);
		const source = axios.CancelToken.source();
		axios
			.get(url, { cancelToken: source.token })
			.then(res => {
				setLoading(false);
				//checking for multiple responses for more flexibility
				//with the url we send in.
				setData(res.data);
				setError(null);
			})
			.catch(err => {
				setLoading(false);
				if(err?.message==='canceled') return;
				setError(
					err?.response?.data?.message ??
						'Something went wrong. Make sure you are entering a valid zip code and try again',
				);
			});
		return () => {
			source.cancel();
		};
	}, [url]);

	return { data, loading, error };
}
export default useFetch;
