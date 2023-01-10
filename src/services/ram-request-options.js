import axios from 'axios';

const ramCharRequestBaseParams = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

const reqAllCharByPage = (query = '', cancelSignal = null) =>
  ramCharRequestBaseParams.get(query, { signal: cancelSignal });

export { reqAllCharByPage };
