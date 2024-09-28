import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { withTranslation } from "react-i18next";
import { acceptTermsConditions } from "../../services/api/user";
import toast from "react-hot-toast";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTermsCondition } from "../../store/auth/authSlice";
const TermsModal = ({ show, t, setShow }) => {
  const translate = t("termsOfUse", { returnObjects: true });
  const purposeRegionalConceptTranslate = t("purposeRegionalConcept", {
    returnObjects: true,
  });
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const acceptRequest = async () => {
    setLoader(true);
    try {
      const res = await acceptTermsConditions({ terms_and_conditions: 1 });
      toast.success(res.data.message);
      dispatch(updateTermsCondition(1));
      setShow(false);
    } catch (errors) {
      const { response } = errors;
      toast.error(response.data.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };
  return (
    <Modal isOpen={show} scrollable={true} size="xl">
      <ModalHeader className="modal-title">
        Terms of use for regional concept
      </ModalHeader>
      <ModalBody className="pt-0">
        <p className={`mb-4 text-muted`}>{t("termsWebsiteInfo")}</p>
        {Object.keys(purposeRegionalConceptTranslate).map((x, key) => (
          <div key={`list___${key}`}>
            {x == "title" ? (
              <h6 className={`fs-15 ${key !== 0 ? "mt-4" : ""}`}>
                {purposeRegionalConceptTranslate.title}
              </h6>
            ) : (
              <>
                <div className="d-flex mt-2">
                  <div className="flex-shrink-0">
                    <i className="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <p className="text-muted mb-0">
                      {purposeRegionalConceptTranslate[x]}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        <p className={`mt-4 text-muted`}>{t("usingTheRegionalConcept")}</p>
        {Object.keys(translate).map((i, key) => (
          <div key={`list__${key}`}>
            {Object.keys(translate[i]).map((x) => (
              <div key={`list____${key}`}>
                {x == "title" ? (
                  <h6 className={`fs-15 ${key !== 0 ? "mt-4" : "mt-2"}`}>
                    {translate[i].title}
                  </h6>
                ) : (
                  <>
                    <div className="d-flex mt-2">
                      <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                      </div>
                      <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">{translate[i][x]}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </ModalBody>
      <div className="modal-footer">
        <Button disabled={loader} color="success" onClick={acceptRequest}>
          I Accept Terms and conditions
        </Button>
      </div>
    </Modal>
  );
};

export default withTranslation()(TermsModal);
