import ContainerContent from "@/components/styled/ContainerContent";
import { RouteDefine } from "@/consts/Route";
import { useScoreTableSettings } from "@/hooks/useScoreTableSettings";
import { indexedDB } from "@/models/db/ScoreDataTable";
import type { ChartData } from "@/models/Table";
import { deserializeRow } from "@/modules/ChartDataConverter";
import { Alert, CircularProgress } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScoreTable from "./ScoreTable";

export default function ScoreListPage() {
  const [data, setData] = useState<ChartData[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const {
    isSettingLoaded,
    columnFilters,
    columnVisibility,
    setColumnFilters,
    setColumnVisibility,
  } = useScoreTableSettings();

  useEffect(() => {
    indexedDB.scoreData.toArray().then((records) => {
      setData(records.map(deserializeRow));
      setIsDataLoaded(true);
    });
  }, []);

  return (
    <ContainerContent
      maxWidth={false}
      sx={{
        paddingLeft: { xs: 0, lg: 2 },
        paddingRight: { xs: 0, lg: 2 },
      }}
    >
      {!isSettingLoaded && !isDataLoaded ? (
        <CircularProgress />
      ) : (
        <Fragment>
          {isDataLoaded && data.length === 0 && (
            <Alert color="warning" sx={{ marginBottom: 1 }}>
              利用するには
              <Link to={RouteDefine.ScoreRegisterPage.path}>
                {RouteDefine.ScoreRegisterPage.name}
              </Link>
              より登録をしてください。使い方は
              <Link to={RouteDefine.GuidePage.path}>コチラ</Link>。
            </Alert>
          )}
          <ScoreTable
            data={data}
            columnFilters={columnFilters}
            columnVisibility={columnVisibility}
            onColumnFiltersChange={setColumnFilters}
            onColumnVisibilityChange={setColumnVisibility}
          />
        </Fragment>
      )}
    </ContainerContent>
  );
}
