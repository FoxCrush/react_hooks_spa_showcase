import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleButton } from 'react-bootstrap';
import { changeQueryString } from '../../redux/ramQuerySlice';
import debounce from 'lodash.debounce';

export default function RamFilterComponent() {
  const isFilterVisible = useSelector(
    state => state.optionVisibilityControl.isFilterVisible
  );
  const dispatch = useDispatch();

  const [statRadioValue, setStatRadioValue] = useState('All');
  const [characterQueryParams, setCharacterQueryParams] = useState({
    name: '',
    gender: [],
    status: '',
  });
  const [characterQueryString, setCharacterQueryString] = useState('');

  const statusesRadioArray = ['Alive', 'Dead', 'Unknown', 'All'];

  useEffect(() => {
    setCharacterQueryString('');
    if (Object.values(characterQueryParams).some(param => param.length > 0)) {
      setCharacterQueryString('?');
      for (const queryOptionName in characterQueryParams) {
        if (characterQueryParams[queryOptionName].length > 0) {
          setCharacterQueryString(prevString =>
            prevString.concat(
              `${queryOptionName}=${characterQueryParams[queryOptionName]}&`
            )
          );
        }
      }
    }
  }, [characterQueryParams]);

  useEffect(() => {
    dispatch(changeQueryString(characterQueryString)); //redux

    if (characterQueryString) {
      console.log('first');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterQueryString]);

  const rawStringQueryFormating = query => String(query).toLowerCase();
  const genderFormating = query => {
    if (characterQueryParams.gender.includes(query)) {
      const newQ = characterQueryParams.gender.filter(
        gender => gender !== query
      );
      setCharacterQueryParams(prevParams => ({
        ...prevParams,
        gender: newQ,
      }));
      return;
    }
    setCharacterQueryParams(prevParams => ({
      ...prevParams,
      gender: [...prevParams.gender, query],
    }));
  };

  const formChangeHandler = event => {
    switch (event.target.name) {
      case 'name':
        setCharacterQueryParams(prevParams => ({
          ...prevParams,
          name: rawStringQueryFormating(event.target.value),
        }));

        break;
      case 'male':
      case 'female':
      case 'genderless':
      case 'unknown':
        genderFormating(event.target.name);
        break;

      case 'Alive':
      case 'Dead':
      case 'Unknown':
        setCharacterQueryParams(prevParams => ({
          ...prevParams,
          status: rawStringQueryFormating(event.target.value),
        }));
        break;
      case 'All':
        setCharacterQueryParams(prevParams => ({
          ...prevParams,
          status: '',
        }));
        break;

      default:
        break;
    }
  };

  const radioBtnHandler = value => {
    setStatRadioValue(value);
  };

  if (!isFilterVisible) {
    return;
  } else {
    return (
      <Form
        onChange={e => {
          formChangeHandler(e);
        }}
      >
        <Row>
          <Col>
            <Form.Control name="name" placeholder="By name" />
          </Col>
          <Col>
            <div key="inline-checkbox" className="mb-3">
              <Form.Check
                inline
                label="Male"
                name="male"
                type="checkbox"
                id="inline-checkbox-1"
              />
              <Form.Check
                inline
                label="Female"
                name="female"
                type="checkbox"
                id="inline-checkbox-2"
              />
              <Form.Check
                inline
                label="Genderless"
                name="genderless"
                type="checkbox"
                id="inline-checkbox-3"
              />
              <Form.Check
                inline
                label="Unknown"
                name="unknown"
                type="checkbox"
                id="inline-checkbox-4"
              />
            </div>
          </Col>
          <Col>
            <DropdownButton
              as={ButtonGroup}
              key="Primary"
              id={`dropdown-variants-$'Primary'`}
              variant="primary"
              title={
                characterQueryParams.status
                  ? characterQueryParams.status
                  : 'Status'
              }
            >
              <ButtonGroup>
                {statusesRadioArray.map((status, index) => (
                  <ToggleButton
                    key={index}
                    id={`radio-${index}`}
                    type="radio"
                    name={`${status}`}
                    value={status}
                    onChange={e => radioBtnHandler(e.currentTarget.value)}
                    checked={statRadioValue === status}
                  >
                    {status}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </DropdownButton>
          </Col>
        </Row>
      </Form>
    );
  }
}
