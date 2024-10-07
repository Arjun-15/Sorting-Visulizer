import React from "react";

const SortingController = ({
  stop,
  resetSteps,
  generate,
  previousSteps,
  start,
  nextSteps,
}) => {
  return (
    <>
      <div className="control-panel">
        <div className="control-buttons">
          <button className="controller" onClick={previousSteps}>
            {/* <PreviousIcon /> */}
            <img
              className="icon"
              src="https://cdn-icons-png.flaticon.com/128/318/318276.png"
              alt="previous step"
              title="go to previous step"
              lazy="true"
            />
          </button>

          {stop ? (
            <>
              <button className="controller" onClick={resetSteps}>
                {/* <restart /> */}
                <img
                  className="icon"
                  src="https://cdn-icons-png.flaticon.com/128/82/82004.png"
                  alt="reset steps"
                  title="auto play steps"
                  lazy="true"
                />
              </button>
              <button className="controller" onClick={generate}>
                {/* <Reset /> */}
                <img
                  className="icon"
                  src="https://cdn-icons-png.flaticon.com/128/2618/2618245.png"
                  alt="play steps"
                  title="generate new data"
                  lazy="true"
                />
              </button>
            </>
          ) : (
            <button className="controller" onClick={start}>
              {/* <PlayIcon /> */}
              <img
                className="icon"
                src="https://cdn-icons-png.flaticon.com/128/1055/1055007.png"
                alt="play steps"
                title="auto play steps"
                lazy="true"
              />
            </button>
          )}
          <button className="controller" onClick={nextSteps}>
            {/* <NextIcon /> */}
            <img
              className="icon"
              src="https://cdn-icons-png.flaticon.com/128/318/318275.png"
              alt="next steps"
              title="goto next steps"
              lazy="true"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default SortingController;
