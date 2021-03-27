import React, { useEffect } from 'react';

import api from 'services/api';
import { useStore } from 'store';
import { format } from 'date-fns';
import { calculateTimeBank } from 'utils';

import Records from 'components/Records/Records';

const sevenDays = 7;

const RecordsContainer = () => {
  const records = useStore(state => state.timeRecords);
  const setRecords = useStore(state => state.setRecords);

  const getRecords = async () => {
    try {
      const res = await api.get(
        `records?_sort=id&_order=desc&_start=0&_end=${sevenDays}`
      );
      setRecords(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <Records
      records={records.slice(0, sevenDays).map(record => ({
        date: format(new Date(record?.createdAt), 'MM/dd/yyyy'),
        punchIn: record.punchIn,
        punchOut: record.punchOut,
        breakDuration: record.breakDuration,
        timeBank: calculateTimeBank(record),
      }))}
    />
  );
};

export default RecordsContainer;
