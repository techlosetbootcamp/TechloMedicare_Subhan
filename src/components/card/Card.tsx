import { card } from "@/types/dashboardCard";
import { Options, Upgrade, Downgrade } from "@/constants/react-icons";

import Image from "next/image";
import Chart from "../ui/chart/Chart";
import Loader from "../ui/loader/Loader";
import { green, mutedRed } from "@/constants/colors";

const Card: React.FC<card> = (props) => {
  const color: string = props.percentage === "+3.11%" ? green : mutedRed;
  return (
    <div className="max:w-[358.91px] med:w-[250px] md:w-[180px] w-full h-[191.22px] bg-white max:p-[22px] med:p-[14px] md:p-[7px] p-[22px] relative">
      {props.loading ? (
        <Loader />
      ) : (
        <>
          <div className="v_center justify-between ">
            <h1 className="font-semibold font-mukta">{props.heading}</h1>
            <Options className="hidden med:inline" />
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-4xl font-bold mt-6">{props.number}</h1>

              {props.percentage !== "" && (
                <div className="absolute v_center bottom-8 gap-2 ">
                  {props.percentage === "+3.11%" ? (
                    <Upgrade
                      className={`bg-green text-white rounded-full`}
                      style={{ backgroundColor: color }}
                      size={21}
                    />
                  ) : (
                    <Downgrade
                      className="bg-mutedRed h-[21px] w-[21px] text-white rounded-full"
                      style={{ backgroundColor: color }}
                      size={21}
                    />
                  )}
                  <p className={`text-green`} style={{ color: color }}>
                    {props.percentage}
                  </p>
                </div>
              )}
            </div>
            {props.image ? (
              <Image
                src={props.image}
                alt="chart"
                width={164}
                height={112}
                priority
                className="md:hidden med:inline w-auto h-auto"
              />
            ) : (
              <Chart
                male={props.total?.male}
                width={119}
                female={props.total?.female}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;