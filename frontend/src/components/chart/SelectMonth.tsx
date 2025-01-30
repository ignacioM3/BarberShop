export const months = [
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
];

interface selectMonthProps{
    month: string;
    setMonth: (value: string) => void;
}


export function SelectMonth({month, setMonth}: selectMonthProps) {
    return (
        <select
            id="month"
            value={month}
            className="bg-gray-500 text-center max-w-[150px] text-white p-2 rounded-md cursor-pointer font-bold"
            onChange={(e) => setMonth(e.target.value)}
        >
            <option >Seleccione un mes</option>
            {months.map((month) => (
                <option key={month.value} value={month.value}>
                    {month.label}
                </option>
            ))}
        </select>
    )
}
