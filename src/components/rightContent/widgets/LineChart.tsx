import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["25 min", "20 min", "15 min", "10 min", "5 min"];

interface Props {
  name: string;
  data: number[];
}

export default function LineChart(props: Props) {
  const { data, name } = props;
  const _data = {
    labels,
    datasets: [
      {
        label: "Data",
        data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: name,
      },
    },
  }; // @ts-ignore
  return <Line options={options} data={_data} />;
}
