import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { uploadModules } from "../../services/api/user";
import toast from "react-hot-toast";

const ProductsAttachments = ({
  show,
  setShow,
  formik,
  editAttachments,
  uploadedFiles,
  setUploadedFiles,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loader, setLoader] = useState(false);
  const handleFileChange = (event) => {
    const droppedFiles = Array.from(event.target.files);
    setSelectedFiles([
      ...selectedFiles,
      ...droppedFiles.map((x) => {
        return {
          file: x,
          isPrimary: selectedFiles.length > 0 ? false : true,
        };
      }),
    ]);
  };

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const droppedFiles = Array.from(event.dataTransfer.files);
      setSelectedFiles([
        ...selectedFiles,
        ...droppedFiles.map((x) => {
          return {
            file: x,
            isPrimary: selectedFiles.length > 0 ? false : true,
          };
        }),
      ]);
    },
    [selectedFiles]
  );

  const deleteItem = (file) =>
    setSelectedFiles(selectedFiles.filter((x) => x.file.name !== file));

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      formik?.setFieldValue("attachments", uploadedFiles);
    }
    setShow(false);
    // uploadedFiles.map((x, i) => {
    //   formik.setFieldValue(
    //     `attachments.${i}.is_primary`,
    //     selectedFiles[i].is_primary
    //   );
    // });
  }, [uploadedFiles]);
  const SubmitUploadModules = async () => {
    if (selectedFiles.length > 0) {
      setLoader(true);
      const formData = new FormData();
      selectedFiles.map((list, i) => {
        formData.append(`documents[${i}]`, list.file);
      });
      try {
        const res = await uploadModules(formData);
        toast.success("Documents uploaded successfully.");
        setUploadedFiles([...uploadedFiles, ...res.data.data]);
      } catch (errors) {
        const { response } = errors;
        toast.error(response.data.message || "Something went wrong.");
      } finally {
        setLoader(false);
      }
    }
  };
  const updateiSPrimary = (index) => {
    setSelectedFiles(
      selectedFiles.map((file, i) => {
        if (index === i) {
          return {
            ...file,
            isPrimary: !file.isPrimary,
          };
        } else {
          return file;
        }
      })
    );
  };
  useEffect(() => {
    if (editAttachments.length > 0) {
      setUploadedFiles(editAttachments);
    }
  }, [editAttachments]);
  return (
    <>
      <Modal isOpen={show} scrollable={true} size="lg">
        <ModalHeader className="border-bottom">Manage Attachments</ModalHeader>
        <ModalBody>
          <div>
            <label
              className="dropzone-attachment text-center d-flex flex-column justify-content-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="d-none"
              />
              <div>
                <i
                  className="ri-upload-cloud-2-fill"
                  style={{ fontSize: "50px" }}
                ></i>
              </div>
              <p className="mb-0">
                Drag & drop files here, or click to select files
              </p>
            </label>
            {selectedFiles.length > 0 && (
              <Row>
                <Col className="col-lg-6 mt-3">
                  <h5 className="mb-4 text-center text-success">Images</h5>
                  <div>
                    {selectedFiles
                      .filter((x) => x.file.type.includes("image"))
                      .map((list, index) => (
                        <div className="d-flex mt-3" key={index}>
                          <div className="me-2 d-flex align-items-center">
                            <img
                              src={URL.createObjectURL(list.file)}
                              width="130px"
                              height="130px"
                              alt={list.file.name}
                              className="object-fit-cover"
                            />
                          </div>
                          <div className="align-self-center">
                            <div className="align-items-center d-flex">
                              {/* <button
                                type="button"
                                className="bg-transparent border-0 me-2"
                                onClick={() =>
                                  index !== 0 ? updateiSPrimary(index) : null
                                }
                              >
                                <i
                                  className={`${
                                    list.isPrimary
                                      ? "ri-star-fill"
                                      : "ri-star-line"
                                  }`}
                                  style={{
                                    fontSize: "35px",
                                    color: list.isPrimary
                                      ? "#ffce08"
                                      : "inherit",
                                  }}
                                ></i>
                              </button> */}
                              <div className="align-self-center">
                                <p className="mb-0 word-break-all">
                                  {list.file.name}
                                </p>
                                <ul className="list-unstyled mb-0 d-flex align-items-center">
                                  <li className="mt-3 me-3">
                                    <a
                                      href="#"
                                      className="text-decoration-underline"
                                    >
                                      Edit
                                    </a>
                                  </li>
                                  <li className="mt-3">
                                    <a
                                      href="#"
                                      className="text-decoration-underline"
                                      onClick={() => deleteItem(list.file.name)}
                                    >
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </Col>
                <Col className="col-lg-6 mt-3">
                  <h5 className="mb-4 text-success text-center">Documents</h5>
                  <div>
                    {selectedFiles
                      .filter((x) => !x.file.type.includes("image"))
                      .map((file, index) => (
                        <div className="d-flex mt-3" key={index}>
                          <div className="me-2 d-flex align-items-center">
                            <i
                              className={
                                file.file.type.includes("zip")
                                  ? `ri-folder-zip-fill`
                                  : file.file.type.includes("video")
                                  ? `ri-file-video-fill`
                                  : "ri-file-text-fill"
                              }
                              style={{
                                fontSize: "130px",
                                lineHeight: 1,
                                color: "#4a4a4a",
                              }}
                            ></i>
                          </div>
                          <div className="align-self-center">
                            <p className="mb-0 word-break-all">
                              {file.file.name}
                            </p>
                            <ul className="list-unstyled mb-0 d-flex align-items-center">
                              <li className="mt-3 me-3">
                                <a
                                  href="#"
                                  className="text-decoration-underline"
                                >
                                  Edit
                                </a>
                              </li>
                              <li className="mt-3">
                                <a
                                  href="#"
                                  className="text-decoration-underline"
                                  onClick={() => deleteItem(file.file.name)}
                                >
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="border-top">
          <Button
            type="button"
            className="me-3"
            color="light"
            disabled={loader}
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={selectedFiles.length == 0 || loader}
            color="success"
            onClick={SubmitUploadModules}
          >
            Save and return
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProductsAttachments;
