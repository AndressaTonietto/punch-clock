import React from 'react';
import styled from 'styled-components';

const StyledTimeBank = styled.div`
  color: #f4f4f9;
  font-size: 25px;
  padding: 20px;
  color: #00122e;
  display: flex;
  flex-direction: column;
  span {
    color: ${({ overtime }) => (overtime && '#069C57') || '#e94f37'};
  }
  p {
    font-size: 18px;
    margin-bottom: 0px;
  }
`;

const TimeBank = ({ timeBank, overtime }) => (
  <StyledTimeBank overtime={overtime}>
    <div>
      Your time bank:<span>{timeBank}</span>min
    </div>
    <p>(From the last 20 records)</p>
  </StyledTimeBank>
);

export default TimeBank;
