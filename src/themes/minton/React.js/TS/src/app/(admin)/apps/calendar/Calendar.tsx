
import { useViewport } from "@/hooks";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { EventClickArg, EventDropArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg, DropArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

type CalendarProps = {
    onDateClick: (arg: DateClickArg) => void;
    onEventClick: (arg: EventClickArg) => void;
    onDrop: (arg: any) => void
    onEventDrop: (arg: EventDropArg) => void;
    events: EventInput[]
}

const Calendar = ({onDateClick, onEventClick, onDrop, onEventDrop, events}: CalendarProps) => {

    const {height} = useViewport()

    /*
     * handle calendar methods
     */
    const handleDateClick = (arg: DateClickArg) => {
        onDateClick(arg);
    };
    const handleEventClick = (arg: EventClickArg) => {
        onEventClick(arg);
    };
    const handleDrop = (arg: DropArg) => {
        onDrop(arg);
    };
    const handleEventDrop = (arg: EventDropArg) => {
        onEventDrop(arg);
    };

    return (
        <>
            {/* full calendar control */}
            <div id="calendar">
                <FullCalendar
                    initialView="dayGridMonth"
                    plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                        timeGridPlugin,
                        listPlugin,
                        bootstrapPlugin,
                    ]}
                    themeSystem="bootstrap"
                    bootstrapFontAwesome={false}
                    handleWindowResize={true}
                    slotDuration="00:15:00"
                    slotMinTime="08:00:00"
                    slotMaxTime="19:00:00"
                    buttonText={{
                        today: "Today",
                        month: "Month",
                        week: "Week",
                        day: "Day",
                        list: "List",
                        prev: "Prev",
                        next: "Next",
                    }}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                    }}
                    height={height - 200}
                    dayMaxEventRows={1}
                    editable={true}
                    selectable={true}
                    droppable={true}
                    events={events}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    drop={handleDrop}
                    eventDrop={handleEventDrop}
                />
            </div>
        </>
    );
};

export default Calendar;
