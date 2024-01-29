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
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { REQUESTTYPES } from "consts/RequestTypes";
import { PAYSYSTEMS } from "consts/PaySystems";
import { GENERALGRADES, ACQGRADES } from "consts/Grades";
import { STAGES } from "consts/Stages";
import { FormEventHandler } from "react";
import { RequestFilter } from "api/requestsApi";

const FilterRequestsDrawer = ({
  isOpen,
  setIsOpen,
  filterState,
  setFilterState,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  filterState: RequestFilter[];
  setFilterState: (filters: RequestFilter[]) => void;
}) => {
  const filter: FormEventHandler = (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      positionTitle?: { value: string };
      requestType?: { value: string };
      paySystem?: { value: string };
      series?: { value: string };
      grade?: { value: string };
      officeSymbol?: { value: string };
      Author?: { value: string };
      stage?: { value: string };
      beforeDate?: { value: string };
      afterDate?: { value: string };
    };

    const newFilter: RequestFilter[] = [];

    if (target.positionTitle?.value) {
      newFilter.push({
        column: "positionTitle",
        filter: target.positionTitle.value.toString(),
        queryString: `substringof('${target.positionTitle.value.toString()}',positionTitle)`,
      });
    }

    if (target.requestType?.value) {
      newFilter.push({
        column: "requestType",
        filter: target.requestType.value.toString(),
        queryString: `(requestType eq '${target.requestType.value.toString()}')`,
      });
    }

    if (target.paySystem?.value) {
      newFilter.push({
        column: "paySystem",
        filter: target.paySystem.value.toString(),
        queryString: `(paySystem eq '${target.paySystem.value.toString()}')`,
      });
    }

    if (target.series?.value) {
      newFilter.push({
        column: "series",
        filter: target.series.value.toString(),
        queryString: `(series eq '${target.series.value.toString()}')`,
      });
    }

    if (target.grade?.value) {
      newFilter.push({
        column: "grade",
        filter: target.grade.value.toString(),
        queryString: `(grade eq '${target.grade.value.toString()}')`,
      });
    }

    if (target.officeSymbol?.value) {
      newFilter.push({
        column: "officeSymbol",
        filter: target.officeSymbol.value.toString(),
        queryString: `substringof('${target.officeSymbol.value.toString()}',officeSymbol)`,
      });
    }

    // if (target.Author?.value) {
    //   newFilter.push({
    //     column: "Author",
    //     filter: target.Author.value.toString(),
    //   });
    // }

    // FIX: Not currently matching up w/ displayed stages
    if (target.stage?.value) {
      newFilter.push({
        column: "stage",
        filter: target.stage.value.toString(),
        queryString: `(stage eq '${target.stage.value.toString()}')`,
      });
    }

    if (target.beforeDate?.value) {
      newFilter.push({
        column: "Created",
        modifier: "beforeDate",
        filter: target.beforeDate.value,
        queryString: `(Created le '${target.beforeDate.value.toString()}')`,
      });
    }

    if (target.afterDate?.value) {
      newFilter.push({
        column: "Created",
        modifier: "afterDate",
        filter: target.afterDate.value,
        queryString: `(Created ge '${target.afterDate.value.toString()}')`,
      });
    }

    setFilterState(newFilter);
    setIsOpen(false);
  };

  const afterDate = filterState.filter((obj) => {
    return obj.modifier === "afterDate";
  })[0]?.filter;
  const beforeDate = filterState.filter((obj) => {
    return obj.modifier === "beforeDate";
  })[0]?.filter;

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
          <hr />
          <Field label="Position Title">
            <Input
              name="positionTitle"
              type="search"
              defaultValue={filterState
                .filter((obj) => {
                  return obj.column === "positionTitle";
                })[0]
                ?.filter.toString()}
            />
          </Field>
          <hr />
          <Field label="Request Type">
            <Combobox
              name="requestType"
              clearable
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
          <hr />
          <Field label="Pay System">
            <Combobox
              name="paySystem"
              clearable
              defaultValue={filterState
                .filter((obj) => {
                  return obj.column === "paySystem";
                })[0]
                ?.filter.toString()}
            >
              {PAYSYSTEMS.map((system) => (
                <Option key={system.key} value={system.key}>
                  {system.key}
                </Option>
              ))}
            </Combobox>
          </Field>
          <hr />
          <Field label="Series">
            <Input
              name="series"
              type="search"
              defaultValue={filterState
                .filter((obj) => {
                  return obj.column === "series";
                })[0]
                ?.filter.toString()}
              maxLength={4}
            />
          </Field>
          <hr />
          <Field label="Grade">
            <Combobox
              name="grade"
              clearable
              defaultValue={filterState
                .filter((obj) => {
                  return obj.column === "grade";
                })[0]
                ?.filter.toString()}
            >
              {ACQGRADES.map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
              {GENERALGRADES.map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Combobox>
          </Field>
          <hr />
          <Field label="Office Symbol">
            <Input
              name="officeSymbol"
              type="search"
              defaultValue={filterState
                .filter((obj) => {
                  return obj.column === "officeSymbol";
                })[0]
                ?.filter.toString()}
            />
          </Field>
          <hr />
          <Field label="Created By">
            <Input
              name="Author"
              defaultValue={filterState
                .filter((obj) => {
                  return obj.column === "Author";
                })[0]
                ?.filter.toString()}
            />
          </Field>
          <hr />
          <Field label="Stage">
            <Combobox
              name="stage"
              clearable
              defaultValue={filterState
                .filter((obj) => {
                  return obj.column === "stage";
                })[0]
                ?.filter.toString()}
            >
              {STAGES.map((stage) => (
                <Option key={stage.key} text={stage.key} value={stage.key}>
                  {stage.text}
                </Option>
              ))}
            </Combobox>
          </Field>
          <hr />
          <Field label="Created After">
            <DatePicker
              name="afterDate"
              value={afterDate ? new Date(afterDate) : undefined}
              formatDate={(date?: Date) => {
                return !date
                  ? ""
                  : date.getFullYear() +
                      "-" +
                      (date.getUTCMonth() + 1) +
                      "-" +
                      date.getDate();
              }}
            />
          </Field>
          <hr />
          <Field label="Created Before">
            <DatePicker
              name="beforeDate"
              value={beforeDate ? new Date(beforeDate) : undefined}
              formatDate={(date?: Date) => {
                return !date
                  ? ""
                  : date.getFullYear() +
                      "-" +
                      (date.getUTCMonth() + 1) +
                      "-" +
                      date.getDate();
              }}
            />
          </Field>
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
