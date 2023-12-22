import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../reduxtoolkit/Reducer/tableslice";
import "./index.css";
import Table from "../Table";
import { Link } from "react-router-dom";
import { RightArrow } from "../../icons/icons";

const Participants = () => {
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState();
  const [startTime, setStartTime] = useState();

  const tabledata = useSelector((state) => state.table.tableData);

  const dispatch = useDispatch();

  const addPlayer = () => {
    if (tabledata.length < 10) {
      console.log("add player clicked");
      const player = { name, speed, startTime, endTime: "-" };
      dispatch(addUser(player));
    }
  };

  const runnerDetails = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center w-50 runner-bg mt-5 m-3  col-md-3">
        <h2 className="">RUNNER DETAILS</h2>
        <p>* you can add max 10 Participants</p>
        <div className="mb-3">
          <label>
            <strong>Name</strong>
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>
            <strong>Speed</strong>
          </label>
          <input
            type="number"
            className="form-control"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>
            <strong>Start Time</strong>
          </label>
          <input
            type="number"
            className="form-control"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <button onClick={addPlayer} className="add-player">
          + ADD RUNNER
        </button>
      </div>
    );
  };

  return (
    <div className="d-flex main-bg">
      {runnerDetails()}
      <div className="list-bg m-2 mt-5 col-md-8 mb-5 p-3">
        <h2 className="p-1">LIST OF PARTICIPANTS</h2>
        <Table tabledata={tabledata} />
        <div className="d-flex justify-content-end m-3">
          <Link to="/racetrack">
            <button className="race-button mb-1">
              start Race <RightArrow />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Participants;
