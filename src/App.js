import React from 'react';

import TimeBank from 'components/TimeBank';
import SaveRecordForm from 'components/SaveRecordForm';
import Records from 'components/Records';

import styled from 'styled-components';
import './App.css';

const Container = styled.div`
  background-color: #e0e0e0;
  min-height: 100vh;
  padding: 50px;

  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

function App() {
  return (
    <Container>
      <TimeBank />
      <SaveRecordForm />
      <Records />
    </Container>
  );
}

export default App;
