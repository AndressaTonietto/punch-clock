import React from 'react';
import Card from 'components/Card';

import styled from 'styled-components';

const Table = styled.table`
  text-align: center;
  padding: 20px 10px;
`;

const Records = ({ records }) => (
  <>
    {records.length > 0 && (
      <Card flexDirection="column">
        <Table>
          <tr>
            <th>Date</th>
            <th>Punch In</th>
            <th>Punch Out</th>
            <th>Break (min)</th>
            <th>Time Bank (min)</th>
          </tr>
          {records.map(record => (
            <tr>
              <td>{record.date}</td>
              <td>{record.punchIn}</td>
              <td>{record.punchOut}</td>
              <td>{record.breakDuration}</td>
              <td>{record.timeBank}</td>
            </tr>
          ))}
        </Table>
      </Card>
    )}
  </>
);

export default Records;