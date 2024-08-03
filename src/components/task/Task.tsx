"use client";

import { useState } from "react";
import Checkbox from "../ui/checkbox/Checkbox";
import { Options } from "@/constants/react-icons";
import { task } from "@/types/taskCard";

const Task: React.FC<task> = (props) => {
  const [showButton, setShowButton] = useState(false);
  const handleShowButton = () => {
    setShowButton((prev) => !prev);
  };

  return (
    <>
      <div className=" relative v_center justify-between max:w-[676.63px] w-[100%-30px] h-[101px] bg-white md:pr-[20px] pr-1 md:pl-[25.5px]  pt-[18.63px]">
        <div className="flex relative bottom-4">
          <Checkbox
            checked={props?.checked}
            handleChange={(e) => props.handleChange(e, props?.id)}
          />
          <div className="flex ml-[17px] flex-col gap-2 mt-1">
            <h4 className="text-base font-mukta font-medium">
              {props?.checked
                ? "Task completed Successfully"
                : "Task not completed"}
            </h4>
            <p className="text-xs font-mukta ">{props?.title}</p>
          </div>
        </div>
        <p className="md:absolute md:right-[97px] md:bottom-[40px] ">
          {props?.date}
        </p>
        <Options
          size={24}
          className="relative bottom-8 border-2 p-1 w-[30px] rounded-md h-[30px] border-gray-300"
          onClick={handleShowButton}
        />
        {showButton && (
          <button
            onClick={() => props.handleDelete(props?.id)}
            className="absolute right-5 rounded-xl bottom-3 py-2 px-3 border-[1px] border-white bg-blue text-white "
          >
            Delete
          </button>
        )}
      </div>
    </>
  );
};

export default Task;