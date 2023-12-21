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
  Spinner,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from "@fluentui/react-components";
import { ArrowNextRegular, ArrowPreviousRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

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

const PositionTitle = createTableColumn<RPARequest>({
  columnId: "positionTitle",
  compare: (a, b) => {
    return a.positionTitle.localeCompare(b.positionTitle);
  },
  renderHeaderCell: () => {
    return "Position Title";
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

const columns: TableColumnDefinition<RPARequest>[] = [
  PositionTitle,
  RequestType,
  SystemSeriesGrade,
  OfficeSymbol,
  Requestor,
  CurrentStage,
  CreatedDate,
];

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
