/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import api from 'services/api';
import { useStore } from 'store';
import RecordsTable from './RecordsTable';

const RecordsTableContainer = () => {
  const records = useStore(state => state.timeRecords);
  const setRecords = useStore(state => state.setRecords);

  const getRecords = async () => {
    try {
      const res = await api.get('records?_sort=id&_order=desc&_start=0&_end=7');
      setRecords(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  return <RecordsTable records={records} />;
};

export default RecordsTableContainer;
