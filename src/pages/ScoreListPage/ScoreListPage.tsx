import ContainerContent from "@/components/styled/ContainerContent";
import { RouteDefine } from "@/consts/Route";
import { indexedDB } from "@/db/AppDatabase";
import { useScoreTableSettings } from "@/hooks/useScoreTableSettings";
import { MusicData } from "@/models/Music";
import type { TableRow } from "@/models/view/MusicList";
import { deserializeRow } from "@/modules/db/ChartDataConverter";
import { convertToTableRow } from "@/modules/view/MusicListConverter";
import { useApi } from "@/utils/ApiClient";
import { Alert, CircularProgress } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScoreTable from "./ScoreTable";

export default function ScoreListPage() {
  const [data, setData] = useState<TableRow[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const { getMusics } = useApi();

  const {
    isSettingLoaded,
    isSaveFilter,
    displayNoPlay,
    columnFilters,
    columnVisibility,
    setIsSaveFilter,
    setDisplayNoPlay,
    setColumnFilters,
    setColumnVisibility,
  } = useScoreTableSettings();

  useEffect(() => {
    const init = async () => {
      const promiseTasks = [
        getMusics().catch(() => []),
        indexedDB.scoreData
          .toArray()
          .then((records) => deserializeRow(records)),
      ] as const;

      const [masterData, dbMusicData] = await Promise.all(promiseTasks);
      setDisplayAlert(dbMusicData.length === 0);
      const tableRow = MusicData.mergeList(masterData, dbMusicData)
        .flatMap((music) => convertToTableRow(music))
        .sort(
          (a, b) =>
            [
              a.music.name.localeCompare(b.music.name),
              a.difficultyType - b.difficultyType,
            ].find((e) => e !== 0) ?? 0
        );

      setData(tableRow);
      setIsDataLoaded(true);
    };

    init();
  }, [getMusics]);

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
          {isDataLoaded && displayAlert && (
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
            isSaveFilter={isSaveFilter}
            displayNoPlay={displayNoPlay}
            columnFilters={columnFilters}
            columnVisibility={columnVisibility}
            setIsSaveFilter={setIsSaveFilter}
            setDisplayNoPlay={setDisplayNoPlay}
            onColumnFiltersChange={setColumnFilters}
            onColumnVisibilityChange={setColumnVisibility}
          />
        </Fragment>
      )}
    </ContainerContent>
  );
}
