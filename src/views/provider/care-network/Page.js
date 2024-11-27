import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Searchicon from "../../../assets/provider/images/search1.svg";
import SuitcaseIcon from "../../../assets/provider/images/jobs-suitcase.svg";
import DollarIcon from "../../../assets/provider/images/dollar.svg";
import ClockIcon from "../../../assets/provider/images/clock.svg";
import { api } from "../../../utlis/provider/api.utlis";
import ApiService from "../../../core/services/ApiService";
import Loader from "../../../layouts/loader/Loader";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const getCareNetworkList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all care network list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setList(response.data.data.postedJob);
    } else setList([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    getCareNetworkList(api.careNetwork + `?search=${name}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCareNetworkList(api.careNetwork);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="carenetwork-section">
          <div className="care-title-header">
            <h2 className="heading-title">Care Network</h2>
            <div className="search-filter wd82">
              <div className="row g-2">
                <div className="col-md-3">
                  <div className="form-group mb-0">
                    <Link href="#" className="btn-gr wd100">
                      {" "}
                      Sort By Filter
                    </Link>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group mb-0">
                    <Link href="#" className="btn-bl wd100">
                      {" "}
                      View Applied Jobs
                    </Link>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group mb-0">
                    <input type="date" className="form-control" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group mb-0">
                    <div className="search-form-group">
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        placeholder="Search Title"
                      />
                      <span className="search-icon">
                        {" "}
                        <img src={Searchicon} alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carenetwork-content">
            <div className="row">
              <div className="col-md-6">
                <div className="care-card">
                  <div className="care-card-head">
                    <div className="care-id">
                      Job ID:<span>7983489</span>
                    </div>

                    <div className="care-date">
                      Posted On: <span>25 Jul, 09:00 Am</span>
                    </div>
                  </div>
                  <div className="care-card-body">
                    <div className="care-content">
                      <div className="title-text">Care For Marry Lane</div>
                      <div className="tags-list">
                        <div className="tags-item">Senior Care</div>
                        <div className="tags-item">Home Care</div>
                        <div className="tags-item">Full Time</div>
                      </div>

                      <div className="jobs-point">
                        <div className="jobs-point-item">
                          <img src={ClockIcon} alt="" /> Work Timing:
                          <span>09-05 PM</span>
                        </div>
                        <div className="jobs-point-item">
                          <img src={DollarIcon} alt="" /> Salary:
                          <span>$4000.00/Annually</span>
                        </div>
                        <div className="jobs-point-item">
                          <img src={SuitcaseIcon} alt="" /> Work Exp:
                          <span>3+ Years Experience </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="care-card-foot">
                    <div className="care-action">
                      <Link
                        className="btn-gr"
                        data-bs-toggle="modal"
                        data-bs-target="#Applyjob"
                      >
                        Apply
                      </Link>
                      <Link className="btn-bl" href="#">
                        View Job Detail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="care-card">
                  <div className="care-card-head">
                    <div className="care-id">
                      Job ID:<span>7983489</span>
                    </div>

                    <div className="care-date">
                      Posted On: <span>25 Jul, 09:00 Am</span>
                    </div>
                  </div>
                  <div className="care-card-body">
                    <div className="care-content">
                      <div className="title-text">Care For Marry Lane</div>
                      <div className="tags-list">
                        <div className="tags-item">Senior Care</div>
                        <div className="tags-item">Home Care</div>
                        <div className="tags-item">Full Time</div>
                      </div>

                      <div className="jobs-point">
                        <div className="jobs-point-item">
                          <img src={ClockIcon} alt="" /> Work Timing:
                          <span>09-05 PM</span>
                        </div>
                        <div className="jobs-point-item">
                          <img src={DollarIcon} alt="" /> Salary:
                          <span>$4000.00/Annually</span>
                        </div>
                        <div className="jobs-point-item">
                          <img src={SuitcaseIcon} alt="" /> Work Exp:
                          <span>3+ Years Experience </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="care-card-foot">
                    <div className="care-action">
                      <Link
                        className="btn-gr"
                        data-bs-toggle="modal"
                        data-bs-target="#Applyjob"
                      >
                        Apply
                      </Link>
                      <Link className="btn-bl" href="#">
                        View Job Detail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
