import { Label } from "reactstrap";
import { AsyncFormSelect, FormInput } from "../Forms/FormsElements";
import { fetchCountries } from "../../utils/helpers";
const RegionStep1 = ({ formik, show }) => {
  const fetchCountresRecord = (e) => {
    if (show) {
      return fetchCountries(e);
    } else {
      return [];
    }
  };
  return (
    <div>
      <div className="mb-3">
        <Label className="form-label">Region Name</Label>
        <FormInput name="full_name" formik={formik} />
      </div>
      <div className="mb-3">
        <Label className="form-label">Country</Label>
        <AsyncFormSelect
          formik={formik}
          name="country_id"
          placeholder="Select Country"
          loadOptions={fetchCountresRecord}
        />
      </div>
      <div className="mb-3">
        <Label className="form-label">E-mail-Address of owner</Label>
        <FormInput name="email" type="email" formik={formik} />
      </div>
    </div>
  );
};
export default RegionStep1;
