import React from "react";
import { FaCrown } from "react-icons/fa6";
import { GiPlainCircle } from "react-icons/gi";
import "./index.css";
let images = [
  <FaCrown color="#f78907" size={20} />,
  <GiPlainCircle color="#af2a06" size={15} />,
  <GiPlainCircle color="#514e4e" size={15} />,
];
let ranks = ["1st", "2nd", "3rd"];
let tableHead = ["Name", "Speed", "Start Time", "End Time"];
const Table = ({ tabledata, timeEnd }) => {
  let addKey = tabledata;
  if (timeEnd) {
    tableHead = ["Position", "Name", "Speed", "Start Time", "End Time"];
    addKey = tabledata.map((e) => ({
      ...e,
      endTime: Number((400 / e.speed + parseInt(e.startTime)).toFixed(2)),
    }));
  } else {
    tableHead = ["Name", "Speed", "Start Time", "End Time"];
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {tableHead.map((e) => (
              <th className="col-4">{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {addKey.map((e, i) => (
            <tr className=" row-bg mb-3 col-3" key={i}>
              {timeEnd && (
                <td className="m-3 p-2">
                  {images[i]}
                  {ranks[i]}
                </td>
              )}
              <td className="p-1">{e.name}</td>
              <td className="">{e.speed} KM/H</td>
              <td className=""> {e.startTime}</td>
              <td className="">{e.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </>
  );
};

export default Table;
