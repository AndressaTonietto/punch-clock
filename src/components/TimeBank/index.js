import React, { useEffect } from 'react';
import { calculateTimeBank } from 'utils';
import { useStore } from 'store';
import api from 'services/api';
import Card from 'components/Card';
import TimeBank from './TimeBank';

const TimeBankContainer = () => {
  const timeBank = useStore(state => state.timeBank);
  const setTimeBank = useStore(state => state.setTimeBank);

  const getLastMonthRecords = async () => {
    try {
      const url = 'records?_sort=id&_order=desc&_start=0&_end=22';
      const res = await api.get(url);

      if (res.data.length) setTimeBank(calculateTimeBank(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLastMonthRecords();
  }, []);

  return (
    <Card>
      <TimeBank timeBank={timeBank} overtime={timeBank > 0} />
    </Card>
  );
};

export default TimeBankContainer;
