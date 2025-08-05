import ContainerContent from "@/components/styled/ContainerContent";
import { RouteDefine } from "@/consts/Route";
import { indexedDB } from "@/db/AppDatabase";
import type { PolarisChordChartData } from "@/models/api/Eamu/Chart";
import {
  deserializeJsonData,
  serializeRow,
} from "@/modules/db/ChartDataConverter";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScoreRegisterPage() {
  const [jsonText, setJsonText] = useState("");
  const [inputError, setInputError] = useState(false);
  const [pasteError, setPasteError] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handlePaste = async () => {
    try {
      setPasteError(false);
      const text = await navigator.clipboard.readText();
      setJsonText(text);
    } catch {
      enqueueSnackbar({
        variant: "error",
        message: "クリップボードの読み取りに失敗しました。",
      });
      setPasteError(true);
    }
  };

  const handleRegister = async () => {
    try {
      setInputError(false);
      const parsed: PolarisChordChartData = JSON.parse(jsonText);

      await Promise.all(
        deserializeJsonData(parsed)
          .flatMap((charData) => serializeRow(charData))
          .map(async (row) => await indexedDB.scoreData.put(row))
      );

      enqueueSnackbar({
        variant: "success",
        message: "登録処理が完了しました。",
      });
      navigate(RouteDefine.ScoreListPage.path);
    } catch {
      enqueueSnackbar({
        variant: "error",
        message: "無効なJSON形式です。",
      });
      setInputError(true);
    }
  };

  return (
    <ContainerContent
      maxWidth={"md"}
      sx={{ paddingLeft: { xs: 0, md: 2 }, paddingRight: { xs: 0, md: 2 } }}
    >
      <Paper sx={{ textAlign: "start", p: { xs: 3, md: 5 } }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          スコア登録
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            color={pasteError ? "error" : "primary"}
            onClick={handlePaste}
          >
            ペースト
          </Button>
          <Button variant="contained" onClick={handleRegister}>
            登録
          </Button>
        </Box>
        <Stack spacing={2} mt={2}>
          <TextField
            label="スコアデータ"
            placeholder="ここにスコアデータを貼り付けてください"
            multiline
            minRows={10}
            maxRows={20}
            fullWidth
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            error={inputError}
          />
        </Stack>
      </Paper>
    </ContainerContent>
  );
}
