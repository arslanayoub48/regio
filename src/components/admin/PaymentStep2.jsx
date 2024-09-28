import { Row, Col, Label } from "reactstrap";
import ClockIcon from "../../assets/images/clock.png";
import CurrencyIcon from "../../assets/images/currency.png";
import { FormInput } from "../Forms/FormsElements";
const PaymentStep2 = ({ formik }) => {
  return (
    <div className="">
      <ul className="mb-0 list-unstyled pb-3 d-flex">
        <li className="me-4 mb-3">
          <div className="">
            <img src={ClockIcon} width="40px" alt="clock" />
            <span className="text-success ms-2">
              <b>5304min</b>
            </span>
          </div>
        </li>
        <li className="me-4 mb-3">
          <div className="d-flex align-items-center">
            <img src={CurrencyIcon} width="40px" alt="clock" />
            <span className="text-success ms-2">
              <b>
                9.678
                <sub>R</sub>
                <small className="text-success d-block">
                  Available 13,50&nbsp;R
                </small>
              </b>
            </span>
          </div>
        </li>
      </ul>
      <h6 className="mb-2 d-flex">
        <b className="mb-2 d-block" style={{ width: "80px" }}>
          Recipient:
        </b>
        &nbsp;
        <span className="text-success">{formik.values.user_id.label}</span>
      </h6>
      <h6 className="mb-4 d-flex">
        <b className="mb-2 d-block" style={{ width: "80px" }}>
          Purpose:
        </b>
        &nbsp;
        <span className="text-success">{formik.values.purpose}</span>
      </h6>
      <Row>
        <Col xs={12} className="mb-3">
          <Label className="form-label">Confirm with your pin number</Label>
          <FormInput
            formik={formik}
            type="password"
            noError={true}
            name="pin"
            placeholder="Enter Pin"
          />
        </Col>
      </Row>
    </div>
  );
};
export default PaymentStep2;
