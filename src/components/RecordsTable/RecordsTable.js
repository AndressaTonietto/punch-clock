/* eslint-disable no-unused-vars */
import React from 'react';

import { format } from 'date-fns';
import { calculateTimeBank } from 'utils';

const RecordsTable = ({ records }) => (
  <table>
    <caption>Last week punches</caption>
    <thead>
      <tr>
        <th>Date</th>
        <th>Arriving hour</th>
        <th>Exit hour</th>
        <th>Break Duration</th>
        <th>Time bank (min)</th>
      </tr>
    </thead>
    <tbody>
      {records.slice(0, 7).map(entry => (
        <tr>
          <td>{format(new Date(entry?.createdAt), 'MM/dd/yyyy')}</td>
          <td>{entry?.punchIn}</td>
          <td>{entry?.punchOut}</td>
          <td>{entry?.breakDuration}</td>
          <td>{calculateTimeBank(entry)} min</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RecordsTable;
