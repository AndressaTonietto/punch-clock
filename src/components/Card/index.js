import React from 'react';
import styled from 'styled-components';

const NeumorphismCard = styled.div`
  border-radius: 4px;
  background: #e0e0e0;
  box-shadow: 6px 6px 12px #5a5a5a, -6px -6px 12px #ffffff;
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
