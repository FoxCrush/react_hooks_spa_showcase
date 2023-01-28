import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ramCharRequestInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character',
});
const controller = new AbortController();

export default function RamCharacterView() {
  const params = useParams();
  const [character, setCharacter] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    ramCharRequestInstance
      .get(`${params.id}`)
      .then(({ data }) => {
        setCharacter(data);
      })
      .catch(error => setError(error));

    return () => controller.abort;
  }, [params.id]);

  const { id, name, image, status, species } = character;

  if (error) {
    return <h2>{`HTTP Request error message: ${error.message}`}</h2>;
  } else {
    return (
      <Fragment>
        <h3>{name}</h3>

        <img style={{ minHeight: 300 }} src={image} alt={`${name}'s iamge`} />
        <p>Character ID: {id}</p>
        <p>Character Status: {status}</p>
        <p>Character's Species: {species}</p>
        <Link to={`/rickandmorty`}>Back to List</Link>
      </Fragment>
    );
  }
}
