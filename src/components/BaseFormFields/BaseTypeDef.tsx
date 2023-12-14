import { ReactNode } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

export interface BaseFormField<T extends FieldValues>
  extends UseControllerProps<T> {
  /** Adds a label to the form field with this text */
  labelText?: string;
  /** Adds an info button to the label with this text */
  labelInfo?: string;
  /** Replace the default label icon with a custom one */
  labelIcon?: ReactNode;
  /** Child JSX -- example Options for Combobox */
  children?: ReactNode;
}
