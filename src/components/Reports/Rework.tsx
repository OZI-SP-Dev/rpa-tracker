import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableColumnDefinition,
} from "@fluentui/react-components";
import { ReworkEvent, useReworkEvents } from "api/eventsApi";
import {
  RequestId,
  PackageReview,
  CandidateSelection,
  DraftPackageHRL,
  HRLReview,
  OSFReview,
  PackageApproval,
  Recruiting,
  SelectionPackageCAApproval,
  SelectionPackageCSFApproval,
  SelectionPackageHQApproval,
  SelectionPackageOSFApproval,
  TitleV,
  Unknown,
} from "./Rework.Columns";

const Rework = () => {
  const reworkEvents = useReworkEvents();

  const columns: TableColumnDefinition<ReworkEvent>[] = [
    RequestId,
    PackageReview,
    OSFReview,
    HRLReview,
    Recruiting,
    CandidateSelection,
    PackageApproval,
    DraftPackageHRL,
    SelectionPackageOSFApproval,
    SelectionPackageCSFApproval,
    SelectionPackageHQApproval,
    SelectionPackageCAApproval,
    TitleV,
    Unknown,
  ];

  return (
    <>
      <DataGrid
        items={reworkEvents.data || []}
        columns={columns}
        getRowId={(item) => item.requestId}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<ReworkEvent>>
          {({ item, rowId }) => (
            <DataGridRow<ReworkEvent> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </>
  );
};

export default Rework;
