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
  createTableColumn,
} from "@fluentui/react-components";
import { AddIcon, DeleteIcon } from "@fluentui/react-icons-mdl2";
import { SPRole, useDeleteRole, useRoles } from "api/rolesApi";
import UserAvatar from "components/RequestsTable/UserAvatar";
import { useState } from "react";
import AddRoleDrawer from "components/Roles/AddRoleDrawer";

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
  const [currentItemId, setCurrentItemId] = useState<number>();
  const [panelOpen, setPanelOpen] = useState(false);
  const deleteRole = useDeleteRole();

  const onSelectionChange: DataGridProps["onSelectionChange"] = (_e, data) => {
    setCurrentItemId(
      parseInt(data.selectedItems.values().next().value.toString())
    );
  };

  const setIsOpen = (isOpen: boolean) => {
    if (!isOpen) {
      setCurrentItemId(undefined);
      setPanelOpen(false);
    }
  };

  const currentItem = roles.data?.find((item) => item.Id === currentItemId);

  return (
    <>
      {roles.isFetching && <Spinner label="Loading..." />}
      <Button
        appearance="subtle"
        icon={<AddIcon />}
        onClick={() => {
          setPanelOpen(true);
        }}
      >
        Add User
      </Button>
      <Button
        appearance="subtle"
        icon={<DeleteIcon />}
        disabled={!currentItem || roles.isFetching}
        onClick={() => {
          if (currentItemId) {
            deleteRole.mutate(currentItemId);
            setCurrentItemId(undefined);
          }
        }}
      >
        Delete
      </Button>
      {!roles.isFetching && (
        <DataGrid
          items={roles.data || []}
          columns={roleColumns}
          sortable
          resizableColumns
          selectionMode="single"
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
                selectionCell={{
                  radioIndicator: { "aria-label": "Select row" },
                }}
              >
                {({ renderCell }) => (
                  <DataGridCell>{renderCell(item)}</DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      )}
      {roles.isError && (
        <div>An error has occured: {(roles.error as Error).message}</div>
      )}
      <AddRoleDrawer isOpen={panelOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default RolesPage;
