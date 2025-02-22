import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value } from '../../types';



interface CalendarReactProps{
  value: Value;
  onChange: (value: Value) => void;
  disableDays?: ({date}: {date: Date}) => boolean
}


export function CalendarReact({value, onChange, disableDays}: CalendarReactProps) {

  return (
    <Calendar 
    className="rounded-md"
    tileDisabled={disableDays}
    value={value}
    onChange={onChange}
    />
  )
}
