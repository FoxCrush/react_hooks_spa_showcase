import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RamCharacterView() {
  const params = useParams();
  const [character, setCharacter] = useState({});
  const [error, setError] = useState(null);

  const ramCharRequestInstance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/character',
  });
  const controller = new AbortController();

  useEffect(() => {
    ramCharRequestInstance
      .get(`${params.id}`)
      .then(({ data }) => {
        setCharacter(data);
      })
      .catch(error => setError(error));
    console.log('character', character);
    return () => controller.abort;
  }, []);

  const { id, name } = character;

  return (
    <Fragment>
      {/* {charId ?? console.log('no charID')} */}
      <h3>Rick and morty character view</h3>
      <p>Character with ID: {id}</p>
      <p>Character with Name: {name}</p>
    </Fragment>
  );
}
