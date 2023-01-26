import axios from 'axios';

const ramCharRequestBaseParams = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

let prevQString = '';
const reqAllCharByPage = (query = '', cancelSignal = null) => {
  prevQString = query;
  return ramCharRequestBaseParams.get(query, { signal: cancelSignal });
};

export { reqAllCharByPage };
