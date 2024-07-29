import { TableCellLayout, createTableColumn } from "@fluentui/react-components";
import { ReworkEvent } from "api/eventsApi";
import { Link } from "react-router-dom";

export const RequestId = createTableColumn<ReworkEvent>({
  columnId: "requestId",
  renderHeaderCell: () => {
    return <>Request ID</>;
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate>
        <Link to={"/Request/" + item.requestId}>{item.requestId}</Link>
      </TableCellLayout>
    );
  },
});

export const PackageReview = createTableColumn<ReworkEvent>({
  columnId: "PackageReview",
  renderHeaderCell: () => {
    return <>Package Review/Concurrence</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.PackageReview}</TableCellLayout>;
  },
});

export const HRLReview = createTableColumn<ReworkEvent>({
  columnId: "HRLReview",
  renderHeaderCell: () => {
    return <>HRL/COSF Review</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.HRLReview}</TableCellLayout>;
  },
});

export const Recruiting = createTableColumn<ReworkEvent>({
  columnId: "Recruiting",
  renderHeaderCell: () => {
    return <>Recruiting</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.Recruiting}</TableCellLayout>;
  },
});

export const CandidateSelection = createTableColumn<ReworkEvent>({
  columnId: "Selection",
  renderHeaderCell: () => {
    return <>Candidate Selection</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.Selection}</TableCellLayout>;
  },
});

export const PackageApproval = createTableColumn<ReworkEvent>({
  columnId: "PackageApproval",
  renderHeaderCell: () => {
    return <>Package Approval</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.PackageApproval}</TableCellLayout>;
  },
});

export const SelectionPackageOSFApproval = createTableColumn<ReworkEvent>({
  columnId: "SelectionPackageOSFApproval",
  renderHeaderCell: () => {
    return <>OSF Approval</>;
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate>
        {item.SelectionPackageOSFApproval}
      </TableCellLayout>
    );
  },
});

export const SelectionPackageCSFApproval = createTableColumn<ReworkEvent>({
  columnId: "SelectionPackageCSFApproval",
  renderHeaderCell: () => {
    return <>CSF Approval</>;
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate>
        {item.SelectionPackageCSFApproval}
      </TableCellLayout>
    );
  },
});

export const SelectionPackageHQApproval = createTableColumn<ReworkEvent>({
  columnId: "SelectionPackageHQApproval",
  renderHeaderCell: () => {
    return <>HQ Approval</>;
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate>
        {item.SelectionPackageHQApproval}
      </TableCellLayout>
    );
  },
});

export const SelectionPackageCAApproval = createTableColumn<ReworkEvent>({
  columnId: "SelectionPackageCAApproval",
  renderHeaderCell: () => {
    return <>CA Approval</>;
  },
  renderCell: (item) => {
    return (
      <TableCellLayout truncate>
        {item.SelectionPackageCAApproval}
      </TableCellLayout>
    );
  },
});

export const TitleV = createTableColumn<ReworkEvent>({
  columnId: "TitleV",
  renderHeaderCell: () => {
    return <>Title V</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.TitleV}</TableCellLayout>;
  },
});

export const Unknown = createTableColumn<ReworkEvent>({
  columnId: "Unknown",
  renderHeaderCell: () => {
    return <>Unknown</>;
  },
  renderCell: (item) => {
    return <TableCellLayout truncate>{item.Unknown}</TableCellLayout>;
  },
});
