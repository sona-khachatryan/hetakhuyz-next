'use client';

import React, {createContext, useState} from 'react';

export const CalendarDateContext = createContext([]);
function CalendarContext({children}) {
    const [calendarDate, setCalendarDate] = useState([]);

    return (
        <CalendarDateContext.Provider value={[calendarDate, setCalendarDate]}>
            {children}
        </CalendarDateContext.Provider>
    );
}

export default CalendarContext;