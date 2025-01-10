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
      <div class="container">
        <div class="carenetwork-section">
          <div class="care-title-header my-3">
            <h2 class="heading-title">Transaction History</h2>
          </div>
          <div class="carenetwork-content">
            <div class="row g-3">
              {transaction.length !== 0 ? (
                transaction.map((ele, indx) => {
                  return (
                    <div key={indx} class="col-md-4">
                      <div class="care-card mb-0">
                        <div class="care-card-head">
                          <div class="care-date">
                            Payment Status:{" "}
                            <span>{ele.payment_status ?? "NA"}</span>
                          </div>

                          <div class="care-date">
                            Payment Date:{" "}
                            <span>{ele.payment_date ?? "NA"}</span>
                          </div>
                        </div>
                        <div class="care-card-body">
                          <div class="care-content">
                            <div class="title-text">{ele.transaction_id ?? "NA"}</div>

                            <div class="jobs-point">
                              <div class="jobs-point-item">
                                {ele.fullname ?? "NA"}
                              </div>
                              <div class="jobs-point-item">
                                <img src={AmountImg} />{" "}
                                <span>${ele.amount ?? "0"}</span>
                              </div>
                            </div>
                          </div>
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
      </div>
    </>
  );
};

export default Page;
