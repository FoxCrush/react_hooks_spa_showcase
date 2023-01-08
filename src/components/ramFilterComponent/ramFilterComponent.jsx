import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useSelector } from 'react-redux';
import { ToggleButton } from 'react-bootstrap';
// import { toggleOptionButton } from '../../redux/ramReducer'

export default function RamFilterComponent() {
  const isFilterVisible = useSelector(
    state => state.optionVisibilityControl.isFilterVisible
  );

  const [statRadioValue, setStatRadioValue] = useState('All');
  const [characterQueryParams, setCharacterQueryParams] = useState({
    nameQuery: '',
    genderQuery: [],
    statusQuery: '',
  });

  const statusesRadioArray = [
    { name: 'Alive' },
    { name: 'Dead' },
    { name: 'Unknown' },
    { name: 'All' },
  ];

  useEffect(() => {
    console.log('useEffect', characterQueryParams);
  }, [characterQueryParams]);

  const rawStringQueryFormating = query => String(query).toLowerCase();
  const genderQueryFormating = query => {
    if (characterQueryParams.genderQuery.includes(query)) {
        return
    }
    setCharacterQueryParams(prevParams => ({
      ...prevParams,
      genderQuery: [...prevParams.genderQuery, query],
    }));
  };

  const formChangeHandler = event => {
    switch (event.target.name) {
      case 'name':
        setCharacterQueryParams(prevParams => ({
          ...prevParams,
          nameQuery: rawStringQueryFormating(event.target.value),
        }));

        break;
      case 'male':
      case 'female':
      case 'genderless':
      case 'unknown':
        genderQueryFormating(event.target.name)
        break;

      case 'Alive':
      case 'Dead':
      case 'Unknown':
      case 'All':
        setCharacterQueryParams(prevParams => ({
          ...prevParams,
          statusQuery: rawStringQueryFormating(event.target.value),
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
              title="Status"
            >
              <ButtonGroup>
                {statusesRadioArray.map((status, index) => (
                  <ToggleButton
                    key={index}
                    id={`radio-${index}`}
                    type="radio"
                    name={`${status.name}`}
                    value={status.name}
                    onChange={e => radioBtnHandler(e.currentTarget.value)}
                    checked={statRadioValue === status.name}
                  >
                    {status.name}
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
