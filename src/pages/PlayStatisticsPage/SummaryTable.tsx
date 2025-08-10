import { ClearStatusBadge } from "@/components/parts/ClearStatusBadge";
import { ClearStatus } from "@/consts/Code";
import type { Summary } from "@/models/view/PlayStatistics";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type React from "react";

interface SummaryTableProps {
  summary: Summary;
}

const SummaryTable: React.FC<SummaryTableProps> = ({ summary }) => {
  const toRow = (summary: Summary) => {
    function rate(count: number): string {
      if (summary.totalPlayCount === 0) {
        return "0%";
      }
      return `${((count / summary.totalPlayCount) * 100).toFixed(2)}%`;
    }
    return [
      {
        label: <ClearStatusBadge type={ClearStatus.ALL_PERFECT} />,
        total: summary.totalApCount,
        rate: rate(summary.totalApCount),
      },
      {
        label: <ClearStatusBadge type={ClearStatus.FULL_COMBO} />,
        total: summary.totalFcCount,
        rate: rate(summary.totalFcCount),
      },
      {
        label: <ClearStatusBadge type={ClearStatus.SUCCESS} />,
        total: summary.totalClearCount,
        rate: rate(summary.totalClearCount),
      },
      {
        label: <ClearStatusBadge type={ClearStatus.GOOD_TRY} />,
        total: summary.totalGoodTryCount,
        rate: rate(summary.totalGoodTryCount),
      },
      {
        label: <Typography>合計</Typography>,
        total: summary.totalPlayCount,
      },
    ];
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ランプ</TableCell>
            <TableCell>回数</TableCell>
            <TableCell>割合</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {toRow(summary).map((data, i) => (
            <TableRow key={i}>
              <TableCell>{data.label}</TableCell>
              <TableCell>{data.total}</TableCell>
              <TableCell>{data.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SummaryTable;
