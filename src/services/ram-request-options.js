import axios from 'axios';

const ramCharRequestBaseParams = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

let cancelToken;
const fetchRAMCharacters = async (page = 1, params) => {
  if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel('Operation canceled due to new request.');
  }
  cancelToken = axios.CancelToken.source();
  try {
    const results = await ramCharRequestBaseParams.get(
      `character/?page=${page}`,
      {
        params,
        cancelToken: cancelToken.token,
      }
    );
    return results.data;
  } catch (error) {
    console.log(error.message);
  }
};

export { fetchRAMCharacters };
