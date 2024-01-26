import {
  Button,
  Combobox,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  Input,
  Option,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { REQUESTTYPES } from "consts/RequestTypes";
import { FormEventHandler } from "react";

interface requestFilter {
  column: string;
  filter: string | Date | number;
}

const FilterRequestsDrawer = ({
  isOpen,
  setIsOpen,
  filterState,
  setFilterState,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  filterState: requestFilter[];
  setFilterState: (filters: requestFilter[]) => void;
}) => {
  const filter: FormEventHandler = (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      positionTitle?: { value: string };
      requestType?: { value: string };
      system?: { value: string };
      series?: { value: string };
      grade?: { value: string };
      office?: { value: string };
      requestor?: { value: string };
      stage?: { value: string };
      beforeDate?: { value: string };
      afterDate?: { value: string };
    };

    const newFilter: requestFilter[] = [];

    if (target.positionTitle?.value) {
      newFilter.push({
        column: "positionTitle",
        filter: target.positionTitle.value.toString(),
      });
    }

    if (target.requestType?.value) {
      newFilter.push({
        column: "requestType",
        filter: target.requestType.value.toString(),
      });
    }

    if (target.system?.value) {
      newFilter.push({
        column: "system",
        filter: target.system.value.toString(),
      });
    }

    setFilterState(newFilter);
    setIsOpen(false);
  };

  return (
    <Drawer
      type="overlay"
      position="end"
      open={isOpen}
      onOpenChange={(_e, { open }) => setIsOpen(open)}
    >
      <form onSubmit={filter}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Filters
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <Field label="Position Title">
            <Input
              name="positionTitle"
              defaultValue={filterState
                .filter((obj) => {
                  return obj.column === "positionTitle";
                })[0]
                ?.filter.toString()}
            />
          </Field>
          <Field label="Request Type">
            <Combobox
              name="requestType"
              defaultValue={filterState
                .filter((obj) => {
                  return obj.column === "requestType";
                })[0]
                ?.filter.toString()}
            >
              {REQUESTTYPES.map((reqType) => (
                <Option key={reqType} value={reqType}>
                  {reqType}
                </Option>
              ))}
            </Combobox>
          </Field>
          System Series Grade Office Symbol Requestor Current Stage Created
        </DrawerBody>
        <DrawerFooter>
          <Button appearance="primary" type="submit" value="submit">
            Apply
          </Button>
        </DrawerFooter>
      </form>
    </Drawer>
  );
};

export default FilterRequestsDrawer;
