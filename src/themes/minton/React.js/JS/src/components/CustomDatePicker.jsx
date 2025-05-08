import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import classNames from "classnames";
/* Datepicker with Input */
const DatepickerInput = forwardRef((props, ref) => {
  const onDateValueChange = () => {
    console.log("date value changed");
  };
  return <input type="text" className={classNames("form-control", props.inputClass)} onClick={props.onClick} value={props.value} onChange={onDateValueChange} ref={ref} />;
});
DatepickerInput.displayName = 'DatepickerInput';

/* Datepicker with Addon Input */
const DatepickerInputWithAddon = forwardRef((props, ref) => <div className="input-group position-relative" ref={ref}>
    <input type="text" className={classNames("form-control", props.inputClass)} onClick={props.onClick} value={props.value} readOnly />
    <span className="input-group-text">
      <i className="ri-calendar-event-fill"></i>
    </span>
  </div>);
DatepickerInputWithAddon.displayName = "DatepickerInputWithAddon";
const CustomDatePicker = props => {
  // handle custom input
  const input = props.hideAddon || false ? <DatepickerInput inputClass={props.inputClass} /> : <DatepickerInputWithAddon inputClass={props.inputClass} />;
  return <>
      {/* date picker control */}
      <DatePicker calendarClassName={props.calendarClassName || "shadow"} startDate={props.startDate} endDate={props.endDate} selected={props.value} onChange={date => props.onChange(date)} customInput={input} timeIntervals={props.tI} showTimeSelect={props.showTimeSelect} timeFormat={props.timeFormat || "hh:mm a"} timeCaption={props.timeCaption} dateFormat={props.dateFormat || "MM/dd/yyyy"} minDate={props.minDate} maxDate={props.maxDate} monthsShown={props.monthsShown} showTimeSelectOnly={props.showTimeSelectOnly} inline={props.inline} autoComplete="off" />
    </>;
};
CustomDatePicker.displayName = 'CustomDatePicker';
export default CustomDatePicker;