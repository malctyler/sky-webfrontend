import { Button } from "react-bootstrap";
const SidePanel = ({
  createNewEvent
}) => {
  // external events
  const externalEvents = [{
    id: 1,
    className: "bg-success",
    title: "New Theme Release"
  }, {
    id: 2,
    className: "bg-info",
    title: "My Event"
  }, {
    id: 3,
    className: "bg-warning",
    title: "Meet manager"
  }, {
    id: 4,
    className: "bg-danger",
    title: "Create New theme"
  }];
  return <>
            <Button size="lg" variant="primary" className="font-16 w-100" id="btn-new-event" onClick={createNewEvent}>
                <i className="mdi mdi-plus-circle-outline"></i> Create New
                Event
            </Button>

            <div id="external-events">
                <br />
                <p className="text-muted">
                    Drag and drop your event or click in the calendar
                </p>
                {/* external events */}
                {(externalEvents || []).map((event, index) => {
        return <div key={index} className={`external-event ${event.className}`} title={event.title} data-class={event.className}>
                            <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle"></i>
                            {event.title}
                        </div>;
      })}
            </div>

            <div className="mt-5 d-none d-xl-block">
                <h5 className="text-center">How It Works ?</h5>

                <ul className="ps-3">
                    <li className="text-muted mb-3">
                        It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                    </li>
                    <li className="text-muted mb-3">
                        Richard McClintock, a Latin professor at Hampden-Sydney College in
                        Virginia, looked up one of the more obscure Latin words,
                        consectetur, from a Lorem Ipsum passage.
                    </li>
                    <li className="text-muted mb-3">
                        It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                    </li>
                </ul>
            </div>
        </>;
};
export default SidePanel;