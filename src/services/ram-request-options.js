import axios from 'axios';

const ramCharRequestBaseParams = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

let prevQString = '';
const reqAllCharByPage = (query = '', cancelSignal = null) => {
  if (prevQString !== query) {
    console.log('different request');
    prevQString = query;
    return ramCharRequestBaseParams.get(query, { signal: cancelSignal });
  }
  throw new Error('same request');
};

export { reqAllCharByPage };
