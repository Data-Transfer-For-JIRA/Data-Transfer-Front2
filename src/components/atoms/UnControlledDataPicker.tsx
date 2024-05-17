import React from 'react';
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { TextField } from '@mui/material';

type MuiDatePickerType = {
  datePickerProps?: Omit<DatePickerProps<Dayjs>, 'error'> & React.RefAttributes<HTMLDivElement>;
};

export default function UnControlledDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ datePickerProps, ...props }: MuiDatePickerType & UseControllerProps<TFieldValues, TName>) {
  const { field, fieldState: { error } } = useController(props);

  const formatDateToString = (date: Dayjs | null) => {
    return date ? date.format('YYYY-MM-DD') : null;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          {...datePickerProps}
          value={field.value ? dayjs(field.value) : null}
          onChange={(date) => field.onChange(formatDateToString(date))}
          onError={(err) => {
            if (err) {
              // Handle error here
            }
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        {error && (
          <div style={{ color: 'red' }}>
            {error.message}
          </div>
        )}
      </DemoContainer>
    </LocalizationProvider>
  );
}
