import ContainerContent from "@/components/styled/ContainerContent";
import RadioButtonGroup from "@/container/UseRadioButtons";
import { useMusicScoreData } from "@/hooks/useMusicScoreData";
import type { PlayStatistics } from "@/models/view/PlayStatistics";
import { convertToPlayStatistics } from "@/modules/view/PlayStatisticsConverter";
import {
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CountBarChart, { type ChartType } from "./CountBarChart";
import SummaryTable from "./SummaryTable";

const FitStyle = {
  paddingLeft: { xs: 0, md: 2 },
  paddingRight: { xs: 0, md: 2 },
} as const;

const ChartTypeOptions = [
  { label: "曲数", value: "num" },
  { label: "割合", value: "rate" },
] as const;

const PlayStatisticsPage: React.FC = () => {
  const { isLoadedMusicScoreData, musicData } = useMusicScoreData();
  const [playStatistics, setPlayStatistics] = useState<PlayStatistics | null>(
    null
  );

  const [chartTypeDiff, setChartTypeDiff] = useState<ChartType>("num");
  const [chartTypeLevel, setChartTypeLevel] = useState<ChartType>("num");

  useEffect(() => {
    if (!isLoadedMusicScoreData) {
      return;
    }

    setPlayStatistics(convertToPlayStatistics(musicData));
  }, [isLoadedMusicScoreData, musicData]);

  return (
    <ContainerContent sx={FitStyle}>
      <Paper sx={{ textAlign: "start", p: { xs: 3, md: 5 } }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          プレイ統計
        </Typography>
        {playStatistics == null ? (
          <CircularProgress />
        ) : (
          <Stack gap={5}>
            <Container sx={FitStyle}>
              <Typography variant="h5" gutterBottom>
                プレー数
              </Typography>
              <SummaryTable summary={playStatistics.summary} />
            </Container>
            <Container sx={FitStyle}>
              <Typography variant="h5" gutterBottom>
                難易度別クリア状況
              </Typography>
              <RadioButtonGroup
                options={ChartTypeOptions}
                defaultValue={chartTypeDiff}
                onChange={(v) => setChartTypeDiff(v as ChartType)}
              />
              <CountBarChart
                count={playStatistics.difficulty}
                chartType={chartTypeDiff}
              />
            </Container>
            <Container sx={FitStyle}>
              <Typography variant="h5" gutterBottom>
                レベル別クリア状況
              </Typography>
              <RadioButtonGroup
                options={ChartTypeOptions}
                defaultValue={chartTypeLevel}
                onChange={(v) => setChartTypeLevel(v as ChartType)}
              />
              <CountBarChart
                count={playStatistics.level}
                chartType={chartTypeLevel}
              />
            </Container>
          </Stack>
        )}
      </Paper>
    </ContainerContent>
  );
};

export default PlayStatisticsPage;
