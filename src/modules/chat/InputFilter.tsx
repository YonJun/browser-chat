import { TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";

export type InputFilterPureProps = TextFieldProps & {
  filterKey?: string;
  onChangeFilterKey?: (e: string) => void;
};

type InputFilterProps = TextFieldProps & InputFilterPureProps;
export function InputFilter(props: InputFilterProps) {
  const { filterKey: filterKeyParam, onChangeFilterKey, ...rest } = props;

  const [filterKey, set_filterKey] = useState("");

  const filterKeyValue =
    typeof filterKeyParam !== "undefined" ? filterKeyParam : filterKey;

  const onChangeInputFilterKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeFilterKey) {
      onChangeFilterKey(e.currentTarget.value);
    } else {
      set_filterKey(e.currentTarget.value);
    }
  };

  return (
    <TextField
      label="Buscar chat"
      variant="outlined"
      size="small"
      fullWidth
      value={filterKeyValue}
      onChange={onChangeInputFilterKey}
      {...rest}
    />
  );
}
