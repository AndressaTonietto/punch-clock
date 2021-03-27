import React from 'react';
import styled from 'styled-components';

const StyledTimeBank = styled.div`
  color: #f4f4f9;
  font-size: calc(20px + 2vmin);
  padding: 20px;
  color: #00122e;

  span {
    color: ${({ overtime }) => (overtime && '#069C57') || '#e94f37'};
  }
`;

const TimeBank = ({ timeBank, overtime }) => (
  <StyledTimeBank overtime={overtime}>
    Your time bank: <span>{timeBank}</span> min
  </StyledTimeBank>
);

export default TimeBank;
