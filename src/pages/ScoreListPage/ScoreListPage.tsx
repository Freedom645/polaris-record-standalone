import ContainerContent from "@/components/styled/ContainerContent";
import ScoreTable from "@/pages/ScoreListPage/ScoreTable";

export default function ScoreListPage() {
  return (
    <ContainerContent
      maxWidth={false}
      sx={{
        paddingLeft: { xs: 0, lg: 2 },
        paddingRight: { xs: 0, lg: 2 },
      }}
    >
      <ScoreTable />
    </ContainerContent>
  );
}
