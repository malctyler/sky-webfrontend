import useCalendar from "./useCalendar";
import SidePanel from "@/app/(admin)/apps/calendar/SidePanel";
import Calendar from "@/app/(admin)/apps/calendar/Calendar";
import AddEditEvent from "@/app/(admin)/apps/calendar/AddEditEvent";
import { Col } from "react-bootstrap";
const CalendarPage = () => {
  const {
    createNewEvent,
    onDateClick,
    onEventClick,
    onDrop,
    onEventDrop,
    events,
    show,
    onCloseModal,
    isEditable,
    eventData,
    onUpdateEvent,
    onRemoveEvent,
    onAddEvent
  } = useCalendar();
  return <>
            <Col xl={3}>
                <SidePanel createNewEvent={createNewEvent} />
            </Col>
            <Col xl={9}>
                <Calendar events={events} onDateClick={onDateClick} onDrop={onDrop} onEventClick={onEventClick} onEventDrop={onEventDrop} />
            </Col>
            <AddEditEvent eventData={eventData} isEditable={isEditable} onAddEvent={onAddEvent} onRemoveEvent={onRemoveEvent} onUpdateEvent={onUpdateEvent} open={show} toggle={onCloseModal} />
        </>;
};
export default CalendarPage;