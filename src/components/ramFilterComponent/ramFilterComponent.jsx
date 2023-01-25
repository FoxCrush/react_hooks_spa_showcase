import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleButton } from 'react-bootstrap';
import { changeQueryString } from '../../redux/ramQuerySlice';
// import debounce from 'lodash.debounce';

export default function RamFilterComponent() {
  const isFilterVisible = useSelector(
    state => state.optionVisibilityControl.isFilterVisible
  );
  const dispatch = useDispatch();

  const [statRadioValue, setStatRadioValue] = useState('All');
  const [characterQueryParams, setCharacterQueryParams] = useState({
    name: '',
    gender: '',
    status: '',
  });
  // const [characterQueryString, setCharacterQueryString] = useState('');

  const statusesRadioArray = ['Alive', 'Dead', 'Unknown', 'All'];
  const genderRadioArray = ['Male', 'Female', 'Genderless', 'Unknown', 'All'];

  // useEffect(() => {
  //   setCharacterQueryString('');
  //   if (Object.values(characterQueryParams).some(param => param.length > 0)) {
  //     setCharacterQueryString('?');
  //     for (const queryOptionName in characterQueryParams) {
  //       if (characterQueryParams[queryOptionName].length > 0) {
  //         setCharacterQueryString(prevString =>
  //           prevString.concat(
  //             `${queryOptionName}=${characterQueryParams[queryOptionName]}&`
  //           )
  //         );
  //       }
  //     }
  //   }
  // },[characterQueryParams]);

  // useEffect(() => {
  //   dispatch(changeQueryString(characterQueryString)); //redux

  //   if (characterQueryString) {
  //     console.log('first');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [characterQueryString]);

  const rawStringQueryFormating = query => String(query).toLowerCase();

  const formChangeHandler = event => {
    console.log('eventHandler', event.currentTarget.name);
    // switch (event.target.name) {
    //   case 'name':
    //     setCharacterQueryParams(prevParams => ({
    //       ...prevParams,
    //       name: rawStringQueryFormating(event.target.value),
    //     }));
    //     break;

    //   default:
    // }
  };

  // const radioBtnHandler = value => {
  //   console.log('value', value.currentTarget);
  //   setStatRadioValue(value);
  // };

  if (!isFilterVisible) {
    return;
  } else {
    return (
      <Form>
        <Row onChange={formChangeHandler}>
          <Col>
            <Form.Control name="name" placeholder="By name" />
          </Col>
          <Col>
            <DropdownButton
              as={ButtonGroup}
              // key="Primary"
              // id={`ram-filter`}
              // variant="primary"
              title={
                characterQueryParams.gender
                  ? characterQueryParams.gender
                  : 'Gender'
              }
            >
              <ButtonGroup>
                {genderRadioArray.map((gender, index) => (
                  <ToggleButton
                    key={index}
                    // id={`radio-${index}g`}
                    type="radio"
                    name={`gender-${gender}`}
                    value={gender}
                    // onChange={formChangeHandler}
                    // checked={statRadioValue === gender}
                  >
                    {gender}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </DropdownButton>
          </Col>
          <Col>
            <DropdownButton
              as={ButtonGroup}
              // key="Primary"
              // id={`dropdown-variants-$'Primary'-status`}
              // variant="primary"
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
                    // id={`radio-${index}s`}
                    type="radio"
                    name={`${status}`}
                    value={status}
                    // onChange={formChangeHandler}
                    // checked={statRadioValue === status}
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
