import classNames from "classnames";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

//interface
import { NotificationItem } from "../../layouts/Topbar";

// components
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";



// notifiaction continer styles
const notificationContainerStyle = {
  maxHeight: "230px",
  display: "none",
};

const notificationShowContainerStyle = {
  maxHeight: "230px",
};

interface NotificationDropdownProps {
  notifications: Array<NotificationItem>;
}

interface NotificationContainerStyle {
  maxHeight?: string;
  display?: string;
}

const NotificationDropdown = (props: NotificationDropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [notificationContentStyle, setNotificationContentStyles] =
    useState<NotificationContainerStyle>(notificationContainerStyle);

  /*
   * toggle notification-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setNotificationContentStyles(
      notificationContentStyle === notificationContainerStyle
        ? notificationShowContainerStyle
        : notificationContainerStyle
    );
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-notification"
        as="a"
        onClick={toggleDropdown}
        className={classNames("nav-link", "waves-effect", "waves-light", {
          show: dropdownOpen,
        })}
      >
        <i className="fe-bell noti-icon"></i>
        <span className="badge bg-danger rounded-circle noti-icon-badge">
          5
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu align='end' className="dropdown-lg">
        <div onClick={toggleDropdown}>
          <div className="dropdown-item noti-title">
            <h5 className="m-0">
              <span className="float-end">
                <Link to="" className="text-dark">
                  <small>Clear All</small>
                </Link>
              </span>
              Notification
            </h5>
          </div>
          <SimpleBar style={notificationContentStyle}>
            {(props["notifications"] || []).map((item, i) => {
              return (
                <Link
                  to=""
                  className="dropdown-item notify-item"
                  key={i + "-noti"}
                >
                  {item.avatar ? (
                    <>
                      <div className="notify-icon">
                        <img
                          src={item.avatar}
                          alt=""
                          className="img-fluid rounded-circle"
                          height={36}
                          width={36}
                        />
                      </div>
                      <p className="notify-details">{item.text}</p>
                      <p className="text-muted mb-0 user-msg">
                        <small>{item.subText}</small>
                      </p>
                    </>
                  ) : (
                    <>
                      <div className={`notify-icon bg-${item.bgColor}`}>
                        <i className={item.icon}></i>
                      </div>
                      <p className="notify-details">
                        {item.text}{" "}
                        <small className="text-muted">{item.subText}</small>
                      </p>
                    </>
                  )}
                </Link>
              );
            })}
          </SimpleBar>

          <Link
            to="/"
            className="dropdown-item text-center text-primary notify-item notify-all"
          >
            View All <i className="fe-arrow-right"></i>
          </Link>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;
