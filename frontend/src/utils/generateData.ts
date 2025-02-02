import { profitAppointment } from "../types";

type ProfitData = {
  totalProfit: number;
  branchId: string;
  branchName: string;
  month: number;
};


interface DataProps{
    labels: string[];
    cant: number[];
    label?: string;
}

type Dataset = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  tension: number;
};

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

export function transformProfitData(profitData: ProfitData[]): Dataset[] {
  // Agrupar datos por branchId
  const branchesMap = new Map<string, { name: string; data: number[] }>();

  // Inicializar cada sucursal con un array de 12 meses en 0
  profitData.forEach(({ branchId, branchName }) => {
      if (!branchesMap.has(branchId)) {
          branchesMap.set(branchId, { name: branchName, data: Array(12).fill(0) });
      }
  });

  // Asignar los valores de ganancias en el mes correspondiente
  profitData.forEach(({ branchId, month, totalProfit }) => {
      const branch = branchesMap.get(branchId);
      if (branch) {
          branch.data[month - 1] = totalProfit; // Meses en índice 0-11
      }
  });

  // Convertir Map a array de datasets
  return Array.from(branchesMap.entries()).map(([, { name, data }]) => ({
      label: `Ganancias ${name}`,
      data,
      ...getRandomColor(),
      tension: 0.4,
  }));
}
