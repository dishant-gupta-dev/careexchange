import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchImg from "../../../assets/provider/images/search1.svg";
import { api } from "../../../utlis/provider/api.utlis";
import { routes } from "../../../utlis/provider/routes.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import AmountImg from "../../../assets/user/images/amount.svg";
import SmsImg from "../../../assets/user/images/sms.svg";
import moment from "moment";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import { encode } from "base-64";
import { subscribtionAuth } from "../../../utlis/common.utlis";

const Page = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const getTransactionList = async (api) => {
    setLoading(true);
    const response = await ApiService.getAPIWithAccessToken(api);
    console.log("all transaction => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setTransaction(response.data.data.data);
    } else setTransaction([]);
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getTransactionList(api.transactionList);
    subscribtionAuth(api.subscriptionAuth, navigate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container">
        <div className="carenetwork-section">
          <div className="care-title-header">
            <h2 className="heading-title">Transaction History</h2>
            <div className="search-filter">
              <div className="row g-2">
                <div className="col-md-6 ">
                  <div className="form-group mb-0">
                    <DatePicker
                      toggleCalendarOnIconClick
                      showIcon
                      dateFormat={"MM-dd-yyyy"}
                      className="form-control"
                      style={{ padding: "15px 40px" }}
                      isClearable
                      autoComplete="off"
                      name="date"
                      placeholderText="To Date"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-0 search-form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="name"
                    />
                    <span class="search-icon">
                      <img src={SearchImg} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carenetwork-content">
            <div className="transaction-card care-card">
              <div className="transactiontable table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Transaction Id</th>
                      <th>Payment Status</th>
                      <th>Payment Date:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.length !== 0 ? (
                      transaction.map((ele, indx) => {
                        return (
                          <tr key={indx}>
                            <td>
                              <div className="sno">1</div>
                            </td>
                            <td> {ele.fullname ?? "NA"}</td>
                            <td>
                              <div className="jobs-point-item">
                                <img src={AmountImg} />{" "}
                                <span>${ele.amount ?? "0"}</span>
                              </div>
                            </td>
                            <td>{ele.transaction_id ?? "NA"}</td>
                            <td>{ele.payment_status ?? "NA"}</td>
                            <td>{ele.payment_date ?? "NA"}</td>
                          </tr>
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
