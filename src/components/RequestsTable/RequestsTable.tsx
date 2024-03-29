import { RPARequest, RequestFilter, usePagedRequests } from "api/requestsApi";
import {
  Button,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridProps,
  DataGridRow,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Spinner,
  TableCellLayout,
  TableColumnDefinition,
  TableColumnId,
  TableColumnSizingOptions,
  createTableColumn,
} from "@fluentui/react-components";
import {
  ArrowNextRegular,
  ArrowPreviousRegular,
  FilterRegular,
} from "@fluentui/react-icons";
import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FilterIcon } from "@fluentui/react-icons-mdl2";
import FilterRequestsDrawer from "./FilterRequests";
import { STAGES } from "consts/Stages";
import TableMessages from "./TableMessages";
import UserAvatar from "./UserAvatar";

const PositionTitle = createTableColumn<RPARequest>({
  columnId: "positionTitle",
  compare: () => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Position Title {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate>
        <Link to={"/Request/" + item.Id}>{item.positionTitle}</Link>
      </TableCellLayout>
    );
  },
});

const RequestType = createTableColumn<RPARequest>({
  columnId: "requestType",
  compare: () => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Request Type {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.requestType}</TableCellLayout>;
  },
});

const PaySystem = createTableColumn<RPARequest>({
  columnId: "paySystem",
  compare: () => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>System {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.paySystem}</TableCellLayout>;
  },
});

const Series = createTableColumn<RPARequest>({
  columnId: "series",
  compare: () => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Series {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.series}</TableCellLayout>;
  },
});

const Grade = createTableColumn<RPARequest>({
  columnId: "grade",
  compare: () => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Grade {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.grade}</TableCellLayout>;
  },
});

const OfficeSymbol = createTableColumn<RPARequest>({
  columnId: "officeSymbol",
  compare: () => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Office Symbol {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.officeSymbol}</TableCellLayout>;
  },
});

const Requestor = createTableColumn<RPARequest>({
  columnId: "Author",
  compare: () => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Requestor {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate media={<UserAvatar user={item.Author} />}>
        {item.Author?.Title}
      </TableCellLayout>
    );
  },
});

const CurrentStage = createTableColumn<RPARequest>({
  columnId: "stage",
  compare: () => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Current Stage {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate>
        {STAGES.filter((stage) => stage.key === item.stage)[0].text}
      </TableCellLayout>
    );
  },
});

const CreatedDate = createTableColumn<RPARequest>({
  columnId: "Created",
  compare: () => 0, // Change nothing, but utilize table's sorting icons
  renderHeaderCell: (filtered = false) => {
    return <>Created {filtered && <FilterIcon />}</>;
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate>
        {item.Created?.toLocaleDateString()}
      </TableCellLayout>
    );
  },
});

const RequestsTable = () => {
  // HOOKS
  const [page, setPage] = useState(0);
  const [sortState, setSortState] = useState<
    Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
  >({
    sortColumn: "Created",
    sortDirection: "ascending",
  });
  const [filterState, setFilterState] = useState<RequestFilter[]>([]);
  const pagedItems = usePagedRequests(page, sortState, filterState);
  const refMap = useRef<Record<string, HTMLElement | null>>({});
  const [columnSizingOptions, setColumnSizingOptions] =
    useState<TableColumnSizingOptions>({
      positionTitle: { minWidth: 120, idealWidth: 280 },
      requestType: { minWidth: 120, idealWidth: 220 },
      paySystem: { minWidth: 80, idealWidth: 80 },
      series: { minWidth: 80, idealWidth: 80 },
      grade: { minWidth: 80, idealWidth: 80 },
      officeSymbol: { minWidth: 120, idealWidth: 120 },
      requestor: { minWidth: 120, idealWidth: 430 },
      currentStage: { minWidth: 120, idealWidth: 165 },
      createdDate: { minWidth: 120, idealWidth: 120 },
    });
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const onColumnResize = useCallback(
    (
      _e: unknown,
      { columnId, width }: { columnId: TableColumnId; width: number }
    ) => {
      setColumnSizingOptions((state) => ({
        ...state,
        [columnId]: {
          ...state[columnId],
          idealWidth: width,
        },
      }));
    },
    []
  );

  // Sort/Filter Functions
  const onSortChange: DataGridProps["onSortChange"] = (_e, nextSortState) => {
    setSortState(nextSortState);
    setPage(0);
  };

  const columns: TableColumnDefinition<RPARequest>[] = [
    PositionTitle,
    RequestType,
    PaySystem,
    Series,
    Grade,
    OfficeSymbol,
    Requestor,
    CurrentStage,
    CreatedDate,
  ];

  // RENDER
  return (
    <>
      <TableMessages />
      <FilterRequestsDrawer
        isOpen={drawerIsOpen}
        setIsOpen={setDrawerIsOpen}
        filterState={filterState}
        setFilterState={setFilterState}
      />
      <DataGrid
        items={pagedItems.data?.results || []}
        columns={columns}
        getRowId={(item) => item.Id}
        resizableColumns
        columnSizingOptions={columnSizingOptions}
        onColumnResize={onColumnResize}
        sortable
        sortState={sortState}
        onSortChange={onSortChange}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell, columnId }) => (
              <Menu openOnContext>
                <MenuTrigger>
                  <DataGridHeaderCell
                    ref={(el) => (refMap.current[columnId] = el)}
                  >
                    {renderHeaderCell(
                      filterState.filter((obj) => {
                        return obj.column === columnId;
                      }).length > 0
                    )}
                  </DataGridHeaderCell>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem
                      onClick={() =>
                        // Send focus to this input?
                        setDrawerIsOpen(true)
                      }
                      icon={<FilterRegular />}
                    >
                      Filter
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<RPARequest>>
          {({ item, rowId }) => (
            <DataGridRow<RPARequest> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          appearance="primary"
          disabled={page <= 0}
          icon={<ArrowPreviousRegular />}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          appearance="primary"
          disabled={!pagedItems.data?.hasNext || pagedItems.isFetching}
          icon={pagedItems.isFetching ? <Spinner /> : <ArrowNextRegular />}
          iconPosition="after"
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default RequestsTable;
