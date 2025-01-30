import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { generateData, sumServicesByBranch } from '../../utils/generateData';


ChartJS.register(ArcElement, Tooltip, Legend);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const value = context.raw;
          return `$${value}`;
        },
      },
    },
  }
};





export function DoughnutComponent({ profit }: any) {
   const formData = sumServicesByBranch(profit.appointments)

 const data = generateData(formData)

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      <span className="absolute font-bold text-xl mt-8">${profit.totalProfit}</span>
      <Doughnut data={data} options={options} />
    </div>
  ) 
}
