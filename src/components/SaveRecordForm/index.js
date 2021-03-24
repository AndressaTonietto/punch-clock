import React, { useState } from 'react';
import styled from 'styled-components';

import { GrDocumentTime } from 'react-icons/gr';

import { calculateTimeBank, convertToDate } from 'utils';
import { useStore } from 'store';
import differenceInMinutes from 'date-fns/differenceInMinutes';

import api from 'services/api';

const StyledForm = styled.form``;
const StyledFormGroup = styled.div``;
const StyledLabel = styled.label``;
const StyledInput = styled.input``;
const Message = styled.div`
  margin-bottom: 0.5em;
  color: palevioletred;
  display: block;
`;
const StyledButton = styled.button``;

const Form = () => {
  // const records = useStore(state => state.records);
  const addRecord = useStore(state => state.addRecord);
  const updateTimeBank = useStore(state => state.updateTimeBank);

  const [errors, setErrors] = useState({});

  const [punchIn, setPunchIn] = useState();
  const [punchOut, setPunchOut] = useState();
  const [breakDuration, setBreakDuration] = useState();

  const timePassed = () => {
    const start = convertToDate(punchIn);
    const end = convertToDate(punchOut);

    return differenceInMinutes(end, start);
  };

  function validate() {
    const requiredFieldMessage = 'Required field';
    let isFormValid = true;
    setErrors({});

    if (!punchIn) {
      isFormValid = false;
      setErrors(old => ({ ...old, punchIn: requiredFieldMessage }));
    }
    if (!punchOut) {
      isFormValid = false;
      setErrors(old => ({ ...old, punchOut: requiredFieldMessage }));
    }
    if (!breakDuration) {
      isFormValid = false;
      setErrors(old => ({ ...old, breakDuration: requiredFieldMessage }));
    }
    if (punchIn && punchOut) {
      if (punchIn > punchOut) {
        isFormValid = false;
        setErrors(old => ({
          ...old,
          punchIn: 'End must be greater than start',
          punchOut: 'End must be greater than start',
        }));
      }
      if (timePassed() < breakDuration) {
        isFormValid = false;
        setErrors(old => ({
          ...old,
          breakDuration: 'Break cannot be greater than the total time passed',
        }));
      }
    }

    return isFormValid;
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
      } catch (er) {
        console.log(er);
      }
  };

  return (
    <StyledForm onSubmit={e => createNewRecord(e)}>
      <StyledFormGroup>
        <StyledLabel>Punch In</StyledLabel>
        <StyledInput
          type="time"
          id="punchIn"
          value={punchIn}
          onChange={e => setPunchIn(e.target.value)}
          error
        />
        <Message>{errors.punchIn}</Message>
      </StyledFormGroup>
      <StyledFormGroup>
        <StyledLabel>Punch Out</StyledLabel>
        <StyledInput
          type="time"
          id="punchOut"
          value={punchOut}
          onChange={e => setPunchOut(e.target.value)}
        />
        <Message>{errors.punchOut}</Message>
      </StyledFormGroup>
      <StyledFormGroup>
        <StyledLabel>Break Duration</StyledLabel>
        <StyledInput
          tye="number"
          id="breakDuration"
          value={breakDuration}
          onChange={e => setBreakDuration(e.target.value)}
        />
        <Message>{errors.breakDuration}</Message>
      </StyledFormGroup>
      <StyledButton type="submit">
        <GrDocumentTime />
      </StyledButton>
    </StyledForm>
  );
};

export default Form;
