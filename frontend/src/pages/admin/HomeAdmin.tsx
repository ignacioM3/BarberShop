import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { PageHeader } from "../../components/styles/PageHeader";
import { PageTitle } from "../../components/styles/PageTitle";



export function HomeAdmin() {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="text-center">Bienvenido al Menu Admin - NicoBarber</PageTitle>
      </PageHeader>
      <PageContent>
        <div className="text-center my-4">
          <p className="md:text-xl">Aca Podras administrar <span className="text-gray-500 font-bold">Usuarios</span>, <span className="text-gray-500 font-bold">ganancias</span> y <span className="text-gray-500 font-bold">Barberos</span></p>
        </div>


      </PageContent>
    </PageContainer>
  )
}
