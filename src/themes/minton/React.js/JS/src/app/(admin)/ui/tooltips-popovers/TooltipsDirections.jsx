import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
const TooltipDirection = () => {
  const directions = [{
    placement: "top"
  }, {
    placement: "bottom"
  }, {
    placement: "right"
  }, {
    placement: "left"
  }];
  return <>
      <h4 className="header-title">Tooltips</h4>
      <p className="sub-header">
        Four options are available: top, right, bottom, and left aligned.
      </p>

      <div className="button-list">
        {(directions || []).map(item => <OverlayTrigger key={item.placement} placement={item.placement} overlay={<Tooltip id={`tooltip-${item.placement}`}>
                Tooltip on <strong>{item.placement}</strong>.
              </Tooltip>}>
            <Button variant="light" className="me-1">
              Tooltip on {item.placement}
            </Button>
          </OverlayTrigger>)}
      </div>
    </>;
};
export default TooltipDirection;