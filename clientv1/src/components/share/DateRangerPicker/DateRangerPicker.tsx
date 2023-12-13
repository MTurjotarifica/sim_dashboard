import React from "react";

import { DatePickerInput, DatePickerInputProps } from "@mantine/dates";
import { IconCalendar, IconLoader2 } from "@tabler/icons-react";
import { getLocaleDateFormat } from "@/libs/day";

type DateRangePickerProps = Omit<DatePickerInputProps<"range">, "type"> & {
  loading?: boolean;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  loading = false,
  label = "Date",
  icon,
  ...props
}) => {
  return (
    <DatePickerInput
      label={label}
      type="range"
      firstDayOfWeek={0}
      allowSingleDateInRange
      clearable={false}
      valueFormat={getLocaleDateFormat()}
      disabled={loading}
      icon={
        loading ? (
          <IconLoader2 size="1rem" className="animate-spin" />
        ) : (
          <IconCalendar size="1rem" />
        )
      }
      {...props}
    />
  );
};

export default DateRangePicker;
