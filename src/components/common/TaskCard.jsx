import { Button } from "reactstrap";
import CurrencyIcon from "../../assets/images/currency.png";
import ClockIcon from "../../assets/images/clock.png";
import { postTypes } from "../../pages/products/Products";
import { useSelector } from "react-redux";
import Scope from "../../assets/images/scope.jpg";
import VisibliityID from "../../assets/images/visibility_id.jpg";
const TaskCard = ({
  data,
  setModifyRow,
  setType,
  setModalVisible,
  loader,
  setModifyRowData,
  slug,
}) => {
  const { adminRole } = useSelector((state) => state.Auth);
  const setModify = () => {
    setModifyRow();
    setType();
  };
  const getSlugItem = () => {
    return postTypes[0].options.find((x) => x.slug.replace(/s$/, "") == slug);
  };
  return (
    <div
      className="d-flex px-3 justify-content-between card-tile align-items-center border-top border-start border-end py-2"
      style={{
        borderBottom: `3px solid ${getSlugItem().color}`,
      }}
    >
      <div className="d-flex align-items-center w-25">
        <img height="40px" className="me-3" src={getSlugItem().icon} />
        <h5 className="mb-0 text-success">{data?.title}</h5>
      </div>
      <div>
        <ul className="mb-0 list-unstyled d-flex align-items-center">
          <li className="me-3">
            <img src={Scope} alt="scope" height="15px" />
          </li>
          <li className="me-4">
            <img src={VisibliityID} alt="visibility id" height="15px" />
          </li>
          <li className="d-flex align-items-center">
            <i
              className="ri-image-2-line me-2"
              style={{ fontSize: "20px", color: "var(--vz-heading-color)" }}
            ></i>
            <span className="text-success text-underline">
              <b>{data?.attachments?.length || 0}pic</b>
            </span>
          </li>
        </ul>
      </div>
      <div>
        <ul className="mb-0 list-unstyled d-flex align-items-center">
          <li className="ms-auto me-3">
            <div className="">
              <span className="text-success me-2 text-underline">
                <b>
                  {data?.price_in_minutes ? data?.price_in_minutes : "0.00"}
                  <sub>x</sub>
                </b>
              </span>
              <img src={ClockIcon} width="20px" height="20px" alt="clock" />
            </div>
          </li>

          <li className="me-4">
            <div className="">
              <span className="text-success me-2 text-underline">
                <b>
                  {data?.price_in_regio ? data?.price_in_regio : "0.00"}
                  <sub>R</sub>
                </b>
              </span>
              <img src={CurrencyIcon} width="20px" height="20px" alt="clock" />
            </div>
          </li>

          <li className="me-3">
            <Button
              color="success"
              onClick={() => {
                if (data.is_user_post || adminRole) {
                  setType();
                  setModalVisible(true);
                  setModifyRowData(data);
                } else {
                  return false;
                }
              }}
              disabled={loader}
              className="px-4 py-1"
            >
              {data.is_user_post || adminRole ? "Modify" : "Contact"}
            </Button>
          </li>
          <li>
            <button
              onClick={setModify}
              style={{ fontSize: "20px", color: "var(--vz-heading-color)" }}
              className="border-0 bg-transparent"
              type="button"
              disabled={loader}
            >
              <i className="ri ri-eye-line" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TaskCard;
