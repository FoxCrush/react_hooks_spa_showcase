import axios from 'axios';

const ramCharRequestBaseParams = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

const reqAllCharByPage = (page = 1, cancelSignal = null) => {
  return ramCharRequestBaseParams.get(`character/?page=${page}`, {
    signal: cancelSignal,
  });
};

const reqCharactersByFilter = (page = 1, params, cancelSignal = null) => {
  return ramCharRequestBaseParams.get(`character/?page=${page}`, {
    params,
    signal: cancelSignal,
  });
};

export { reqAllCharByPage, reqCharactersByFilter };
