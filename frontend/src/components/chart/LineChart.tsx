import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { months } from "./SelectMonth";
import { getRandomColor } from "../../utils/generateData";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const datasets = [
    {
        label: "Ganancias Sucursal 1",
        data: [5000, 7000, 12000, 8000, 10000, 9500, 13000, 11000, 14000, 12000, 15000, 17000],
        ...getRandomColor(),
        tension: 0.4,
    },
    {
        label: "Ganancias Sucursal 2",
        data: [4000, 6000, 11000, 9000, 12000, 8500, 11000, 13000, 12000, 14000, 16000, 18000],
        ...getRandomColor(),
        tension: 0.4,
    },
    {
        label: "Ganancias Sucursal 3",
        data: [5030, 2000, 14000, 8000, 10000, 9500, 13000, 21000, 24000, 22000, 15000, 17000],
        ...getRandomColor(),
        tension: 0.4,
    },
];

export function LineChart() {
    const year = new Date().getFullYear()
    const data = {
        labels: months.map((month) => month.label),
        datasets
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
              ticks: {
                display: window.innerWidth > 768,
              },
              grid: {
                display: false,
              },
            },
          },
        plugins: {
            legend: { display: true },
            title: { 
                display: true, 
                text: `Ganancias Mensuales - ${year}`,
                font: {
                    size: 20
                }
             },
        },
    };

    return (
        <div className="w-full min-h-[400px]">

            <Line data={data} options={options} />
        </div>
    )
}
