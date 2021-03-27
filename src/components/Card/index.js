import React from 'react';
import styled from 'styled-components';

const NeumorphismCard = styled.div`
  border-radius: 0px;
  background: #a18ca1;
  box-shadow: -5px 5px 9px #917e91, 5px -5px 9px #b19ab1;
  display: flex;
  color: #00122e;
  flex-direction: ${({ flexDirection }) =>
    (flexDirection === 'row' && 'row') || 'column'};

  margin: 0 20px 30px 20px;
  @media (min-width: 600px) {
    display: flex;
    align-items: center;
    min-width: 500px;
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
