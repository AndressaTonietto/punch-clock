import React, { useState } from 'react';

import api from 'services/api';
import styled from 'styled-components';
import { GrDocumentTime } from 'react-icons/gr';

import { useStore } from 'store';
import { calculateTimeBank, convertToDate } from 'utils';
import differenceInMinutes from 'date-fns/differenceInMinutes';

import Card from 'components/Card';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 640px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  input,
  button {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    background: none;
    border: none;
    :focus {
      outline: none;
    }
    border-radius: 0px;
    background: #a18ca1;
    box-shadow: inset -5px 5px 9px #917e91, inset 5px -5px 9px #b19ab1;

    /* Firefox */
    input[type='number'] {
      -moz-appearance: textfield;
    }

    padding: 10px 5px;
    .no-outline:focus {
      outline: none;
    }
    color: #00122e;
  }
`;

const Input = styled.input`
  width: 85px;
  height: 20px;
  margin: 0 15px;
  flex: 1;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  margin: 18px 15px 0 15px;
  align-self: flex-end;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (min-width: 640px) {
    display: flex;
    flex-direction: column;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 18px;
`;

const Label = styled.label`
  flex: 1;
`;

const RecordForm = () => {
  const addRecord = useStore(state => state.addRecord);
  const updateTimeBank = useStore(state => state.updateTimeBank);

  const [error, setError] = useState();

  const [punchIn, setPunchIn] = useState();
  const [punchOut, setPunchOut] = useState();
  const [breakDuration, setBreakDuration] = useState();

  const timePassed = () => {
    const start = convertToDate(punchIn);
    const end = convertToDate(punchOut);

    return differenceInMinutes(end, start);
  };

  function validate() {
    setError('');

    if (!punchIn || !punchOut || !breakDuration) {
      setError('All fields are required');
      return false;
    }
    if (punchIn > punchOut) {
      setError('Punch Out cannot be greater than Punch In');
      return false;
    }
    if (timePassed() < breakDuration) {
      setError('Break cannot be greater than the total time passed');
      return false;
    }

    return true;
  }

  function clearInputs() {
    setPunchIn('');
    setPunchOut('');
    setBreakDuration('');
  }

  const createNewRecord = async event => {
    event.preventDefault();

    if (validate())
      try {
        const url = 'records';
        const body = {
          punchIn,
          breakDuration,
          punchOut,
        };

        const res = await api.post(url, body);

        addRecord(res.data);
        updateTimeBank(calculateTimeBank(res.data));
        clearInputs();
      } catch (e) {
        console.log(e);
      }
  };

  return (
    <Card flexDirection="column">
      <Form onSubmit={e => createNewRecord(e)}>
        <FormGroup>
          <Label htmlFor="punchIn">Punch In</Label>
          <Input
            type="time"
            id="punchIn"
            value={punchIn}
            onChange={e => setPunchIn(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="punchIn">Punch Out</Label>
          <Input
            type="time"
            id="punchOut"
            value={punchOut}
            onChange={e => setPunchOut(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="punchIn">Break</Label>
          <Input
            type="number"
            id="breakDuration"
            value={breakDuration}
            onChange={e => setBreakDuration(e.target.value)}
            min={1}
          />
        </FormGroup>
        <Button type="submit">
          <GrDocumentTime />
        </Button>
      </Form>
      <ErrorMessage>{error}</ErrorMessage>
    </Card>
  );
};

export default RecordForm;
