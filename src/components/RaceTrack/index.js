import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import Modal from "react-modal";
import Table from "../Table";
import { Link } from "react-router-dom";
import { LeftArrow, Restart } from "../../icons/icons";

let colors = [
  "#9853f5",
  "#a81037",
  "#0628dd",
  "#4ffa0e",
  "#0be0f5",
  "#f3f40a",
  "#b71ac8",
  "#4b300a",
  "#502989",
  "#34718d",
];

const customStyles = {
  content: {
    width: "800px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
let i = 0;

const RaceTrack = () => {
  const [min, setMin] = useState(2);
  const [sec, setSec] = useState(12);
  const [timeEnd, setTimeEnd] = useState(false);
  const playersData = useSelector((state) => state.table.tableData);
  const [winners, setWinners] = useState(playersData);

  useEffect(() => {
    let uniqueId = setInterval(() => {
      if (min === 0 && sec === 0) {
        clearInterval(uniqueId);
        setTimeEnd(true);
      } else if (sec === 0) {
        setMin((prev) => prev - 1);
        setSec(59);
      } else {
        setSec((prev) => prev - 1);
      }
    }, 1000);

    setWinners((prev) => [...prev].sort((a, b) => b.speed - a.speed));
    return () => {
      clearInterval(uniqueId);
    };
  }, [min, sec]);

  const ModalCont = () => {
    return (
      <Modal
        isOpen={timeEnd}
        onRequestClose={() => setTimeEnd(false)}
        contentLabel="Time End"
        style={customStyles}
      >
        <div className="d-flex flex-column justify-content-center align-items-center score-bg ">
          <h2>Score Board</h2>
          <Table tabledata={winners.slice(0, 3)} timeEnd={timeEnd} />
          <div className="d-flex justify-content-center">
            <Link to="/">
              <button className="home">
                <LeftArrow size={20} /> <strong>Back to home</strong>
              </button>
            </Link>
            <button
              onClick={() => {
                setTimeEnd(false);
                setMin(3);
                setSec(0);
              }}
              className="restart-game"
            >
              Restart Game <Restart />
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  const getTrack = (n) => {
    const size = 500 + n * 110;
    const height = 200 + n * 100;
    const bg = `track-color badge-pill`;

    const commonStyles =
      "rounded-pill common d-flex justify-content-center align-items-center";

    if (playersData.length >= i) {
      i += 1;
    }
    if (n === 0) {
      return (
        <div
          className={`inner-ground ${commonStyles}  flex-column parent`}
          style={{
            width: "500px",
            height: "200px",
          }}
        >
          <div
            className="person"
            style={{
              left: `${30}px`,
              top: "-30px",
              backgroundColor: colors[0],
              animation: `orbit 5s linear infinite";`,
            }}
          >
            <div className="rounded-full h-6 w-6 p-1 text-sm">
              <span className="p-3 name-span" style={{ color: colors[0] }}>
                {playersData[0]?.name}
              </span>
            </div>
          </div>
          <div className=" badge-pill d-flex  flex-column justify-content-center align-items-center">
            <h5 className="p-0 m-0">Elapsed Time</h5>
            <div className="d-flex justify-content-center align-items-center">
              <button
                className="clickbutton m-2"
                onClick={() => setMin((prev) => prev + 1)}
              >
                +
              </button>
              <h1 className="">{`${min}:${sec}`}</h1>
              <button
                className="clickbutton m-2"
                onClick={() => {
                  if (min > 0) {
                    setMin((prev) => prev - 1);
                  }
                }}
              >
                -
              </button>
            </div>
          </div>
          <h4>Track length 400m</h4>
        </div>
      );
    }

    return (
      <div
        className={`${bg} ${commonStyles} parent`}
        style={{ width: `${size}px`, height: `${height}px` }}
      >
        <div
          className="grids"
          style={{
            left: `${500}px`,
            height: `${53}px`,
          }}
        >
          <p></p>
        </div>
        {getTrack(n - 1)}
        {n !== playersData.length && (
          <div
            className="person"
            style={{
              left: `${100 * n}px`,
              backgroundColor: colors[n],
              // animation: "orbit 5s linear infinite",
            }}
          >
            <div className="rounded-full h-6 w-6 p-1 text-sm">
              <span className="p-3 name-span" style={{ color: colors[n] }}>
                {playersData[n]?.name}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center main-play-ground">
        <div className="mt-3">{getTrack(playersData.length)}</div>
      </div>
      {ModalCont()}
    </>
  );
};

export default RaceTrack;
