import React, { useEffect, useState } from "react";
import checkimage from "../../../assets/admin/images/checkimage.svg";
import { Link, useParams } from "react-router-dom";
import { routes } from "../../../utlis/user/routes.utlis";
import moment from "moment";

const PaymentSuccess = () => {
  const [transaction, setTransaction] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const transactionValue = queryParams.get("transaction");
    const amountValue = queryParams.get("amount");
    setTransaction(transactionValue);
    setAmount(amountValue);
  }, []);

  return (
    <div className="payment-section">
      <div className="container">
        <div className="payment-list">
          <div className="payment-item">
            <div className="payment-item-image pulse paymentsuccess">
              <img src={checkimage} />
            </div>
            <div className="payment-item-text">
              <h2>Post Job Payment Successful</h2>
              <p className="mt-3">
                Transaction ID: <span className="text-gray">{transaction}</span>
              </p>
              <p>
                Amount Paid: <span className="text-gray">${amount}</span>
              </p>
              <p>
                Created On:{" "}
                <span className="text-gray">
                  {moment().format("MM-DD-YYYY")}
                </span>
              </p>
              <p>
                Payed By: <span className="text-gray">Paypal</span>
              </p>
              <Link className="btn-bl mt-3" to={routes.postedJob}>
                Posted Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
