import { Label } from "reactstrap";
import { FormInput } from "../Forms/FormsElements";
const RegionStep2 = ({ formik }) => {
  return (
    <div>
      <div className="mb-3">
        <Label className="form-label">Created Region Number</Label>
        <FormInput readOnly name="hex_id" formik={formik} />
      </div>
      <div className="mb-3">
        <Label className="form-label">Full Region Name</Label>
        <FormInput readOnly name="full_region_name" formik={formik} />
      </div>
      <div className="mb-3">
        <Label className="form-label">E-mail Address for Region</Label>
        <FormInput
          type="email"
          name="local_email"
          readOnly
          formik={formik}
          placeholder="Email-Address of owner"
        />
      </div>
    </div>
  );
};
export default RegionStep2;
