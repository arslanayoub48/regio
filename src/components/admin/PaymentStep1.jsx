import { Label } from "reactstrap";
import { AsyncFormSelect, FormInput } from "../Forms/FormsElements";
import { loadScopeUsers } from "../../utils/helpers";
import ClockIcon from "../../assets/images/clock.png";
import CurrencyIcon from "../../assets/images/currency.png";
import { Row, Col } from "reactstrap";
const PaymentStep1 = ({ formik }) => {
  return (
    <div>
      <div className="mb-3">
        <Label className="form-label">Select Users</Label>
        <AsyncFormSelect
          formik={formik}
          name="user_id"
          placeholder="Select Users"
          loadOptions={loadScopeUsers}
        />
      </div>
      <div className="mb-3">
        <Label className="form-label">Purpose / Referance</Label>
        <FormInput name="purpose" formik={formik} />
      </div>
      <Row className="pt-3">
        <Col md={6} className="mb-3">
          <div className="d-flex">
            <img
              src={ClockIcon}
              alt="clock icon"
              height="30px"
              className="me-3"
            />
            <FormInput
              formik={formik}
              type="text"
              noError={true}
              name="transferred_minutes"
              placeholder="Amount in minutes"
            />
          </div>
        </Col>
        <Col md={6} className="mb-3">
          <div className="d-flex">
            <img
              src={CurrencyIcon}
              alt="clock icon"
              height="30px"
              className="me-3"
            />
            <div>
              <FormInput
                type="text"
                name="transferred_fiat"
                formik={formik}
                noError={true}
                placeholder="Amount in Regio"
                classes="align-self-start"
              />
              <small className="text-success">Available 13,50&nbsp;R</small>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default PaymentStep1;
