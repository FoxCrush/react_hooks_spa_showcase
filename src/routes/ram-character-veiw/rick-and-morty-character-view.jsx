import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { toggleButtonVisibility, setLoading } from '../../redux/ramBtnSlice';
import MutatingLoader from '../../components/loader';

const ramCharRequestInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character',
});
const controller = new AbortController();

export default function RamCharacterView() {
  const params = useParams();
  const [character, setCharacter] = useState({});
  const [error, setError] = useState(null);
  const loading = useSelector(state => state.optionVisibilityControl.isLoading);

  useEffect(() => {
    ramCharRequestInstance
      .get(`${params.id}`)
      .then(({ data }) => {
        setCharacter(data);
      })
      .catch(error => setError(error))
      .finally();

    return () => controller.abort;
  }, [params.id]);

  const { id, name, image, status, species } = character;

  if (loading) {
    return <MutatingLoader />;
  } else {
    return (
      <Fragment>
        <Card style={{ width: '18rem', margin: '24px 24px' }}>
          <Card.Img variant="top" src={image} style={{ minHeight: 300 }} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>Status: {status}</Card.Text>
            <Card.Text>Species: {species}</Card.Text>
            <Card.Text>ID: {id}</Card.Text>

            <Link to={`/rickandmorty`}>
              <Button variant="primary">Back to List</Button>
            </Link>
          </Card.Body>
        </Card>
      </Fragment>
    );
  }
}
