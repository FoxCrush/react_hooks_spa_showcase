import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useSelector } from 'react-redux'
import { ToggleButton } from 'react-bootstrap';
// import { toggleOptionButton } from '../../redux/ramReducer'

export default function RamFilterComponent() {
    const isFilterVisible = useSelector((state) => state.optionVisibilityControl.isFilterVisible);

    const [statRadioValue, setStatRadioValue] = useState('1');

    const statusesRadioArray = [
        { name: 'Alive'},
        { name: 'Dead'},
        { name: 'Unknown'},
      ];

    if (!isFilterVisible) {
        return
    } else { return (
        <Form>
        <Row>
          <Col>
            <Form.Control placeholder="By name" />
          </Col>
          <Col>
          <div key='inline-checkbox' className="mb-3">
            <Form.Check
              inline
              label="Male"
              // name="group1"
              type='checkbox'
              id='inline-checkbox-1'
            />
            <Form.Check
              inline
              label="Female"
              // name="group1"
              type='checkbox'
              id='inline-checkbox-2'
            />
            <Form.Check
              inline
              label="Genderless"
              type='checkbox'
              id='inline-checkbox-3'
            />
           <Form.Check
              inline
              label="Unknown"
              // name="group1"
              type='checkbox'
              id='inline-checkbox-4'
            />
          </div>
          </Col>
          <Col>
          <DropdownButton
              as={ButtonGroup}
              key='Primary'
              id={`dropdown-variants-$'Primary'`}
              variant='primary'
              title='Status'
            >
 <ButtonGroup>
        {statusesRadioArray.map((status, index) => (
          <ToggleButton
            key={index}
            id={`radio-${index}`}
            type="radio"
            name="radio"
            value={status.name}
            checked={statRadioValue === status.name}
            onChange={(e) => setStatRadioValue(e.currentTarget.value)}
          >
            {status.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
            </DropdownButton></Col>
        </Row>
      </Form>
    )

    }

}
