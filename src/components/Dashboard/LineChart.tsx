import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartOptions,
  ChartData,
} from "chart.js";
import { HistoricalData } from "../../types/ChartTypes";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader";
import toast from "react-hot-toast";

ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement); // Registering the components for ChartJs

const fetchData = async (): Promise<HistoricalData> => {
  //fetching the response from the api
  const response = await fetch(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  if (!response.ok) {
    toast.error("Network error");
  }
  return response.json();
};

const LineChart = () => {

  //Getting the data, isLoading, isError values from useQuery.
  const { data, isLoading, isError } = useQuery<HistoricalData>({
    queryKey: ["historicalData"],
    queryFn: fetchData,
  });

  //Displaying the loader
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  //Displaying the error
  if (isError) {
    toast.error("Error while fetching the data from the api");
    return;
  }

  //Extracting the keys from the data object.
  const dates = Object.keys(data!.cases);
  const cases = Object.values(data!.cases);


  //Defining the chart data.
  const chartData: ChartData<"line", number[], string> = {
    labels: dates,
    datasets: [
      {
        label: "Worldwide Cases",
        data: cases,
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  };


  //Configuring the chart options.
  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Cases",
        },
      },
    },
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-4">
      <h1 className="text-center font-bold text-2xl mb-4">
        COVID-19 Cases Fluctuations
      </h1>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
