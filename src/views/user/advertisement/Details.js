import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../utlis/user/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { decode, encode } from "base-64";
import moment from "moment";
import NoImage from "../../../assets/admin/images/no-image.jpg";
import { status } from "../../../utlis/common.utlis";
import { routes } from "../../../utlis/user/routes.utlis";
import { Modal, ModalBody } from "react-bootstrap";
import toast from "react-hot-toast";

const Details = () => {
  const navigate = useNavigate();
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
                <div class="strip-text">Advertisement</div>
                <div class="title-text">{details?.title ?? "NA"}</div>
                <div class="date-text">
                  Posted On{" "}
                  {moment(details?.created_date).format("MM-DD-yyyy hh:mm A")}
                </div>
                <div class="tags-list">
                  {details?.tags?.length !== 0
                    ? details?.tags?.map((ele, indx) => {
                        return <div class="tags-item">{ele.name ?? "NA"}</div>;
                      })
                    : null}
                </div>

                <div class="advertisement-desc">
                  <p>{details?.description ?? "NA"}</p>
                </div>
                <div class="advertisement-action mt-2">
                  {details?.createdBy?.user_type === null ||
                  details?.createdBy?.user_type === undefined ||
                  details?.createdBy?.user_type === "" ? null : details
                      ?.createdBy?.user_type == 4 ? null : details?.createdBy
                      ?.user_type == 2 ? (
                    <button
                      type="button"
                      className="btn-gr"
                      onClick={() =>
                        navigate(
                          routes.userDetail +
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
                  <Link class="btn-bl mx-1" to="">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;