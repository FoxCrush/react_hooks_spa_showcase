import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingLabel, FormGroup } from 'react-bootstrap';
import { changeFilterParams } from '../../redux/ramQuerySlice';
import debounce from 'lodash.debounce';

const statusesRadioArray = ['All', 'Alive', 'Dead', 'Unknown'];
const genderRadioArray = ['All', 'Male', 'Female', 'Genderless', 'Unknown'];

export default function RamFilterComponent() {
  const isFilterVisible = useSelector(
    state => state.optionVisibilityControl.isFilterVisible
  );
  const dispatch = useDispatch();

  const [characterQueryParams, setCharacterQueryParams] = useState({
    name: '',
    gender: '',
    status: '',
  });

  const rawStringQueryFormating = query => String(query).toLowerCase();

  const formChangeHandler = debounce(event => {
    setCharacterQueryParams(prevState => {
      return {
        ...prevState,
        [event.target.name]: rawStringQueryFormating(event.target.value),
      };
    });
  }, 1000);

  useEffect(() => {
    console.log(characterQueryParams);
    dispatch(changeFilterParams(characterQueryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterQueryParams]);

  if (!isFilterVisible) {
    return;
  } else {
    return (
      <FormGroup onChange={formChangeHandler}>
        <Row>
          <Col>
            <FloatingLabel label="Filter by name">
              <Form.Control name="name" placeholder="name" />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Gender">
              <Form.Select name="gender" aria-label="Gender selection">
                {genderRadioArray.map((gender, index) => (
                  <option key={index} value={gender.toLowerCase()}>
                    {gender}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Status">
              <Form.Select name="status" aria-label="Gender selection">
                {statusesRadioArray.map((status, index) => (
                  <option key={index} value={status.toLowerCase()}>
                    {status}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
      </FormGroup>
    );
  }
}
