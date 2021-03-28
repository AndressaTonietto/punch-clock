import React from 'react';
import styled from 'styled-components';

const NeumorphismCard = styled.div`
  border-radius: 0px;
  background: #e0e0e0;
  box-shadow: 5px 5px 9px #cacaca, -5px -5px 9px #f6f6f6;
  color: #00122e;
  flex-direction: ${({ flexDirection }) =>
    (flexDirection === 'row' && 'row') || 'column'};

  margin-bottom: 30px;
  @media (min-width: 600px) {
    display: flex;
    align-items: center;
    min-width: 600px;
    flex-direction: ${({ flexDirection }) =>
      (flexDirection === 'row' && 'row') || 'column'};
  }

  min-height: 77px;
  padding: 20px 10px;
  span {
    flex-grow: 1;
    padding: 0px 10px;
  }
`;

const Card = ({ flexDirection, children }) => (
  <NeumorphismCard flexDirection={flexDirection}>{children}</NeumorphismCard>
);

export default Card;
