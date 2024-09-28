import { Col, Modal, ModalBody, Row, Spinner } from "reactstrap";
import TaskCard from "../common/TaskCard";
import { useEffect, useState } from "react";
import DetailSidebar from "../Products/DetailSidebar";
import { getSingleModule } from "../../store/modules/moduleThunk";
import { useDispatch, useSelector } from "react-redux";
import { getModulesInProfile } from "../../services/api/user";
import toast from "react-hot-toast";
import AddProductForm from "../Products/AddProductForm";
import { useNavigate } from "react-router-dom";
import { postTypes } from "../../pages/products/Products";
import ProductsAttachments from "../Products/ProductAttachments";
const MyTasks = ({ data, urls, loader, setData }) => {
  const { userProfile } = useSelector((state) => state.Auth);
  const [detailAside, setDetailAside] = useState(false);
  const [modifyRow, setModifyRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState(null);
  const [moduleType, setModuleType] = useState({});
  const [actionLoader, setActionLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [show, setShow] = useState(false);
  const [formik, setFormik] = useState(null);
  const dispatch = useDispatch();
  const router = useNavigate();
  const getTitle = (slug) => {
    const result = urls.find((x) => x.slug == slug);
    return result.label;
  };
  const getSingle = (id, slug) => {
    setDetailAside(true);
    dispatch(getSingleModule({ slug: slug.replace(/s$/, ""), id: id }));
  };
  const updateSlugRecord = async () => {
    setActionLoader(true);
    try {
      const response = await getModulesInProfile(type, userProfile.id);
      setData((prevData) => ({ ...prevData, [type]: response.data?.data }));
    } catch (errors) {
      const { response } = errors;
      toast.error(response?.data?.message || "Something went wrong");
    } finally {
      setActionLoader(false);
    }
  };
  const getSlugItem = () => {
    setModuleType(
      postTypes[0].options.find((x) => x.slug.replace(/s$/, "") == type)
    );
  };
  useEffect(() => {
    if (type) getSlugItem();
  }, [type]);
  return (
    <>
      {Object.keys(data).map((i, index) => (
        <>
          <Row className="px-2" key={`main-${i}-${index + 1}`}>
            {data[i].map((item) => (
              <Col className="mt-4" xs={12} key={`task-${item.uuid}`}>
                <TaskCard
                  setModifyRow={() => {
                    getSingle(item.uuid, i);
                    setDetailAside(true);
                  }}
                  setType={() => {
                    setType(i);
                  }}
                  slug={i}
                  data={item}
                  setModalVisible={setModalVisible}
                  loader={loader}
                  setModifyRowData={setModifyRow}
                />
              </Col>
            ))}
          </Row>
        </>
      ))}
      {loader ? (
        <div className="px-2">
          <Spinner className="mt-4" color="success" />
        </div>
      ) : null}
      {detailAside ? (
        <DetailSidebar
          current={type?.replace(/s$/, "")}
          setShow={setDetailAside}
          page={{ current: currentPage, set: setCurrentPage }}
          modifyData={setModifyRow}
          updateSlugRecord={updateSlugRecord}
          actionLoader={actionLoader}
        />
      ) : null}
      <Modal
        isOpen={modalVisible}
        size="lg"
        modalClassName="d-flex justify-content-center flex-column"
        className="modal-md-s-lg customized-modal"
      >
        <ModalBody className="pt-2 pb-3 px-0">
          <div className="modal-header-wrap border-bottom pb-2 mb-0">
            <div>
              <h5 className="mb-0 d-flex align-items-center justify-content-between">
                <b className="me-3">Edit Post</b>
                <b>{moduleType.label}</b>
              </h5>
            </div>
          </div>
          <AddProductForm
            moduleType={moduleType}
            setModalVisible={setModalVisible}
            setShowAttachment={setShow}
            attachmentShow={show}
            schema={moduleType?.schema}
            setFormik={setFormik}
            router={router}
            editData={modifyRow}
            setUploadedFiles={setUploadedFiles}
            updateRecordRequest={updateSlugRecord}
          />
        </ModalBody>
      </Modal>
      <ProductsAttachments
        editAttachments={modifyRow?.attachments || []}
        formik={formik}
        show={show}
        setShow={setShow}
        setUploadedFiles={setUploadedFiles}
        uploadedFiles={uploadedFiles}
      />
    </>
  );
};

export default MyTasks;
