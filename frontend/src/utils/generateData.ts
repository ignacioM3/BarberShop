import { profitAppointment } from "../types";

interface DataProps{
    labels: string[];
    cant: number[];
    label?: string;
}

export const sumServicesByBranch = (appointments: profitAppointment[]) => {
  const totals = { claritos: 0, global: 0, corte: 0 };

  appointments.forEach(app => {
    if (["claritos", "global", "corte"].includes(app.service)) {
      totals[app.service as keyof typeof totals] += app.price;
    }
  });

  return {
    labels: Object.keys(totals),
    cant: Object.values(totals)
  }
};


export const generateData = ({labels, cant, label = "Cantidad"}: DataProps) => {
    const newData = {
        labels, 
        datasets: [
          {
            label,
            data: cant,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)', 
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', 
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],            
            borderWidth: 1, 
            
          },
        ],
      };
    return newData
      
}



export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return {
    borderColor: `rgba(${r}, ${g}, ${b}, 1)`,
    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
    pointBackgroundColor: `rgba(${r}, ${g}, ${b}, 1)`,
    pointBorderColor: "#fff",
  };
};