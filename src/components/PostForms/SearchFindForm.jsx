import { Col, Input, Label, Row } from "reactstrap";
import FindListIcon from "../../assets/images/find-list.png";
import ClockIcon from "../../assets/images/clock.png";
import CurrencyIcon from "../../assets/images/currency.png";
import Select from "react-select";
const SearchFindForm = () => {
  const postTypes = [
    {
      options: [
        { label: "Product", value: "product" },
        { label: "Search & Find", value: "search & find" },
        { label: "Help offered", value: "help offered" },
        { label: "Help Searched", value: "help searched" },
        { label: "Event", value: "event" },
      ],
    },
  ];
  return (
    <div>
      <div className="d-flex align-items-end">
        <div className="flex-1 me-4">
          <Label className="form-label">
            Title&nbsp;<span className="text-danger">*</span>
          </Label>
          <Input type="text" placeholder="Title" />
        </div>
        <div>
          <img src={FindListIcon} height="40px" alt="cart" />
        </div>
      </div>
      <div className="mt-3">
        <Label className="form-label" htmlFor="password">
          Description&nbsp;<span className="text-danger">*</span>
        </Label>
        <Input
          type="textarea"
          placeholder="Description"
          style={{ height: "80px" }}
        />
      </div>
      <Row>
        <Col md={6} className="mt-3">
          <Label className="form-label" htmlFor="password">
            Visibilty&nbsp;<span className="text-danger">*</span>
          </Label>
          <Select placeholder="Select Visiblity" options={postTypes} />
        </Col>
        <Col md={6} className="mt-3">
          <Label className="form-label" htmlFor="password">
            Scope&nbsp;<span className="text-danger">*</span>
          </Label>
          <Select placeholder="Select Scope" options={postTypes} />
        </Col>
      </Row>
    </div>
  );
};
export default SearchFindForm;
