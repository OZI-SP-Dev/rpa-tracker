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
import { RequestFilter } from "api/requestsApi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFilterFields {
  positionTitle: string;
  requestType: string;
  paySystem: string;
  series: string;
  grade: string;
  officeSymbol: string;
  stage: string;
  afterDate: Date;
  beforeDate: Date;
}

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
  const afterDate = filterState.filter((obj) => {
    return obj.modifier === "afterDate";
  })[0]?.filter;
  const beforeDate = filterState.filter((obj) => {
    return obj.modifier === "beforeDate";
  })[0]?.filter;

  const { control, handleSubmit, reset } = useForm<IFilterFields>({
    defaultValues: {
      positionTitle:
        filterState
          .filter((obj) => {
            return obj.column === "positionTitle";
          })[0]
          ?.filter.toString() ?? "",
      requestType:
        filterState
          .filter((obj) => {
            return obj.column === "requestType";
          })[0]
          ?.filter.toString() ?? "",
      paySystem:
        filterState
          .filter((obj) => {
            return obj.column === "paySystem";
          })[0]
          ?.filter.toString() ?? "",
      series:
        filterState
          .filter((obj) => {
            return obj.column === "series";
          })[0]
          ?.filter.toString() ?? "",
      grade:
        filterState
          .filter((obj) => {
            return obj.column === "grade";
          })[0]
          ?.filter.toString() ?? "",
      officeSymbol:
        filterState
          .filter((obj) => {
            return obj.column === "officeSymbol";
          })[0]
          ?.filter.toString() ?? "",
      stage:
        filterState
          .filter((obj) => {
            return obj.column === "stage";
          })[0]
          ?.filter.toString() ?? "",
      afterDate: afterDate ? new Date(afterDate) : undefined,
      beforeDate: beforeDate ? new Date(beforeDate) : undefined,
    },
  });
  const onSubmit: SubmitHandler<IFilterFields> = (data) => {
    console.log(data);
    const newFilter: RequestFilter[] = [];

    if (data.positionTitle) {
      newFilter.push({
        column: "positionTitle",
        filter: data.positionTitle,
        queryString: `substringof('${data.positionTitle}',positionTitle)`,
      });
    }

    if (data.requestType) {
      newFilter.push({
        column: "requestType",
        filter: data.requestType,
        queryString: `(requestType eq '${data.requestType}')`,
      });
    }

    if (data.paySystem) {
      newFilter.push({
        column: "paySystem",
        filter: data.paySystem,
        queryString: `(paySystem eq '${data.paySystem}')`,
      });
    }

    if (data.series) {
      newFilter.push({
        column: "series",
        filter: data.series,
        queryString: `(series eq '${data.series}')`,
      });
    }

    if (data.grade) {
      newFilter.push({
        column: "grade",
        filter: data.grade,
        queryString: `(grade eq '${data.grade}')`,
      });
    }

    if (data.officeSymbol) {
      newFilter.push({
        column: "officeSymbol",
        filter: data.officeSymbol,
        queryString: `substringof('${data.officeSymbol}',officeSymbol)`,
      });
    }

    // if (data.Author?.value) {
    //   newFilter.push({
    //     column: "Author",
    //     filter: data.Author,
    //   });
    // }

    // FIX: Not currently matching up w/ displayed stages
    if (data.stage) {
      newFilter.push({
        column: "stage",
        filter: data.stage,
        queryString: `(stage eq '${data.stage}')`,
      });
    }

    if (data.beforeDate) {
      newFilter.push({
        column: "Created",
        modifier: "beforeDate",
        filter: data.beforeDate,
        queryString: `(Created le '${new Date(
          data.beforeDate
        ).toISOString()}')`,
      });
    }

    if (data.afterDate) {
      newFilter.push({
        column: "Created",
        modifier: "afterDate",
        filter: data.afterDate,
        queryString: `(Created ge '${new Date(data.afterDate).toISOString()}')`,
      });
    }

    setFilterState(newFilter);
    setIsOpen(false);
  };

  return (
    <Drawer
      type="overlay"
      position="end"
      style={{ height: "100vh" }}
      open={isOpen}
      onOpenChange={(_e, { open }) => setIsOpen(open)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <DrawerBody
          style={{
            /* Header/footer padding = 72px */
            maxHeight: "calc(100vh - 72px - 3em)",
          }}
        >
          <hr />
          <Field label="Position Title">
            <Controller
              name="positionTitle"
              control={control}
              render={({ field }) => <Input type="search" {...field} />}
            />
          </Field>
          <hr />
          <Field label="Request Type">
            <Controller
              name="requestType"
              control={control}
              render={({ field }) => (
                <Combobox
                  clearable
                  autoComplete="on"
                  {...field}
                  selectedOptions={[field.value ?? ""]}
                  onOptionSelect={(_event, data) => {
                    field.onChange(data.optionValue ?? "");
                  }}
                  value={field.value}
                >
                  {REQUESTTYPES.map((reqType) => (
                    <Option key={reqType} value={reqType}>
                      {reqType}
                    </Option>
                  ))}
                </Combobox>
              )}
            />
          </Field>
          <hr />
          <Field label="Pay System">
            <Controller
              name="paySystem"
              control={control}
              render={({ field }) => (
                <Combobox
                  clearable
                  autoComplete="on"
                  {...field}
                  selectedOptions={[field.value ?? ""]}
                  onOptionSelect={(_event, data) => {
                    field.onChange(data.optionValue ?? "");
                  }}
                  value={field.value}
                >
                  {PAYSYSTEMS.map((system) => (
                    <Option key={system.key} value={system.key}>
                      {system.key}
                    </Option>
                  ))}
                </Combobox>
              )}
            />
          </Field>
          <hr />
          <Field label="Series">
            <Controller
              name="series"
              control={control}
              render={({ field }) => (
                <Input type="search" maxLength={4} {...field} />
              )}
            />
          </Field>
          <hr />
          <Field label="Grade">
            <Controller
              name="grade"
              control={control}
              render={({ field }) => (
                <Combobox
                  clearable
                  autoComplete="on"
                  {...field}
                  selectedOptions={[field.value ?? ""]}
                  onOptionSelect={(_event, data) => {
                    field.onChange(data.optionValue ?? "");
                  }}
                  value={field.value}
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
              )}
            />
          </Field>
          <hr />
          <Field label="Office Symbol">
            <Controller
              name="officeSymbol"
              control={control}
              render={({ field }) => <Input type="search" {...field} />}
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
            <Controller
              name="stage"
              control={control}
              render={({ field }) => (
                <Combobox
                  clearable
                  autoComplete="on"
                  {...field}
                  selectedOptions={[field.value ?? ""]}
                  onOptionSelect={(_event, data) => {
                    field.onChange(data.optionValue ?? "");
                  }}
                  value={field.value}
                >
                  {STAGES.map((stage) => (
                    <Option key={stage.key} text={stage.text} value={stage.key}>
                      {stage.text}
                    </Option>
                  ))}
                </Combobox>
              )}
            />
          </Field>
          <hr />
          <Field label="Created After">
            <Controller
              name="afterDate"
              control={control}
              render={({ field }) => (
                <>
                  <DatePicker
                    allowTextInput
                    formatDate={(date?: Date) => {
                      return !date ? "" : date.toLocaleDateString();
                    }}
                    onSelectDate={field.onChange}
                    {...field}
                  />
                  <Button
                    appearance="primary"
                    style={{ marginTop: "2px" }}
                    onClick={() => field.onChange(undefined)}
                  >
                    Clear
                  </Button>
                </>
              )}
            />
          </Field>
          <hr />
          <Field label="Created Before">
            <Controller
              name="beforeDate"
              control={control}
              render={({ field }) => (
                <>
                  <DatePicker
                    formatDate={(date?: Date) => {
                      return date instanceof Date
                        ? date.toLocaleDateString()
                        : date ?? "";
                    }}
                    onSelectDate={field.onChange}
                    showCloseButton
                    {...field}
                  />
                  <Button
                    appearance="primary"
                    style={{ marginTop: "2px" }}
                    onClick={() => field.onChange(undefined)}
                  >
                    Clear
                  </Button>
                </>
              )}
            />
          </Field>
        </DrawerBody>
        <DrawerFooter>
          <Button appearance="primary" type="submit" value="submit">
            Apply
          </Button>
          <Button
            onClick={() => reset(undefined, { keepDefaultValues: false })}
          >
            Clear All
          </Button>
        </DrawerFooter>
      </form>
    </Drawer>
  );
};

export default FilterRequestsDrawer;
