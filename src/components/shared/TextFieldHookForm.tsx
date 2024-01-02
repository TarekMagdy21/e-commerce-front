import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

interface TextFieldHookFormProps {
  sx?: Record<string, string | number>;
  name: string;
  control: any; // Replace 'any' with the actual type from react-hook-form
  label: string;
  isRequired?: boolean;
  defaultValue?: string;
  variant?: string;
  type?: string;
  id?: string;
  errors: any; // Replace 'any' with the actual type from react-hook-form
  disabled?: boolean;
  placeholder?: string;
  classNameDiv?: string;
  InputProps?: Record<string, any>;
  multiline?: boolean;
  rows?: number;
  onChangeData?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldHookForm: React.FC<TextFieldHookFormProps> = ({
  sx = {},
  name,
  control,
  label,
  isRequired = true,
   variant = "outlined",
  type = "text",
  id = label,
  errors,
  disabled = false,
  placeholder = label,
  classNameDiv = "items-center",
  InputProps = {},
  multiline = false,
  rows = 0,
  onChangeData = () => {},
}) => {
  return (
    <div className={classNameDiv}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            id={id}
            multiline={multiline}
            rows={rows}
            disabled={disabled}
            {...field}
            label={label}
            sx={sx}
            InputProps={InputProps}
            // defaultValue={defaultValue}
            placeholder={placeholder}
            className="w-full"
            type={type}
            variant={variant as any}
            error={Boolean(errors)}
            helperText={errors?.message}
            onChange={(e:any) => {
              field.onChange(e.target.value);
              onChangeData(e);
            }}
            required={isRequired}
            onKeyDown={(event:any) => {
              if (event.key === " " && event.target.selectionStart === 0) {
                event.preventDefault();
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default TextFieldHookForm;
