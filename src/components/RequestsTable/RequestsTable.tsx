import { RPARequest, usePagedRequests } from "api/requestsApi";
import {
  Avatar,
  Button,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridProps,
  DataGridRow,
  Field,
  Input,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Spinner,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from "@fluentui/react-components";
import { ArrowNextRegular, ArrowPreviousRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FilterRegular } from "@fluentui/react-icons/lib/fonts";
import { SortDownIcon, SortUpIcon } from "@fluentui/react-icons-mdl2";

const columnSizingOptions = {
  positionTitle: {
    minWidth: 80,
    defaultWidth: 280,
  },
  requestType: {
    minWidth: 80,
    defaultWidth: 220,
  },
  systemSeriesGrade: {
    minWidth: 80,
    defaultWidth: 100,
  },
  officeSymbol: {
    minWidth: 80,
    defaultWidth: 120,
  },
  requestor: {
    minWidth: 80,
    defaultWidth: 430,
  },
  currentStage: {
    minWidth: 80,
    defaultWidth: 100,
  },
  createdDate: {
    minWidth: 80,
  },
};

const RequestType = createTableColumn<RPARequest>({
  columnId: "requestType",
  compare: (a, b) => {
    return a.requestType.localeCompare(b.requestType);
  },
  renderHeaderCell: () => {
    return "Request Type";
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.requestType}</TableCellLayout>;
  },
});

const SystemSeriesGrade = createTableColumn<RPARequest>({
  columnId: "systemSeriesGrade",
  renderHeaderCell: () => {
    return "PS-SS-GR";
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate>
        {item.paySystem + "-" + item.series + "-" + item.grade}
      </TableCellLayout>
    );
  },
});

const OfficeSymbol = createTableColumn<RPARequest>({
  columnId: "officeSymbol",
  compare: (a, b) => {
    return a.officeSymbol.localeCompare(b.officeSymbol);
  },
  renderHeaderCell: () => {
    return "Office Symbol";
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.officeSymbol}</TableCellLayout>;
  },
});

const Requestor = createTableColumn<RPARequest>({
  columnId: "Author",
  compare: (a, b) => {
    return a.Author?.Title.localeCompare(b.Author?.Title || "") || 0;
  },
  renderHeaderCell: () => {
    return "Requestor";
  },
  renderCell: (item) => {
    return (
      <TableCellLayout
        truncate
        media={
          <Avatar aria-label={item.Author?.Title} name={item.Author?.Title} />
        }
      >
        {item.Author?.Title}
      </TableCellLayout>
    );
  },
});

const CurrentStage = createTableColumn<RPARequest>({
  columnId: "stage",
  compare: (a, b) => {
    return a.stage.localeCompare(b.stage);
  },
  renderHeaderCell: () => {
    return "Current Stage";
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.stage}</TableCellLayout>;
  },
});

const CreatedDate = createTableColumn<RPARequest>({
  columnId: "Created",
  compare: (a, b) => {
    return (a.Created?.valueOf() || 0) - (b.Created?.valueOf() || 0);
  },
  renderHeaderCell: () => {
    return "Created Date";
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
  const [page, setPage] = useState(0);
  const [sortState, setSortState] = useState<
    Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
  >({
    sortColumn: "Created",
    sortDirection: "ascending",
  });
  const pagedItems = usePagedRequests(page, sortState);

  const onSortChange: DataGridProps["onSortChange"] = (_e, nextSortState) => {
    setSortState(nextSortState);
    setPage(0);
  };

  const PositionTitle = createTableColumn<RPARequest>({
    columnId: "positionTitle",
    renderHeaderCell: () => {
      return (
        <>
          {/* TODO: make first button take full width with second button floated to the right */}
          <Button
            appearance="transparent"
            iconPosition="after"
            icon={
              sortState.sortColumn === "positionTitle" ? (
                sortState.sortDirection === "ascending" ? (
                  <SortUpIcon />
                ) : (
                  <SortDownIcon />
                )
              ) : undefined
            }
            onClick={() => {
              /* TODO: make this onClick generic for all columns */
              setSortState({
                sortColumn: "positionTitle",
                sortDirection:
                  sortState.sortColumn === "positionTitle"
                    ? sortState.sortDirection === "ascending"
                      ? "descending"
                      : "ascending"
                    : "ascending",
              });
            }}
          >
            Position Title
          </Button>
          <Popover withArrow>
            <PopoverTrigger disableButtonEnhancement>
              <Button icon={<FilterRegular />} appearance="transparent" />
            </PopoverTrigger>
            <PopoverSurface>
              <Field label="Position Title Filter Type">
                <RadioGroup>
                  <Radio value="Contains" label="Contains" />
                  <Radio value="Starts With" label="Starts With" />
                </RadioGroup>
              </Field>
              <Field label="Position Title Filter Text">
                <Input />
              </Field>
            </PopoverSurface>
          </Popover>
        </>
      );
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate>
          <Link to={"/Request/" + item.Id}>{item.positionTitle}</Link>
        </TableCellLayout>
      );
    },
  });

  const columns: TableColumnDefinition<RPARequest>[] = [
    PositionTitle,
    RequestType,
    SystemSeriesGrade,
    OfficeSymbol,
    Requestor,
    CurrentStage,
    CreatedDate,
  ];

  return (
    <>
      <DataGrid
        items={pagedItems.data?.results || []}
        columns={columns}
        getRowId={(item) => item.Id}
        resizableColumns
        columnSizingOptions={columnSizingOptions}
        sortable
        sortState={sortState}
        onSortChange={onSortChange}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
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
