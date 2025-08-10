import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

export interface Option<T> {
  value: T;
  label: React.ReactNode;
}

interface RadioButtonsProps<T> {
  options: readonly Option<T>[];
  defaultValue: T;
  direction?: "row" | "column";
  onChange?: (value: string) => void;
}
const RadioButtonGroup = <T,>({
  options,
  defaultValue,
  direction,
  onChange,
}: RadioButtonsProps<T>) => {
  return (
    <RadioGroup
      onChange={({ target }) => onChange?.(target.value)}
      defaultValue={defaultValue}
      name="radio-buttons-group"
      row={direction !== "column"}
    >
      {options.map((opt) => (
        <FormControlLabel
          value={opt.value}
          control={<Radio />}
          label={opt.label}
        />
      ))}
    </RadioGroup>
  );
};

export default RadioButtonGroup;
