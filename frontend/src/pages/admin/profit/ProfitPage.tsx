import { useQuery } from "@tanstack/react-query";
import { DoughnutComponent } from "../../../components/chart/Doughnut";
import { PageContainer } from "../../../components/styles/PageContainer";
import { PageContent } from "../../../components/styles/PageContent";
import { PageHeader } from "../../../components/styles/PageHeader";
import { PageTitle } from "../../../components/styles/PageTitle";
import { getProfitByMonth } from "../../../api/Profit";
import LoadingSpinner from "../../../components/styles/LoadingSpinner";
import { useState } from "react";
import { SelectMonth } from "../../../components/chart/SelectMonth";
import { LineChart } from "../../../components/chart/LineChart";

export function ProfitPage() {
  const getMonth = (new Date().getMonth() + 1).toString();
  const [month, setMonth] = useState(getMonth);

  const year = new Date().getFullYear().toString();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getProfitByMonth({
      month,
      year
    }),
    queryKey: ['getProfitByMonth', month],
    retry: false
  })

  
  if(isError) return <h1>falta implementar error</h1>
  if (isLoading) return <LoadingSpinner />

  if (data) return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Ganancias</PageTitle>
      </PageHeader>

      <PageContent>
        <div className="flex items-center justify-center gap-2 mb-5">
          <SelectMonth 
          month={month}
          setMonth={setMonth}
          />
          <span className="font-bold">- {year}</span>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-10">
          {data.length ? (
             data.map((profit, index: number) => (
              <div className="max-w-[350px] mb-10" key={index}>
                <h1 className="text-center text-gray-500 font-bold text-xl">{profit.branchName}</h1>
                <DoughnutComponent
                  profit={profit}
                />
              </div>
            ))
          ): <div>
              <h1 className="text-gray-500 text-2xl font-bold mt-4 text-center">No hay datos en este mes</h1>
            </div>}
        </div>

        <LineChart />
      </PageContent>
    </PageContainer>
  )
}
