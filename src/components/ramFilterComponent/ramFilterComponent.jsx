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
  const [optionString, setOptionString] = useState({
    nameQuery: '',
    genderQuery: '',
    statusQuery: '',
  });

  const statusesRadioArray = [
    { name: 'Alive' },
    { name: 'Dead' },
    { name: 'Unknown' },
    { name: 'All' },
  ];

  useEffect(() => {}, []);

  const formChangeHandler = event => {
    switch (event.target.name) {
      case 'name':
        setOptionString((prevString)=>({...prevString, nameQuery: `${event.target.value}`}))

        break;
      case 'gender-male':
        console.log(`${event.target.name}`);

        break;
      case 'gender-female':
        console.log(`${event.target.name}`);

        break;
      case 'gender-genderless':
        console.log(`${event.target.name}`);

        break;
      case 'gender-unknown':
        console.log(`${event.target.name}`);

        break;
      case 'Alive':
      case 'Dead':
      case 'Unknown':
      case 'All':
        console.log('radio', event.target.value);

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
                name="gender-male"
                type="checkbox"
                id="inline-checkbox-1"
              />
              <Form.Check
                inline
                label="Female"
                name="gender-female"
                type="checkbox"
                id="inline-checkbox-2"
              />
              <Form.Check
                inline
                label="Genderless"
                name="gender-genderless"
                type="checkbox"
                id="inline-checkbox-3"
              />
              <Form.Check
                inline
                label="Unknown"
                name="gender-unknown"
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
