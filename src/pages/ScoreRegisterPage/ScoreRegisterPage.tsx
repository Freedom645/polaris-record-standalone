import ContainerContent from "@/components/styled/ContainerContent";
import { indexedDB } from "@/models/db/ScoreDataTable";
import {
  deserializeJsonData,
  serializeRow,
} from "@/modules/ChartDataConverter";
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

export default function ScoreRegisterPage() {
  const [jsonText, setJsonText] = useState("");
  const [inputError, setInputError] = useState(false);
  const [pasteError, setPasteError] = useState(false);

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
      const parsed = JSON.parse(jsonText);

      await indexedDB.scores.clear();
      await Promise.all(
        deserializeJsonData(parsed)
          .map((charData) => serializeRow(charData))
          .map(async (row) => await indexedDB.scores.add(row))
      );

      enqueueSnackbar({
        variant: "success",
        message: "登録処理が完了しました。",
      });
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
      maxWidth="md"
      sx={{
        paddingLeft: { xs: 0, lg: 2 },
        paddingRight: { xs: 0, lg: 2 },
      }}
    >
      <Paper sx={{ textAlign: "start", p: 5 }}>
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
