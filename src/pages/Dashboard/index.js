import React, { useState, useMemo, useEffect } from 'react';
import {
    format,
    subDays,
    addDays,
    setHours,
    setMinutes,
    setSeconds,
    isBefore,
    isEqual,
    parseISO,
    setMilliseconds,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '../../services/api';
import { Container, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
export default function Dashboard() {
    const [schedule, setSchedule] = useState([]);

    const [date, setDate] = useState(new Date());

    const dateFormated = useMemo(
        () => format(date, "d 'de' MMMM", { locale: pt }),
        [date]
    );

    useEffect(() => {
        async function loadSchedule() {
            const response = await api.get('/schedules', {
                params: {
                    date,
                },
            });
            const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
            const data = range.map(hour => {
                const checkDate = setMilliseconds(
                    setSeconds(setMinutes(setHours(date, hour), 0), 0),
                    0
                );
                const compareDate = utcToZonedTime(checkDate, timeZone);
                return {
                    time: `${hour}:00h`,
                    past: isBefore(compareDate, new Date()),
                    appointment: response.data.find(a =>
                        isEqual(parseISO(a.date), compareDate)
                    ),
                };
            });
            setSchedule(data);
        }

        loadSchedule();
    }, [date]);
    function handlePrevDay() {
        setDate(subDays(date, 1));
    }

    function handleNextDay() {
        setDate(addDays(date, 1));
    }
    return (
        <Container>
            <header>
                <button onClick={handlePrevDay} type="button">
                    <MdChevronLeft color="#fff" size={36} />
                </button>
                <strong>{dateFormated}</strong>
                <button onClick={handleNextDay} type="button">
                    <MdChevronRight color="#fff" size={36} />
                </button>
            </header>
            <ul>
                {schedule.map(time => (
                    <Time
                        key={time.time}
                        past={time.past}
                        available={!time.appointment}
                    >
                        <strong>{time.time}</strong>
                        <span>
                            {time.appointment
                                ? time.appointment.user.name
                                : 'Em aberto'}
                        </span>
                    </Time>
                ))}
            </ul>
        </Container>
    );
}
