import { useGlobal } from "../contexts/GlobalProvider";
import NotFound from "../pages/NotFound";
import Loading from "./Loading";
import { useEffect, useState } from "react";

const ClassesTimeTable = () => {
  const { trainingClasses, loading, errors, fetchTrainingClasses } =
    useGlobal();

  useEffect(() => {
    if (trainingClasses?.length === 0) {
      fetchTrainingClasses();
    }
  }, []);

  const [dailyTimes, setDailyTimes] = useState([
    { startTime: "08:00", endTime: "10:00" },
    { startTime: "10:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "18:00" },
  ]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    if (trainingClasses) {
      const updatedTimes = [...dailyTimes];
      trainingClasses.forEach((item) => {
        item.schedule.forEach((sched) => {
          updatedTimes.forEach((time, index) => {
            if (
              sched.start_time >= time.startTime &&
              sched.end_time <= time.endTime
            ) {
              updatedTimes[index] = {
                ...updatedTimes[index],
                [sched.day]: {
                  id: item?.id,
                  trainerName: item.trainer?.name,
                  name: item.name,
                },
              };
            }
          });
        });
      });
      setDailyTimes(updatedTimes);
    }
  }, [trainingClasses]); // Runs when `trainingClasses` changes

  if (loading.trainingClasses) return <Loading index={true} />;
  if (errors?.trainingClasses) return <NotFound />;

  return (
    <section className="class-timetable-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title">
              <span>Find Your Time</span>
              <h2>Find Your Time</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="table-controls">
              <ul>
                <li className="active" data-tsfilter="all">
                  All events
                </li>
                {trainingClasses.map((trClass) => (
                  <li
                    key={trClass.id}
                    data-tsfilter={trClass.id}
                    className={`text-capitalize`}
                  >
                    {trClass.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="class-timetable">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    {days.map((day, index) => (
                      <th key={index}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dailyTimes.map((row, id) => (
                    <tr key={id}>
                      <td className="class-time">
                        {row.startTime} - {row.endTime}
                      </td>
                      {days.map((day, dayId) =>
                        row[day] ? (
                          <td
                            key={dayId}
                            className={`${
                              (dayId + id) % 2 === 0 ? "dark-bg" : ""
                            } hover-bg ts-meta`}
                            data-tsmeta={row[day]?.id}
                          >
                            <h5>{row[day].name}</h5>
                            <span>{row[day].trainerName}</span>
                          </td>
                        ) : (
                          <td className="blank-td" key={dayId}></td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassesTimeTable;
