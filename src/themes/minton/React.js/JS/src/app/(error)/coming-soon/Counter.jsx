import Countdown from "react-countdown";
const Counter = () => {
  // custom renderer with completed condition
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed
  }) => {
    if (completed) {
      // Render a completed state
      return <h3>Coming Soon</h3>;
    } else {
      // Render a countdown
      return <>
            <div className="counter-number">
              <div className="coming-box" suppressHydrationWarning>
                {days}
                <span>Days</span>
              </div>
              <div className="coming-box" suppressHydrationWarning>
                {hours}
                <span>Hours</span>
              </div>
              <div className="coming-box" suppressHydrationWarning>
                {minutes}
                <span>Minutes</span>
              </div>
              <div className="coming-box" suppressHydrationWarning>
                {seconds}
                <span>Seconds</span>
              </div>
            </div>
          </>;
    }
  };
  return <Countdown date={Date.parse("2025/12/17")} renderer={renderer} className="counter-number" />;
};
export default Counter;