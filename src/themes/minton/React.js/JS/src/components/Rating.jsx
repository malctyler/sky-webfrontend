import classNames from "classnames";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
/**
 * Rating
 */
const Rating = props => {
  const rating = Math.floor(props.value || 0);
  const emptyStars = Math.floor(rating < 5 ? 5 - rating : 0);
  const Tag = props.tag;
  return <>
      <Tag className={classNames("text-muted", "font-16", "me-3", props.className)} id="rating-container">
        {[...Array(rating)].map((_x, i) => <OverlayTrigger key={i} placement="right" overlay={<Tooltip id="button-tooltip">{props.value || 0}</Tooltip>}>
            <span className="text-warning mdi mdi-star"></span>
          </OverlayTrigger>)}
        {[...Array(emptyStars)].map((_x, i) => <OverlayTrigger key={i} placement="right" overlay={<Tooltip id="button-tooltip">{props.value || 0}</Tooltip>}>
            <span className="mdi mdi-star"></span>
          </OverlayTrigger>)}
      </Tag>
    </>;
};
Rating.defaultProps = {
  tag: "p"
};
export default Rating;