import DifficultyIcon from "@/components/parts/DifficultyIcon";
import { ChartDifficultyType, ClearStatus, Genre } from "@/consts/Code";
import { ChartData } from "@/models/Music";
import {
  getClearStatusLabel,
  getDifficultyLabel,
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
  type MRT_RowVirtualizer,
  type MRT_SortingState,
  type MRT_TableState,
  type MRT_VisibilityState,
} from "material-react-table";
import { MRT_Localization_JA } from "material-react-table/locales/ja";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";

const GenreOptions: DropdownOption[] = Object.values(Genre).map((e) => ({
  value: getGenreLabels(e),
}));

const DifficultyTypeOptions: DropdownOption[] = Object.values(
  ChartDifficultyType
).map((e) => ({
  value: e,
  label: getDifficultyLabel(e),
}));

const ClearStatusOptions: DropdownOption[] = Object.values(ClearStatus).map(
  (e) => ({
    value: getClearStatusLabel(e),
  })
);

const LevelOptions: DropdownOption[] = Array.from(Array(14)).map((_, i) => ({
  value: i + 1,
}));

const RateColumnOpt = {
  Cell: ({ cell }: { cell: MRT_Cell<ChartData, unknown> }) =>
    cell.getValue<number>().toFixed(2) + "%",
  filterVariant: "range",
  filterFn: "betweenInclusive",
  size: 80,
  enableGlobalFilter: false,
} as const;

const CountColumnOpt = {
  filterVariant: "range",
  size: 100,
  enableGlobalFilter: false,
} as const;

const Columns: MRT_ColumnDef<ChartData>[] = [
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
    size: 200,
  },
  {
    header: "作曲者",
    accessorKey: "music.composer",
  },
  {
    header: "ライセンス",
    accessorKey: "music.license",
  },
  {
    header: "ジャンル",
    id: "music.genre",
    accessorFn: (row) => getGenreLabels(row.music.genre).join(","),
    filterVariant: "multi-select",
    filterSelectOptions: GenreOptions,
    enableGlobalFilter: false,
  },
  {
    header: "Lv",
    accessorKey: "level",
    filterVariant: "multi-select",
    filterSelectOptions: LevelOptions,
    filterFn: (row, id, filterValue: number[]) =>
      filterValue.length === 0 ||
      filterValue.includes(row.getValue<number>(id)),
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
    filterFn: (row, id, filterValue: ChartDifficultyType[]) =>
      filterValue.length === 0 ||
      filterValue.includes(row.getValue<ChartDifficultyType>(id)),
    size: 80,
    enableGlobalFilter: false,
  },
  {
    header: "AcRate",
    accessorKey: "achievementRate",
    ...RateColumnOpt,
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
    accessorFn: (row) => getClearStatusLabel(row.clearStatus),
    filterVariant: "multi-select",
    filterSelectOptions: ClearStatusOptions,
    size: 140,
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
    accessorFn: (row) => row.clearRate * 100,
    ...RateColumnOpt,
  },
  {
    header: "FC回数",
    accessorKey: "fcCount",
    ...CountColumnOpt,
  },
  {
    header: "FC率",
    id: "fcRate",
    accessorFn: (row) => row.fcRate * 100,
    ...RateColumnOpt,
  },
  {
    header: "AP回数",
    accessorKey: "apCount",
    ...CountColumnOpt,
  },
  {
    header: "AP率",
    id: "apRate",
    accessorFn: (row) => row.apRate * 100,
    ...RateColumnOpt,
  },
  {
    header: "プレイ回数",
    accessorKey: "playCount",
    ...CountColumnOpt,
  },
  {
    header: "更新日時",
    accessorKey: "updateAt",
    Cell: ({ cell }) =>
      formatDate(cell.getValue<Date>(), "yyyy/MM/dd HH:mm:ss"),
    filterVariant: "datetime-range",
    enableGlobalFilter: false,
  },
] as const;

const initialDefaultState: Partial<MRT_TableState<ChartData>> = {
  pagination: { pageIndex: 0, pageSize: 100 },
  density: "compact",
  showColumnFilters: false,
  showGlobalFilter: true,
} as const;

type ScoreTableProps = {
  data: ChartData[];
  isSaveFilter: boolean;
  columnFilters: MRT_ColumnFiltersState;
  columnVisibility: MRT_VisibilityState;
  setIsSaveFilter: OnChangeFn<boolean>;
  onColumnFiltersChange: OnChangeFn<MRT_ColumnFiltersState>;
  onColumnVisibilityChange: OnChangeFn<MRT_VisibilityState>;
};

export default function ScoreTable({
  data,
  isSaveFilter,
  columnFilters,
  columnVisibility,
  setIsSaveFilter,
  onColumnFiltersChange,
  onColumnVisibilityChange,
}: ScoreTableProps) {
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [menu, setMenu] = useState<"hide" | "filter" | "none">("none");

  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  const table = useMaterialReactTable({
    columns: Columns,
    data,
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
    rowVirtualizerOptions: { overscan: 10 },
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
          <Stack
            direction="row"
            justifyContent="start"
            paddingBottom="10px"
            gap={5}
          >
            <Button
              variant="outlined"
              color="warning"
              startIcon={<RotateLeft />}
              onClick={() => onColumnFiltersChange([])}
            >
              リセット
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSaveFilter}
                  onChange={(_, checked) => setIsSaveFilter(checked)}
                />
              }
              label={<Typography>条件を記憶する</Typography>}
            />
          </Stack>
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
