import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../utlis/admin/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { decode, encode } from "base-64";
import moment from "moment";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { status } from "../../../utlis/common.utlis";
import { routes } from "../../../utlis/admin/routes.utlis";
import { Modal, ModalBody } from "react-bootstrap";
import toast from "react-hot-toast";

const Details = () => {
  const navigate = useNavigate();
  const [stat, setStat] = useState({ status: false, value: null, name: null });
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getAdsDetails = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setDetails(response.data.data);
    } else setDetails();
    setLoading(false);
  };

  const changeStatus = async (status) => {
    setLoading(true);
    const form = JSON.stringify({
      status: parseInt(status),
    });
    const response = await ApiService.putAPIWithAccessToken(
      api.advertisementChangeStatus + `${decode(id)}`,
      form
    );
    setStat({ status: false, value: null });
    if (response.data.status && response.data.statusCode === 200) {
      getAdsDetails(api.advertisementDetail + `${decode(id)}`);
      toast.success(response.data.message);
    } else toast.error(response.data.message);
    setLoading(false);
  };

  useEffect(() => {
    getAdsDetails(api.advertisementDetail + `${decode(id)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <Link
              className="btn-back"
              to=""
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              <i className="mdi mdi-arrow-left-thin"></i>
            </Link>
            Advertisement Detail
          </h3>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card statistics-card-1 card-img-holder text-dark position-relative">
                <div className="card-body align-items-center d-flex">
                  <div className="d-flex justify-content-between w-100">
                    <div className="care-for-profile-img me-3 d-flex align-items-center">
                      {details?.createdBy?.profile_image === null ||
                      details?.createdBy?.profile_image === "" ||
                      details?.createdBy?.profile_image === undefined ? (
                        <img
                          src={NoImage}
                          alt=""
                          className="me-2"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      ) : (
                        <img
                          src={details?.createdBy?.profile_image}
                          alt=""
                          className="me-2"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      )}
                      <div className="">
                        <h5 className="">
                          {details?.createdBy?.fullname ?? "NA"}
                        </h5>
                        <p className="m-0">
                          Posted on :{" "}
                          {moment(details?.created_date).format(
                            "MM-DD-yyyy hh:mm A"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        {details?.createdBy?.user_type === null ||
                        details?.createdBy?.user_type === undefined ||
                        details?.createdBy?.user_type === "" ? null : details
                            ?.createdBy?.user_type == 4 ? null : details
                            ?.createdBy?.user_type == 2 ? (
                          <button
                            type="button"
                            className="btn-gr"
                            onClick={() =>
                              navigate(
                                routes.providerDetails +
                                  "/" +
                                  encode(details?.createdBy?.provider_id)
                              )
                            }
                          >
                            View Profile
                          </button>
                        ) : (
                          <button type="button" className="btn-gr">
                            View Profile
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mt-3">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title text-capitalize">
                    {details?.title ?? "NA"}
                  </h4>
                </div>
                <div>
                  {details?.status == 0 ? (
                    <div>
                      <button
                        className="btn btn-gradient-primary me-2"
                        onClick={(e) =>
                          setStat({ status: true, value: 1, name: "Approve" })
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-gradient-danger"
                        onClick={(e) =>
                          setStat({ status: true, value: 3, name: "Reject" })
                        }
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="select">
                      <select
                        name="format"
                        id="format"
                        className={
                          details?.status == 1 ? "green-select" : "red-select"
                        }
                        onChange={(e) =>
                          setStat({
                            status: true,
                            value: e.target.value,
                            name: status(e.target.value),
                          })
                        }
                      >
                        <option
                          selected={details?.status == 1 ? true : false}
                          value="1"
                        >
                          Active
                        </option>
                        <option
                          selected={details?.status == 2 ? true : false}
                          value="2"
                        >
                          Inactive
                        </option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="iq-card-body">
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="form-group col-md-4 mb-0">
                        <label>Start Date</label>
                        <p>
                          {moment(details?.start_date).format("MM-DD-yyyy")}
                        </p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="lname">Time</label>
                        <p>{moment(details?.created_date).format("hh:mm A")}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Ad ID</label>
                        <p>{details?.id}</p>
                      </div>
                      <div className="form-group col-md-12 mb-0">
                        <label for="add1">Tags</label>
                        <div className="d-flex mt-2">
                          {details?.tags?.length !== 0
                            ? details?.tags?.map((ele, indx) => {
                                return (
                                  <p key={indx} className="me-2">
                                    <Link to="" className="px-4 tags-btn-line">
                                      {ele.name ?? "NA"}
                                    </Link>
                                  </p>
                                );
                              })
                            : null}
                        </div>
                      </div>
                      <div className="form-group col-md-2 mt-2 mb-0">
                        {details?.image === null ||
                        details?.image === "" ||
                        details?.image === undefined ? (
                          <img
                            src={NoImage}
                            alt=""
                            height={100}
                            width={100}
                            className="me-3 w-100"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        ) : (
                          <img
                            src={details?.image}
                            alt=""
                            height={100}
                            width={100}
                            className="me-3 w-100"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        )}
                      </div>
                      <div className="form-group col-md-10 mt-2 align-items-start d-flex mb-0">
                        <p>{details?.description ?? "NA"}</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Expires On</h4>
                </div>
                <div></div>
              </div>
              <div className="iq-card-body">
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Date</label>
                        <p>{moment(details?.end_date).format("MM-DD-yyyy")}</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Time</label>
                        <p>09:00 AM</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Ads Total View</label>
                        <p>{details?.adsTotalViews}</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Payment Details</h4>
                </div>
                <div>
                  <button type="button" className="btn btn-view-active px-4">
                    Success
                  </button>
                </div>
              </div>
              <div className="iq-card-body">
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="form-group col-md-4 mb-0">
                        <label>Transaction ID</label>
                        <p>GAL845774JA</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="lname">Pay Via CC</label>
                        <p>XXXX XXXX XXXX 8956</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Amount</label>
                        <p>$10.00</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Date</label>
                        <p>16-05-2024</p>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label for="add1">Time</label>
                        <p>05:00 PM</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={stat.status}
        onHide={() => {
          setStat({
            status: false,
            value: null,
            name: null,
          });
        }}
        className=""
      >
        <div className="modal-content">
          <ModalBody className="">
            <div className="add-items d-flex row">
              <h5 className="text-center">Are you sure</h5>
              <p className="text-center">
                You want to <span className="text-lowercase">{stat.name}</span>{" "}
                this advertisement?
              </p>
              <div className="form-group text-center">
                <button
                  type="button"
                  onClick={() =>
                    setStat({
                      status: false,
                      value: null,
                      name: null,
                    })
                  }
                  className="btn btn-gradient-danger me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gradient-primary me-2"
                  data-bs-dismiss="modal"
                  onClick={() => changeStatus(stat.value)}
                >
                  Yes! {stat.name}
                </button>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default Details;
