import { ClearStatusBadge } from "@/components/parts/ClearStatusBadge";
import DifficultyIcon from "@/components/parts/DifficultyIcon";
import { ChartDifficultyType, ClearStatus, Genre } from "@/consts/Code";
import type { TableRow } from "@/models/view/MusicList";
import {
  getClearStatusLabel,
  getDifficultyLabel,
  getGenreLabel,
  getGenreLabels,
} from "@/utils/LabelUtil";
import VisibilityOff from "@mui/icons-material/Deselect";
import FilterAlt from "@mui/icons-material/FilterAlt";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import RotateLeft from "@mui/icons-material/RotateLeft";
import SelectAll from "@mui/icons-material/SelectAll";
import ViewColumn from "@mui/icons-material/ViewColumn";
import ViewColumnOutlined from "@mui/icons-material/ViewColumnOutlined";
import {
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import type { OnChangeFn } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import {
  MRT_BottomToolbar,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsMenuItems,
  MRT_TableContainer,
  MRT_TableHeadCellFilterContainer,
  useMaterialReactTable,
  type DropdownOption,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_FilterFn,
  type MRT_RowVirtualizer,
  type MRT_SortingState,
  type MRT_TableState,
  type MRT_VisibilityState,
} from "material-react-table";
import { MRT_Localization_JA } from "material-react-table/locales/ja";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";

const GenreOptions: DropdownOption[] = Object.values(Genre).map((e) => ({
  value: e,
  label: getGenreLabel(e),
}));

const DifficultyTypeOptions: DropdownOption[] = Object.values(
  ChartDifficultyType
).map((e) => ({
  value: e,
  label: getDifficultyLabel(e),
}));

const ClearStatusOptions: DropdownOption[] = Object.values(ClearStatus).map(
  (e) => ({
    value: e,
    label: getClearStatusLabel(e),
  })
);

const LevelOptions: DropdownOption[] = Array.from(Array(14)).map((_, i) => ({
  value: i + 1,
}));

const RateColumnOpt = (
  key: "fcCount" | "apCount" | "clearCount" | "achievementRate"
): Partial<MRT_ColumnDef<TableRow>> => ({
  Cell: ({ cell }: { cell: MRT_Cell<TableRow, unknown> }) =>
    cell.getValue<number>().toFixed(2) + "%",
  filterVariant: "range",
  filterFn: "betweenInclusive",
  size: 80,
  enableGlobalFilter: false,
  accessorFn: (row) => {
    if (key === "achievementRate") {
      return row.achievementRate;
    }
    return row.playCount > 0 ? (row[key] / row.playCount) * 100 : 0;
  },
});

const MultiSelectNumberFilterFn: MRT_FilterFn<TableRow> = (
  row,
  id,
  filterValue
) => filterValue.length === 0 || filterValue.includes(row.getValue(id));

const CountColumnOpt = {
  filterVariant: "range",
  size: 100,
  enableGlobalFilter: false,
} as const;

const Columns: MRT_ColumnDef<TableRow>[] = [
  {
    header: "ジャケット",
    accessorKey: "music.musicId",
    Cell: ({ cell }) => (
      <img
        src={`../images/jackets/${cell.getValue<string>()}.jpg`}
        width="30px"
      />
    ),
    enableGlobalFilter: false,
    enableSorting: false,
    size: 30,
  },
  {
    header: "曲名",
    accessorKey: "music.name",
    enableHiding: false,
    size: 250,
    Cell: ({ cell, renderedCellValue }) => (
      <Tooltip title={cell.getValue<string>()}>
        <span>{renderedCellValue}</span>
      </Tooltip>
    ),
  },
  {
    header: "作曲者",
    accessorKey: "music.composer",
    Cell: ({ cell, renderedCellValue }) => (
      <Tooltip title={cell.getValue<string>()}>
        <span>{renderedCellValue}</span>
      </Tooltip>
    ),
  },
  {
    header: "ライセンス",
    accessorKey: "music.license",
    size: 250,
    Cell: ({ cell, renderedCellValue }) => (
      <Tooltip title={cell.getValue<string>()}>
        <Typography fontSize={12}>{renderedCellValue}</Typography>
      </Tooltip>
    ),
  },
  {
    header: "ジャンル",
    accessorKey: "music.genre",
    Cell: ({ cell }) => (
      <Tooltip title={getGenreLabels(cell.getValue<Genre>()).join("/")}>
        <Typography fontSize={12}>
          {getGenreLabels(cell.getValue<Genre>()).join("/")}
        </Typography>
      </Tooltip>
    ),
    filterVariant: "multi-select",
    filterFn: (row, id, filterValue: Genre[]) =>
      filterValue.every((v) => (row.getValue<Genre>(id) & v) !== 0),
    filterSelectOptions: GenreOptions,
    enableGlobalFilter: false,
  },
  {
    header: "Lv",
    accessorKey: "level",
    filterVariant: "multi-select",
    filterSelectOptions: LevelOptions,
    filterFn: MultiSelectNumberFilterFn,
    size: 40,
    enableGlobalFilter: false,
  },
  {
    header: "難易度",
    id: "difficultyType",
    accessorFn: (row) => row.difficultyType,
    Cell: ({ cell }) => (
      <DifficultyIcon difficulty={cell.getValue<ChartDifficultyType>()} />
    ),
    filterVariant: "multi-select",
    filterSelectOptions: DifficultyTypeOptions,
    filterFn: MultiSelectNumberFilterFn,
    size: 80,
    enableGlobalFilter: false,
  },
  {
    header: "Achv%",
    accessorKey: "achievementRate",
    ...RateColumnOpt("achievementRate"),
  },
  {
    header: "LIKES",
    accessorKey: "likes",
    filterVariant: "range",
    size: 80,
    enableGlobalFilter: false,
  },
  {
    header: "最大コンボ",
    accessorKey: "maxCombo",
    filterVariant: "range",
    size: 100,
    enableGlobalFilter: false,
  },
  {
    header: "ランプ",
    id: "clearStatus",
    accessorFn: (row) => row.clearStatus,
    Cell: ({ cell }) => (
      <ClearStatusBadge type={cell.getValue<ClearStatus>()} />
    ),
    filterVariant: "multi-select",
    filterSelectOptions: ClearStatusOptions,
    filterFn: MultiSelectNumberFilterFn,
    size: 120,
    enableGlobalFilter: false,
  },
  {
    header: "クリア回数",
    accessorKey: "clearCount",
    ...CountColumnOpt,
  },
  {
    header: "クリア率",
    id: "clearRate",
    ...RateColumnOpt("clearCount"),
  },
  {
    header: "FC回数",
    accessorKey: "fcCount",
    ...CountColumnOpt,
  },
  {
    header: "FC率",
    id: "fcRate",
    ...RateColumnOpt("fcCount"),
  },
  {
    header: "AP回数",
    accessorKey: "apCount",
    ...CountColumnOpt,
  },
  {
    header: "AP率",
    id: "apRate",
    ...RateColumnOpt("apCount"),
  },
  {
    header: "プレイ回数",
    accessorKey: "playCount",
    ...CountColumnOpt,
  },
  {
    header: "更新日時",
    accessorKey: "updateAt",
    Cell: ({ cell }) => {
      const updateAt = cell.getValue<Date>();
      if (updateAt.getTime() === 0) {
        return "未プレー";
      }
      return formatDate(updateAt, "yyyy/MM/dd HH:mm:ss");
    },
    filterVariant: "datetime-range",
    enableGlobalFilter: false,
  },
] as const;

const initialDefaultState: Partial<MRT_TableState<TableRow>> = {
  pagination: { pageIndex: 0, pageSize: 100 },
  density: "compact",
  showColumnFilters: false,
  showGlobalFilter: true,
} as const;

type ScoreTableProps = {
  data: TableRow[];
  isSaveFilter: boolean;
  displayNoPlay: boolean;
  columnFilters: MRT_ColumnFiltersState;
  columnVisibility: MRT_VisibilityState;
  setIsSaveFilter: OnChangeFn<boolean>;
  setDisplayNoPlay: OnChangeFn<boolean>;
  onColumnFiltersChange: OnChangeFn<MRT_ColumnFiltersState>;
  onColumnVisibilityChange: OnChangeFn<MRT_VisibilityState>;
};

export default function ScoreTable({
  data,
  isSaveFilter,
  displayNoPlay,
  columnFilters,
  columnVisibility,
  setIsSaveFilter,
  setDisplayNoPlay,
  onColumnFiltersChange,
  onColumnVisibilityChange,
}: ScoreTableProps) {
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [menu, setMenu] = useState<"hide" | "filter" | "none">("none");
  const [displayData, setDisplayData] = useState(data);

  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  useEffect(() => {
    if (displayNoPlay) {
      setDisplayData(data);
    } else {
      setDisplayData(
        data.filter((row) => row.clearStatus !== ClearStatus.NO_PLAY)
      );
    }
  }, [data, displayNoPlay]);

  const table = useMaterialReactTable({
    columns: Columns,
    data: displayData,
    initialState: { ...initialDefaultState, columnFilters, columnVisibility },
    muiPaginationProps: {
      rowsPerPageOptions: [10, 30, 50, 100, 300, 1000],
      variant: "text",
    },
    enableStickyHeader: false,
    enableFilters: true,
    enableGlobalFilter: true,
    enableColumnFilters: false,
    enableColumnActions: false,
    enablePagination: true,
    enableRowVirtualization: true,
    enableDensityToggle: false,
    paginationDisplayMode: "pages",
    onSortingChange: setSorting,
    onColumnFiltersChange,
    onColumnVisibilityChange,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    localization: MRT_Localization_JA,
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 1 },
    columnVirtualizerOptions: { overscan: 5 },
  });

  const [enableDisplayAllButton, enableHideAllButton] = useMemo(() => {
    const hidableColumns = table
      .getAllColumns()
      .filter((c) => c.getCanHide())
      .map((c) => columnVisibility[c.id] ?? true);
    return [
      hidableColumns.some((c) => !c),
      hidableColumns.some((c) => c),
    ] as const;
  }, [table, columnVisibility]);

  const clickAllButton = (type: "display" | "hide") => {
    const visibility = table
      .getAllColumns()
      .filter((c) => c.getCanHide())
      .reduce(
        (obj, c) => Object.assign(obj, { [c.id]: type === "display" }),
        {} as MRT_VisibilityState
      );
    onColumnVisibilityChange(visibility);
  };

  return (
    <Stack>
      <Grid
        container
        justifyContent="space-between"
        style={{ marginBottom: "0.5rem" }}
        sx={{ padding: "0 10px" }}
      >
        <Grid>
          <MRT_GlobalFilterTextField table={table} sx={{ width: 250 }} />
        </Grid>
        <Grid>
          <ToggleButtonGroup
            size="small"
            color="primary"
            value={menu}
            exclusive
            onChange={(_, v) => setMenu(v ?? "none")}
          >
            <ToggleButton value="hide">
              {menu === "hide" ? <ViewColumn /> : <ViewColumnOutlined />}
            </ToggleButton>
            <ToggleButton value="filter">
              {menu === "filter" ? <FilterAlt /> : <FilterAltOutlined />}
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Collapse in={menu === "filter"}>
        <Paper style={{ marginBottom: "0.5rem", padding: 10 }}>
          <Grid paddingBottom="10px" container gap={2}>
            <Grid
              size={{ xs: 12, sm: "auto" }}
              display="flex"
              justifyContent="start"
            >
              <Button
                variant="outlined"
                color="warning"
                startIcon={<RotateLeft />}
                onClick={() => onColumnFiltersChange([])}
              >
                リセット
              </Button>
            </Grid>
            <Grid size={{ xs: "auto" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSaveFilter}
                    onChange={(_, checked) => setIsSaveFilter(checked)}
                  />
                }
                label={<Typography>条件を記憶する</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={displayNoPlay}
                    onChange={(_, checked) => setDisplayNoPlay(checked)}
                  />
                }
                label={<Typography>未プレー表示</Typography>}
              />
            </Grid>
          </Grid>
          <Grid container>
            {table
              .getLeafHeaders()
              .filter((h) => h.id !== "music.musicId")
              .map((header) => (
                <Fragment key={header.id}>
                  <Grid size={{ lg: 1, md: 1.5, sm: 2, xs: 12 }}>
                    <Typography
                      paddingLeft="1rem"
                      fontWeight="bold"
                      sx={{
                        textAlign: { sm: "left", xs: "center" },
                        paddingTop: { sm: 0, xs: 1 },
                      }}
                    >
                      {header.column.columnDef.header}
                    </Typography>
                  </Grid>
                  <Grid size={{ lg: 2, md: 4.5, sm: 10, xs: 12 }}>
                    <MRT_TableHeadCellFilterContainer
                      key={header.id}
                      header={header}
                      table={table}
                      in
                    />
                  </Grid>
                </Fragment>
              ))}
          </Grid>
        </Paper>
      </Collapse>
      <Collapse in={menu === "hide"}>
        <Paper style={{ marginBottom: "0.5rem" }}>
          <Stack
            direction="row"
            justifyContent="start"
            gap="10px"
            padding="10px 10px 0px 10px"
          >
            <Button
              variant="outlined"
              startIcon={<SelectAll />}
              disabled={!enableDisplayAllButton}
              onClick={() => clickAllButton("display")}
            >
              全て表示
            </Button>
            <Button
              variant="outlined"
              startIcon={<VisibilityOff />}
              disabled={!enableHideAllButton}
              onClick={() => clickAllButton("hide")}
            >
              全て非表示
            </Button>
          </Stack>
          <Grid container>
            {table.getAllColumns().map((column) => (
              <Grid key={column.id} size={{ lg: 1.5, md: 2, sm: 3, xs: 6 }}>
                <MRT_ShowHideColumnsMenuItems
                  table={table}
                  allColumns={table.getAllColumns()}
                  column={column}
                  hoveredColumn={null}
                  isNestedColumns={false}
                  setHoveredColumn={() => {}}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Collapse>
      <Paper>
        <MRT_TableContainer
          table={table}
          sx={{
            height: "calc(100dvh - 210px)",
            maxHeight: "calc(100dvh - 210px)",
          }}
        />
        <MRT_BottomToolbar table={table} />
      </Paper>
    </Stack>
  );
}
