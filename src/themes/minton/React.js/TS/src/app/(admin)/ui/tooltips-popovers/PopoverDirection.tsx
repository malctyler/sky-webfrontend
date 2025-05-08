
import { Button, OverlayProps, OverlayTrigger, Popover } from "react-bootstrap";

interface DirectionsType {
  placement: OverlayProps["placement"];
}
const PopoverDirection = () => {
  const directions: DirectionsType[] = [
    { placement: "top" },
    { placement: "bottom" },
    { placement: "right" },
    { placement: "left" },
  ];

  const popover = (
    <Popover id="popover-direction">
      <Popover.Body>
        And here&apos;s some amazing content. It&apos;s very engaging. Right?
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <h4 className="header-title">Popovers</h4>
      <p className="sub-header">
        Add small overlays of content, like those on the iPad, to any element
        for housing secondary information.
      </p>

      <div className="button-list">
        {(directions || []).map((item) => (
          <OverlayTrigger
            trigger="click"
            key={item.placement}
            placement={item.placement}
            overlay={
              <Popover id={`popover-positioned-${item.placement}`}>
                <Popover.Body>
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
                </Popover.Body>
              </Popover>
            }
          >
            <Button variant="light" className="me-1">
              Popover on {item.placement}
            </Button>
          </OverlayTrigger>
        ))}

        <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
          <Button>Dismissible popover</Button>
        </OverlayTrigger>
      </div>
    </>
  );
};

export default PopoverDirection