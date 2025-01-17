import React, { useEffect, useState } from "react";
import { api } from "../../../utlis/provider/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import SearchImg from "../../../assets/provider/images/search1.svg";
import deleteaccountImg from "../../../assets/user/images/delete-account.svg";
import { Modal, ModalBody } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { billingType } from "../../../utlis/common.utlis";

const Page = () => {
  const [plans, setPlan] = useState([]);
  const [total, setTotal] = useState(0);
  const [tab, setTab] = useState({ state: 1, type: "MONTHLY" });
  const [loading, setLoading] = useState(false);
  const [cancelPlan, setCancelPlan] = useState({ status: false, id: null });
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

  const makePayment = async (id) => {
    setLoading(true);
    let form = JSON.stringify({
      planId: id,
      billingCycle: tab.type,
    });
    const response = await ApiService.postAPIWithAccessToken(
      api.subscriptionPayment,
      form
    );
    if (response.data.status && response.data.statusCode === 200) {
      window.location.href = response.data.data.approvalLink;
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const changePlan = async (id) => {
    setLoading(true);
    let form = JSON.stringify({
      currentPlanId: id,
      newPlanId: id,
      billingCycle: tab.type,
    });
    const response = await ApiService.postAPIWithAccessToken(
      api.changeSubscription,
      form
    );
    if (response.data.status && response.data.statusCode === 200) {
      window.location.href = response.data.data.approvalLink;
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  const cancelSubscription = async (id) => {
    setLoading(true);
    let form = JSON.stringify({
      subscriptionId: id,
    });
    const response = await ApiService.postAPIWithAccessToken(
      api.subscriptionCancel,
      form
    );
    setCancelPlan({
      status: false,
      id: null,
    });
    if (response.data.status && response.data.statusCode === 200) {
      getPlanList(api.planList);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
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
        <div className="messages-tab">
          <ul className="nav nav-tabs">
            <li>
              <Link
                className={tab.state == 1 ? "active" : ""}
                onClick={() => setTab({ state: 1, type: "MONTHLY" })}
                to=""
                data-bs-toggle="tab"
              >
                Monthly
              </Link>
            </li>
            <li>
              <Link
                className={tab.state == 2 ? "active" : ""}
                onClick={() => setTab({ state: 2, type: "QUARTERLY" })}
                to=""
                data-bs-toggle="tab"
              >
                Quarterly
              </Link>
            </li>
            <li>
              <Link
                className={tab.state == 3 ? "active" : ""}
                onClick={() => setTab({ state: 3, type: "HALF_YEARLY" })}
                to=""
                data-bs-toggle="tab"
              >
                Half Yearly
              </Link>
            </li>
            <li>
              <Link
                className={tab.state == 4 ? "active" : ""}
                onClick={() => setTab({ state: 4, type: "YEARLY" })}
                to=""
                data-bs-toggle="tab"
              >
                Yearly
              </Link>
            </li>
          </ul>
        </div>
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
                      {ele.isCurrentPlan && ele.planType == tab.type ? (
                        <div class="current-plan">Active Plan</div>
                      ) : null}
                      <div className="subscription-info">
                        <div className="planname-text">{ele.name ?? "NA"}</div>
                        {/* <p>Care Referrals Monthly Plan</p> */}
                      </div>
                      <div className="subscription-price-info">
                        {ele.cost_period == "Featured" ? (
                          <div className="plan-price-text">
                            ${ele.required_deposit ?? "0"}
                            <span className="plan-per-text"> Deposit</span>
                          </div>
                        ) : (
                          <div className="plan-price-text">
                            $
                            {tab.state == 1
                              ? ele.monthly_commit
                              : tab.state == 2
                              ? ele.quarterly_commit
                              : tab.state == 3
                              ? ele.half_yearly_commit
                              : ele.yearly_commit}
                            <span className="plan-per-text">
                              /
                              {tab.state == 1
                                ? "Month"
                                : tab.state == 2
                                ? "Quarter"
                                : tab.state == 3
                                ? "Half Year"
                                : "Year"}
                            </span>
                          </div>
                        )}
                        <p className="m-0" style={{color: "#000", fontWeight:"600"}}>Enjoy a {ele.free_trial ?? 0}-Day Free Trial</p>
                      </div>
                      <div className="subscription-point-info">
                        {ele.isCurrentPlan && ele.cost_period == "Featured" ? (
                          <div className="plan-action mb-3">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setCancelPlan({
                                  status: true,
                                  id: ele.subscriptionId,
                                });
                              }}
                              className="btn-re w-100"
                            >
                              Cancel Plan
                            </button>
                          </div>
                        ) : (
                          <div className="plan-action mb-3">
                            {ele.isCurrentPlan && ele.planType == tab.type ? (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCancelPlan({
                                    status: true,
                                    id: ele.subscriptionId,
                                  });
                                }}
                                className="btn-re w-100"
                              >
                                Cancel Plan
                              </button>
                            ) : ele.isCurrentPlan ? (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  changePlan(ele.id);
                                }}
                                className="btn-gr w-100"
                              >
                                {billingType(ele.planType) > tab.state
                                  ? "Downgrade"
                                  : "Upgrade"}{" "}
                                Plan
                              </button>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  makePayment(ele.id);
                                }}
                                className="btn-gr w-100"
                              >
                                Buy Now
                              </button>
                            )}
                          </div>
                        )}
                        <div className="cc-plan-point-list px-3">
                          {renderHTML(ele.description)}
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

      <Modal
        show={cancelPlan.status}
        onHide={() => {
          setCancelPlan({
            status: false,
            id: null,
          });
        }}
        className="cc-modal-form"
      >
        <div className="modal-content">
          <ModalBody className="">
            <div className="add-items d-flex row">
              <div className="deleteaccount-Img">
                <img src={deleteaccountImg} />
              </div>
              <div className="deleteaccount-text mb-4">
                <h5 className="text-center pb-0">Subscription Cancel</h5>
                <p className="text-center">
                  Are you sure you'd like to cancel your subscription ?
                </p>
              </div>
              <div className="form-group text-center mb-0">
                <button
                  type="button"
                  onClick={() =>
                    setCancelPlan({
                      status: false,
                      id: null,
                    })
                  }
                  className="btn-re me-2"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
                <button
                  type="submit"
                  className="btn-gr"
                  data-bs-dismiss="modal"
                  onClick={() => cancelSubscription(cancelPlan.id)}
                >
                  Yes
                </button>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default Page;
