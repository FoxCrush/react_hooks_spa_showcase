import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FloatingLabel, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilterParams } from '../../redux/ramQuerySlice';
import debounce from 'lodash.debounce';
import { useMemo, useCallback } from 'react';
import { setLoading } from '../../redux/ramBtnSlice';

const statusesRadioArray = ['All', 'Alive', 'Dead', 'Unknown'];
const genderRadioArray = ['All', 'Male', 'Female', 'Genderless', 'Unknown'];

export default function RamFilterComponent() {
  const isFilterVisible = useSelector(
    state => state.optionVisibilityControl.isFilterVisible
  );
  const dispatch = useDispatch();

  const [characterQueryParams, setCharacterQueryParams] = useState({});

  const rawStringQueryFormating = query => {
    if (query === 'all') {
      return '';
    }
    return String(query).toLowerCase();
  };

  const formChangeHandler = useCallback(event => {
    setCharacterQueryParams(prevState => {
      return {
        ...prevState,
        [event.target.name]: rawStringQueryFormating(event.target.value),
      };
    });
  }, []);
  const initialFormChangeHandler = event => {
    dispatch(setLoading(true));
    dbFormChangeHandler(event);
  };

  const dbFormChangeHandler = useMemo(() => {
    // dispatch(setLoading(true));
    console.log('setting loading');
    return debounce(formChangeHandler, 1000);
  }, [formChangeHandler]);

  useEffect(() => {
    console.log('debounce cancellation');
    return () => {
      dbFormChangeHandler.cancel();
    };
  }, [dbFormChangeHandler]);

  useEffect(() => {
    dispatch(changeFilterParams(characterQueryParams));
  }, [characterQueryParams, dispatch]);

  if (!isFilterVisible) {
    return;
  } else {
    return (
      <FormGroup onChange={initialFormChangeHandler}>
        <Row>
          <Col>
            <FloatingLabel label="Filter by name">
              <Form.Control autoComplete="off" name="name" placeholder="name" />
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
