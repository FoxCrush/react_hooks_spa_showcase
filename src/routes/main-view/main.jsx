import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import logo from './logo.svg';
import styles from './Main.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilterVisibility, setLoading } from '../../redux/ramBtnSlice';
import MutatingLoader from '../../components/loader';

export default function Main() {
  const isOptionButtonVisible = useSelector(
    state => state.optionVisibilityControl.isButtonVisible
  );
  const isLoaderActive = useSelector(
    state => state.optionVisibilityControl.isLoading
  );

  const dispatch = useDispatch();

  const handleFilterButtonClick = () => {
    dispatch(toggleFilterVisibility());
  };
  const handleLoaderButtonClick = () => {
    dispatch(setLoading(!isLoaderActive));
  };

  return (
    <Fragment>
      <Navbar bg="primary" variant="dark" style={{ position: 'relative' }}>
        <Container>
          <Navbar.Brand href="#/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#/rickandmorty">Rick and Morty API</Nav.Link>
            <Nav.Link href="#Error">Error</Nav.Link>
            <Button
              variant="primary"
              onClick={handleFilterButtonClick}
              className={isOptionButtonVisible ? '' : 'disabled'}
            >
              Show filter
            </Button>
            <Button variant="primary" onClick={handleLoaderButtonClick}>
              Show loader
            </Button>
          </Nav>
          <img src={logo} className={styles.AppLogo} alt="logo" />
        </Container>
      </Navbar>
      <div id="detail">
        {isLoaderActive && <MutatingLoader />}
        <Outlet />
      </div>
    </Fragment>
  );
}
