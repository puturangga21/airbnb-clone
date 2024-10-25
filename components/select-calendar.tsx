'use client';

import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { eachDayOfInterval } from 'date-fns';

const SelectCalendar = ({
  reservation,
}: {
  reservation: { startDate: Date; endDate: Date }[] | undefined;
}) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  let disabledDates: Date[] = [];

  reservation?.forEach((reservation) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate),
    });

    disabledDates = [...disabledDates, ...dateRange];
  });

  return (
    <>
      <input
        type='hidden'
        name='startDate'
        value={state[0].startDate.toISOString()}
      />
      <input
        type='hidden'
        name='endDate'
        value={state[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date(Date())}
        showDateDisplay={false}
        rangeColors={['#ff5a5f']}
        ranges={state}
        onChange={(item) => setState([item.selection] as never)}
        minDate={new Date()}
        direction='horizontal'
        disabledDates={disabledDates}
      />
    </>
  );
};

export default SelectCalendar;
