import Select from "react-select";
import { FormFeedback, Input } from "reactstrap";
import AsyncSelect from "react-select/async";
export const FormInput = ({
  formik,
  name,
  type,
  noError,
  placeholder,
  style,
  classes,
  readOnly,
}) => {
  return (
    <>
      <Input
        name={name}
        type={type || "text"}
        className={`${classes} form-control`}
        placeholder={placeholder}
        onChange={formik.handleChange}
        value={formik.values[name] || ""}
        onBlur={formik.handleBlur}
        invalid={formik.touched[name] && formik.errors[name]}
        style={style}
        readOnly={readOnly || ""}
        {...(type == "switch" && {
          checked: formik.values[name] || "",
        })}
      />
      {formik.touched[name] && formik.errors[name] && !noError ? (
        <FormFeedback type="invalid">{formik.errors[name]}</FormFeedback>
      ) : null}
    </>
  );
};

export const FormSelect = ({
  options,
  multiple,
  formik,
  placeholder,
  name,
}) => {
  const getValue = () => {
    if (formik.values[name] && !multiple) {
      return options.find((x) => x.value == formik.values[name]);
    } else if (formik.values[name] && multiple) {
      formik.values[name].map((x) => options.find((i) => i.value == x));
    } else {
      return null;
    }
  };
  return (
    <>
      <Select
        placeholder={placeholder}
        name={name}
        onChange={(val) => formik.setFieldValue(name, val)}
        value={getValue()}
        onBlur={formik.handleBlur}
        options={options}
        isMulti={multiple || false}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <FormFeedback className="d-block" type="invalid">
          {formik.errors[name]}
        </FormFeedback>
      ) : null}
    </>
  );
};

export const AsyncFormSelect = ({
  loadOptions,
  multiple,
  formik,
  placeholder,
  name,
  disabled,
}) => {
  const getValue = () => {
    if (formik.values[name] && !multiple) {
      return {
        value: formik.values[name].value,
        label: formik.values[name].label,
      };
    } else if (formik.values[name] && multiple) {
      return formik.values[name].map((x) => ({
        value: x.value,
        label: x.label,
      }));
    }
  };
  return (
    <>
      <AsyncSelect
        placeholder={placeholder}
        cacheOptions
        loadOptions={(inputValue) => loadOptions(inputValue)}
        isMulti={multiple}
        value={getValue()}
        onChange={(val) => formik.setFieldValue(name, val)}
        isDisabled={disabled}
        defaultOptions={true}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <FormFeedback className="d-block" type="invalid">
          {formik.errors[name]}
        </FormFeedback>
      ) : null}
    </>
  );
};
