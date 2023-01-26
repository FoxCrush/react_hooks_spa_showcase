import axios from 'axios';

const ramCharRequestBaseParams = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

const reqAllCharByPage = (page = 1, cancelSignal = null) => {
  // prevQString = page;
  return ramCharRequestBaseParams.get(`character/?page=${page}`, {
    signal: cancelSignal,
  });
};

const reqCharactersByFilter = (
  page = 1,
  { name, gender, status },
  cancelSignal = null
) => {
  // prevQString = page;
  return ramCharRequestBaseParams.get(`character/?page=${page}`, {
    params: {
      ...(name && { name: name }),
      ...(gender && { gender: gender }),
      ...(status && { status: status }),
    },
    signal: cancelSignal,
  });
};

export { reqAllCharByPage, reqCharactersByFilter };
