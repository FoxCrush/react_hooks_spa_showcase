import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

export default function RamCharacterView() {
  const { id } = useParams();
  console.log('params', id);

  return (
    <Fragment>
      <h3>Rick and morty character view</h3>
      <p>Character with ID: {id}</p>
    </Fragment>
  );
}
