import ScriptStr from "@/asset/SaveScript.js?raw";
import ContainerContent from "@/components/styled/ContainerContent";
import { RouteDefine } from "@/consts/Route";
import { copyToClipboard } from "@/utils/CommandUtil";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Link,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

type State = "success" | "failed" | "none";
const CopyStateMap = {
  none: "コピー",
  success: "完了",
  failed: "失敗",
} as const;

const CopyButtonColorMap = {
  none: "primary",
  success: "success",
  failed: "error",
} as const;

export default function GuidePage() {
  const [copied, setCopied] = useState<State>("none");
  const { enqueueSnackbar } = useSnackbar();

  const handleCopy = async () => {
    try {
      await copyToClipboard(scriptFiledRef.current!);
      setCopied("success");
    } catch {
      setCopied("failed");
      enqueueSnackbar({
        variant: "error",
        message: "コピーに失敗しました。手動でコピーしてください。",
      });
    } finally {
      setTimeout(() => setCopied("none"), 2000);
    }
  };

  const scriptFiledRef = useRef<HTMLInputElement>(null);

  return (
    <ContainerContent maxWidth={"md"}>
      <Paper sx={{ textAlign: "start", p: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          使い方
        </Typography>

        <Stack spacing={3} mt={4}>
          <Alert severity="info">
            利用には
            <Link
              href={import.meta.env.VITE_EAMU_COURSE_ANNOUNCE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              ベーシックコース
            </Link>
            の加入が必要です。
          </Alert>
          <Box>
            <Typography gutterBottom>1. 下記をブックマーク登録する</Typography>
            <Box sx={{ position: "relative" }}>
              <OutlinedInput
                inputRef={scriptFiledRef}
                id="script-field"
                defaultValue={ScriptStr}
                sx={{
                  fontFamily: "monospace",
                  width: "100%",
                }}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="text"
                      startIcon={<ContentCopyIcon />}
                      onClick={handleCopy}
                      color={CopyButtonColorMap[copied]}
                    >
                      {CopyStateMap[copied]}
                    </Button>
                  </InputAdornment>
                }
              />
            </Box>
          </Box>

          <Box>
            <Typography>
              2. ポラリスコードの
              <Link
                href={import.meta.env.VITE_EAMU_POLARIS_CHORD_MUSIC_DATA_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                公式サイト
              </Link>
              にアクセスし、ログインする
            </Typography>
          </Box>

          <Box>
            <Typography>
              3. 登録したブックマークを選択してスコアデータをコピーする
            </Typography>
          </Box>

          <Box>
            <Typography>
              4. コピーしたスコアデータを
              <NavLink to={RouteDefine.ScoreRegisterPage.path}>
                スコア登録
              </NavLink>
              で登録する
            </Typography>
          </Box>

          <Box>
            <Typography>
              5.{" "}
              <NavLink to={RouteDefine.ScoreListPage.path}>スコア一覧</NavLink>
              で閲覧する
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </ContainerContent>
  );
}
