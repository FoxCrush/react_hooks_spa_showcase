import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import logo from './logo.svg';
import styles from './Main.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Main() {
  return (
    <Fragment>
      <Navbar bg="primary" variant="dark" style={{ position: 'relative' }}>
        <Container>
          <Navbar.Brand href="#/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#/rickandmorty">Rick and Morty API</Nav.Link>
            <Nav.Link href="#Error">Error</Nav.Link>
          </Nav>
          <img src={logo} className={styles.AppLogo} alt="logo" />
        </Container>
      </Navbar>
      <div id="detail">
        <Outlet />
      </div>
    </Fragment>
  );
}
