import axios from "axios";
import { faker } from "@faker-js/faker";
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:8000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const backendUrl = "http://localhost:8000/api/v1/sensor-data";

function generateMockTemperature() {
  return faker.number.int({ min: 0, max: 50 });
}

function generateMockHumidity() {
  return faker.number.int({ min: 0, max: 100 });
}

function generateMockPressure() {
  return faker.number.int({ min: 0, max: 1000 });
}

function sendDataToSocketServer(data) {
  socketId.emit("sensorData", data);
}

async function sendDataToBackend(temperature, humidity, pressure) {
  const payload = {
    temperature,
    humidity,
    pressure,
  };

  try {
    await axios.post(backendUrl, payload);
    console.log("Data sent successfully:", payload);
  } catch (error) {
    console.error("Failed to send data:", error.message);
  }
}

// Main function to continuously generate and send mock data
async function main() {
  while (true) {
    const temperature = generateMockTemperature();
    const humidity = generateMockHumidity();
    const pressure = generateMockPressure();
    sendDataToSocketServer({ temperature, humidity, pressure });
    await sendDataToBackend(temperature, humidity, pressure);

    // Delaying for a certain period (10 secs) before sending the next data
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}

main().catch((error) => console.error("An error occurred:", error));
