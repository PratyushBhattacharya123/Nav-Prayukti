import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { useGetAllSensorDataQuery } from "./redux/features/sensor/sensorApi";
import LineChart from "./components/LineChart";
import CustomLoader from "./components/global/CustomLoader";
import { entries, timeStamps, types } from "./components/utils/constants";

const ENDPOINT = process.env.REACT_APP_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

function App() {
  const [sensorData, setSensorData] = useState<any>();
  const { data, isSuccess, refetch, isLoading } = useGetAllSensorDataQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [temperatureData, setTemperatureData] = useState<any[]>([]);
  const [pressureData, setPressureData] = useState<any[]>([]);
  const [humidityData, setHumidityData] = useState<any[]>([]);
  const [currentEntries, setCurrentEntries] = useState(10);
  const [currentTimestamps, setCurrentTimestamps] = useState("Default");

  useEffect(() => {
    if (isSuccess) {
      setSensorData(data);
    }
  }, [isSuccess, data]);

  console.log(sensorData);

  useEffect(() => {
    if (isSuccess) {
      socketId.on("connection", () => {});
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess && !isLoading && refetch) {
      socketId.on("newSensorData", () => {
        refetch();
      });
    }
  }, [refetch, isSuccess, isLoading]);

  useEffect(() => {
    if (sensorData && currentTimestamps === "Default") {
      const latestData = sensorData.slice(-currentEntries);
      const tempData = latestData.map((item: any) => item.temperature);
      setTemperatureData(tempData);

      const pressureData = latestData.map((item: any) => item.pressure);
      setPressureData(pressureData);

      const humidityData = latestData.map((item: any) => item.humidity);
      setHumidityData(humidityData);
    }
    if (sensorData && currentTimestamps !== "Default") {
      const currentTime = new Date().getTime();
      const filteredData = sensorData.filter(
        (item: any) =>
          currentTime - new Date(item.createdAt).getTime() <=
          Number(currentTimestamps)
      );
      const latestData = filteredData.slice(-currentEntries);
      const tempData = latestData.map((item: any) => item.temperature);
      setTemperatureData(tempData);

      const pressureData = latestData.map((item: any) => item.pressure);
      setPressureData(pressureData);

      const humidityData = latestData.map((item: any) => item.humidity);
      setHumidityData(humidityData);
    }
  }, [sensorData, currentEntries, currentTimestamps]);

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="bg-black h-auto px-3 py-10 min-h-screen">
            <div className="flex flex-col items-center justify-center">
              <div className="flex w-full items-center justify-center">
                <h1 className="md:text-[32px] text-[24px] font-semibold text-white font-sans">
                  Real Time Sensor Data
                </h1>
              </div>
              <div className="md:max-w-[80%] max-w-[90%] mx-auto flex items-center justify-between md:flex-row flex-col md:gap-10 mt-4 w-full">
                <div className="md:w-[45%] w-full flex items-center justify-center md:mb-4">
                  {timeStamps && (
                    <div className="w-full mb-2">
                      <label className="text-gray-300 text-[12px] ml-1">
                        Time Range
                      </label>
                      <select
                        onChange={(e: any) =>
                          setCurrentTimestamps(e.target.value)
                        }
                        value={currentTimestamps}
                        name="time"
                        id="time"
                        className="w-full text-white bg-transparent border h-[40px] px-2 outline-none rounded-[5px] mt-1"
                      >
                        <option className="bg-black/70" value="Default">
                          Default
                        </option>
                        {timeStamps?.map((t: any) => (
                          <option
                            className="bg-black/70"
                            value={t.value}
                            key={t.title}
                          >
                            {t.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="md:w-[45%] w-full flex items-center justify-center md:mb-4">
                  {entries && (
                    <div className="w-full mb-2">
                      <label className="text-gray-300 text-[12px] ml-1">
                        Maximum Number of Data
                      </label>
                      <select
                        onChange={(e: any) => setCurrentEntries(e.target.value)}
                        value={currentEntries}
                        name="entry"
                        id="entry"
                        className="w-full text-white bg-transparent border h-[40px] px-2 outline-none rounded-[5px] mt-1"
                      >
                        {entries?.map((entry: any) => (
                          <option
                            className="bg-black/70"
                            value={entry.value}
                            key={entry.title}
                          >
                            {entry.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center md:max-w-[80%] max-w-[90%] w-full mt-6 justify-center flex-col md:flex-row">
                {types?.map((type: any) => (
                  <div
                    className="bg-gray-300 flex items-center justify-center flex-col mx-4 w-full md:w-[32%] rounded-md md:mb-0 mb-4"
                    key={type?.name}
                  >
                    <div className="flex justify-start w-full ml-4">
                      <h1 className="text-[16px] font-medium text-gray-500 font-sans ml-4 mt-4 -mb-4">
                        {type?.name} Data (in {type?.symbol})
                      </h1>
                    </div>
                    <div className="ml-2">
                      <LineChart
                        data={
                          (type?.name === "Temperature" && temperatureData) ||
                          (type?.name === "Pressure" && pressureData) ||
                          (type?.name === "Humidity" && humidityData)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
