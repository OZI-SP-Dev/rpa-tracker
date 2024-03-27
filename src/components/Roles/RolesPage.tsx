import {
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
  TableRowId,
  createTableColumn,
} from "@fluentui/react-components";
import { AddIcon, DeleteIcon } from "@fluentui/react-icons-mdl2";
import { SPRole, useDeleteRole, useRoles } from "api/rolesApi";
import UserAvatar from "components/RequestsTable/UserAvatar";
import { useState } from "react";
import AddRoleDrawer from "./AddRoleDrawer";

const roleColumns: TableColumnDefinition<SPRole>[] = [
  createTableColumn<SPRole>({
    columnId: "role",
    compare: (a, b) => {
      return a.Title.localeCompare(b.Title);
    },
    renderHeaderCell: () => {
      return "Role";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.Title}</TableCellLayout>;
    },
  }),
  createTableColumn<SPRole>({
    columnId: "user",
    compare: (a, b) => {
      return a.user.Title.localeCompare(b.user.Title);
    },
    renderHeaderCell: () => {
      return "User";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout media={<UserAvatar user={item.user} />}>
          {item.user.Title}
        </TableCellLayout>
      );
    },
  }),
];

const RolesPage = () => {
  const roles = useRoles();
  const [selectedRows, setSelectedRows] = useState(new Set<TableRowId>([]));
  const [panelOpen, setPanelOpen] = useState(false);
  const deleteRole = useDeleteRole();

  const onSelectionChange: DataGridProps["onSelectionChange"] = (_e, data) => {
    setSelectedRows(data.selectedItems);
  };

  return (
    <>
      {roles.isLoading && <Spinner label="Loading..." />}
      <Button
        appearance="subtle"
        icon={<AddIcon />}
        onClick={() => {
          setSelectedRows(new Set());
          setPanelOpen(true);
        }}
      >
        Add User
      </Button>
      <Button
        appearance="subtle"
        icon={<DeleteIcon />}
        disabled={selectedRows.size !== 1}
        onClick={() => {
          selectedRows.forEach((item) => deleteRole.mutate(Number(item)));
        }}
      >
        Delete
      </Button>
      <DataGrid
        items={roles.data || []}
        columns={roleColumns}
        sortable
        resizableColumns
        selectionMode="single"
        selectedItems={selectedRows}
        onSelectionChange={onSelectionChange}
        getRowId={(item) => item.Id}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<SPRole>>
          {({ item, rowId }) => (
            <DataGridRow<SPRole>
              key={rowId}
              selectionCell={{ radioIndicator: { "aria-label": "Select row" } }}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
      {roles.isError && (
        <div>An error has occured: {(roles.error as Error).message}</div>
      )}
      <AddRoleDrawer isOpen={panelOpen} setIsOpen={setPanelOpen} />
    </>
  );
};

export default RolesPage;
