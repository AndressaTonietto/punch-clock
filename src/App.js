import React from 'react';

import TimeBank from 'components/TimeBank';
import Form from 'components/SaveRecordForm';
import RecordsTable from 'components/RecordsTable';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TimeBank />
        <Form />
        <RecordsTable />
      </header>
    </div>
  );
}

export default App;
