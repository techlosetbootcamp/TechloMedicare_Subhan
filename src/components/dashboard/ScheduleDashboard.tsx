import { emailType } from "@/models/types";
import React, { Fragment, useState } from "react";
import {
  FaCircle,
  IoIosArrowDown,
  AiOutlineDelete,
  Person,
  FiEdit,
} from "@/constants/react-icons";
import useAppointment from "@/hooks/useAppointment";

const timeManagement = (time: string) => {
  const len = time.length;
  if (len <= 3) {
    return `${time}0`;
  }
  return time;
};
function timeDurationManage(time: string, duration: string): string {
  let [hours, minutes] = time.split(":").map(Number);
  const durationMinutes = parseInt(duration);
  let totalMinutes = minutes + durationMinutes;
  if (totalMinutes >= 60) {
    hours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
  }

  hours %= 24;

  return `${hours.toString().padStart(2, "0")}:${totalMinutes
    .toString()
    .padStart(2, "0")}`;
}

const ScheduleDashboard = ({ email }: emailType) => {
  const data = useAppointment(email);
  const [hoveredId, setHoveredId] = useState<string>("0");
  const [clickedId, setClickedId] = useState<string>("0");

  const handleShow = (id: string) => {
    if (clickedId === id) {
      setClickedId("0");
    }
    setClickedId(id);
  };

  return (
    <div className="flex items-end flex-col gap-3 mt-[20px] mx-3">
      {data.map((item) => (
        <Fragment key={item.id}>
          <div
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId("0")}
            className={`v_center justify-between pl-3 pr-1 border-[#e0e0e0] rounded-md w-[272px] h-[25px] ${
              hoveredId === item.id ? "border-2" : ""
            }`}
          >
            <div className="v_center">
              <p className="center gap-2 font-mukta relative top-1/2 font-bold text-[10px]">
                <FaCircle
                  size={6}
                  color="#27ae80"
                  className="relative bottom-1/2"
                />
                {timeManagement(item.time)}
              </p>
              <p className="ml-5 font-mukta font-normal text-xs">
                {item.patientName}
              </p>
            </div>
            <p
              className={`border-2 border-[#e0e0e0] rounded-md `}
              onClick={() => handleShow(item.id)}
            >
              <IoIosArrowDown
                size={12}
                className={`${hoveredId === item.id ? "" : "hidden"}`}
              />
            </p>
          </div>
          {clickedId === item.id && (
            <>
              <div className="w-[273px] h-[121px] border-2 relative border-[#e0e0e0]">
                <div className="flex font-mukta mx-[11.7px]  items-center">
                  <p className="font-semibold text-[10.79px] text-[#1d1d1d] mt-[7.85px]">
                    Patient
                  </p>
                  <p className="text-[10.79px] text-[#1d1d1d] absolute left-[75px] mt-[7.85px]">
                    {item.patientName}
                  </p>
                </div>
                <div className="flex font-mukta mx-[11.7px]  items-center">
                  <p className="font-semibold text-[10.79px] text-[#1d1d1d] mt-[7.85px]">
                    Time
                  </p>
                  <p className="text-[10.79px] text-[#1d1d1d] absolute left-[75px] mt-[7.85px]">
                    {timeManagement(item.time) +
                      " - " +
                      timeDurationManage(item.time, item.duration)}
                  </p>
                </div>
                <div className="flex font-mukta mx-[11.7px]  items-center">
                  <p className="font-semibold text-[10.79px] text-[#1d1d1d] mt-[7.85px]">
                    Purpose
                  </p>
                  <p className="text-[10.79px] text-[#1d1d1d] absolute left-[75px] mt-[7.85px]">
                    {item.purpose}
                  </p>
                </div>
                <div className="border-[1px]  border-[#e0e0e0] w-[270px]  absolute top-[84.33px]" />

                <div className="v_center  absolute top-[92px] justify-around">
                  <div className="flex gap-3 ml-[11.7px]">
                    <p className="h-[17.6px] w-[17.61px] border-[1px] border-[#e0e0e0] rounded-[5.88px] center">
                      <AiOutlineDelete color="red" size={8} />
                    </p>
                    <p className="h-[17.6px] w-[17.61px] border-[1px] border-[#e0e0e0] rounded-[5.88px] center">
                      <Person color="blue" size={8} />
                    </p>
                    <p className="h-[17.6px] w-[17.61px] border-[1px] border-[#e0e0e0] rounded-[5.88px] center">
                      <FiEdit color="blue" size={8} />
                    </p>
                  </div>
                  <button className="font-mukta font-medium text-[10px] text-[#ffffff] h-[25px] w-[100px] bg-blue rounded-sm absolute left-[162px]">
                    Begin Appointment
                  </button>
                </div>
              </div>
            </>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default ScheduleDashboard;