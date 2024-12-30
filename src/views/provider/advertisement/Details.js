import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../utlis/provider/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { decode, encode } from "base-64";
import moment from "moment";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { status } from "../../../utlis/common.utlis";
import { routes } from "../../../utlis/provider/routes.utlis";
import { Modal, ModalBody } from "react-bootstrap";
import toast from "react-hot-toast";

const Details = () => {
  const navigate = useNavigate();
  const [stat, setStat] = useState({ status: false, value: null, name: null });
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const localData = useLocation();
  const id = localData.state?.id;

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
    window.scrollTo(0, 0);
    getAdsDetails(api.advertisementDetail + `${decode(id)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div class="container">
        <div class="carenetwork-section">
          <div className="care-title-header">
            <h2 className="heading-title"></h2>
            <div class="search-filter">
              <div class="row g-2">
                <div class="col-md-12">
                  <div class="form-group">
                    <Link
                      class="btn-bl wd100"
                      to=""
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5">
              <div class="advertisement-deatils-media">
                {details?.image === null ||
                details?.image === "" ||
                details?.image === undefined ? (
                  <img
                    src={NoImage}
                    alt=""
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
                    className="me-3 w-100"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                )}
              </div>
            </div>

            <div class="col-md-7">
              <div class="advertisement-deatils-content">
                <div class="strip-text">Status : {status(details?.status)}</div>
                <div class="strip-text mx-2">
                  Total Views : {details?.adsTotalViews ?? 0}
                </div>
                <div class="title-text">{details?.title ?? "NA"}</div>
                <div class="date-text">
                  Posted On :{" "}
                  {moment(details?.created_date).format("MM-DD-yyyy hh:mm A")}
                </div>
                <div class="date-text mx-2">
                  Start Date :{" "}
                  {moment(details?.start_date).format("MM-DD-yyyy")}
                </div>
                <div class="date-text">
                  End Date : {moment(details?.end_date).format("MM-DD-yyyy")}
                </div>
                <div class="tags-list">
                  {details?.tags?.length !== 0
                    ? details?.tags?.map((ele, indx) => {
                        return (
                          <div class="tags-item-sub mx-1">
                            {ele.name ?? "NA"}
                          </div>
                        );
                      })
                    : null}
                </div>

                <div class="advertisement-desc">
                  <p>{details?.description ?? "NA"}</p>
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
