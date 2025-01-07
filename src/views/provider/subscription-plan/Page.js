import React, { useEffect, useState } from "react";
import { api } from "../../../utlis/provider/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import SearchImg from "../../../assets/provider/images/search1.svg";

const Page = () => {
  const [plans, setPlan] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const renderHTML = (rawHTML: string) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });

  const getPlanList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    // console.log("all plans list => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setPlan(response.data.data.plans);
      // setTotal(response.data.totalPages);
    } else setPlan([]);
    setLoading(false);
  };

  const handleFilter = (e, date = null) => {
    e.persist();
    let name = "";
    if (e.target.name === "name") name = e.target.value;
    getPlanList(api.planList + `?search=${name}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPlanList(api.planList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="subscription-section">
          <div className="care-title-header">
            <h2 className="heading-title">Subscription Plan</h2>
            <div className="search-filter wd30">
              <div className="form-group">
                <div className="search-form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => handleFilter(e)}
                    name="name"
                  />
                  <span className="search-icon">
                    <img src={SearchImg} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3">
            {plans.length !== 0 ? (
              plans.map((ele, indx) => {
                return (
                  <div key={indx} className="col-md-4 ">
                    <div className="subscription-card">
                      <div className="subscription-info">
                        <div className="planname-text">{ele.name ?? "NA"}</div>
                        {/* <p>Care Referrals Monthly Plan</p> */}
                      </div>
                      <div className="subscription-price-info">
                        <div className="plan-price-text">
                          ${ele.cost ?? "NA"}
                        </div>
                        {/* <div className="plan-persave-content">
                          <div className="plan-per-text">Per Month</div>
                          <div className="plan-save-text">Save 33%</div>
                        </div> */}
                      </div>
                      <div className="subscription-point-info">
                        <div className="cc-plan-point-list">
                          {renderHTML(ele.description)}
                        </div>
                        <div className="plan-action">
                          <a href="">Buy Now</a>
                        </div>
                        {/* <p>No credit card required</p> */}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "5% 0",
                }}
              >
                <img width={300} src={NoData} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
