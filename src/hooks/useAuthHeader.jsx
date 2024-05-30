const useAuthHeader = () => {
	const authHeader = {
		authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	};
	return [authHeader];
};

export default useAuthHeader