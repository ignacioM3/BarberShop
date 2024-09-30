import { ListAddButton } from "../../components/styles/LinkButton";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { PageHeader } from "../../components/styles/PageHeader";
import { PageTitle } from "../../components/styles/PageTitle";

export function BarberList() {

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          Barberos
        </PageTitle>
        <ListAddButton
          onClick={() => {}}
        >
          Agregar Barbero
        </ListAddButton>
      </PageHeader>
      <PageContent>
  
      </PageContent>
    </PageContainer>
  )
}
