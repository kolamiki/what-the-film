import "./Counter.css";

type CounterProps = {
  timer: number;
};

export function Counter({ timer }: CounterProps) {
  //***** RENDER FUNCTIONS *** */
  function render_counter() {
    return (
      <>
        {timer
          .toString()
          .split("")
          .map((digit) => {
            if (timer < 10) {
              return (
                <>
                  <div className="counter-block">{0}</div>
                  <div className="counter-block">{digit}</div>
                </>
              );
            } else {
              return <div className="counter-block">{digit}</div>;
            }
          })}
      </>
    );
  }
  return <div className="counter-position">Bonus:{render_counter()}</div>;
}
