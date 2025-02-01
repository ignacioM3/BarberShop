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
import {  transformProfitData } from "../../utils/generateData";
import { useQuery } from "@tanstack/react-query";
import { getProfitByYear } from "../../api/Profit";
import LoadingSpinner from "../styles/LoadingSpinner";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);



export function LineChart() {
    const year = new Date().getFullYear().toString()

    const {data: dataApi, isLoading, isError} = useQuery({
        queryFn: () => getProfitByYear(year),
        queryKey: ['lineChart', year],
        retry: false
    })

    if(isError)  return <h1>falta implementar error</h1>
    if(isLoading) return <LoadingSpinner />
    const datasets = transformProfitData(dataApi);
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
