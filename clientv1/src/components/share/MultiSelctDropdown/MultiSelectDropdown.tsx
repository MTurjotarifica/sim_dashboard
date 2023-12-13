import { Button, MultiSelect } from "@mantine/core";
import React from "react";

interface SelectItem {
  label: string;
  value: string;
  allData: string[];
}

interface MultiSelectDropdownProps {
  label: string;
  placeholder: string;
  allData: any;
  value: any;
  setSelectedValue: (value: any) => void;
}
const MultiSelectDropdown = ({
  label,
  placeholder,
  allData,
  value,
  setSelectedValue,
}: MultiSelectDropdownProps) => {
  const onValueChange = (value: Array<string>) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <MultiSelect
        className="overflow-scroll max-h-[550px]"
        label={label}
        placeholder={placeholder}
        dropdownPosition="flip"
        clearable
        data={allData as (string | SelectItem)[]}
        value={value}
        searchable
        onChange={onValueChange}
      />
      <Button
        className="w-half my-2"
        placeholder="Select Dates"
        variant="outline"
        onClick={() => setSelectedValue([])}
      >
        Clear All
      </Button>
    </div>
  );
};

export default MultiSelectDropdown;
