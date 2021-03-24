import React from 'react';
import styled from 'styled-components';

const StyledTimeBank = styled.div``;

const TimeBank = ({ timeBank, overtime }) => (
  <StyledTimeBank overTime={overtime}>
    Your time bank: <span>{timeBank}</span>
  </StyledTimeBank>
);

export default TimeBank;
