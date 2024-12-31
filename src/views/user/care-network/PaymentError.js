import React from "react";
import crossimage from "../../../assets/admin/images/crossimage.svg";
import { Link } from "react-router-dom";
import { routes } from "../../../utlis/user/routes.utlis";

const PaymentError = () => {
  return (
    <div className="payment-section">
      <div className="container">
        <div className="payment-list">
          <div className="payment-item">
            <div className="payment-item-image pulse paymenterror">
              <img src={crossimage} />
            </div>
            <div className="payment-item-text">
              <h2>Payment failed</h2>
              <p>
                There was a problem with the card you provided. Please contact
                your card issue for further assistance.
              </p>
              <Link className="btn-bl mt-3" to={routes.postedJob}>My Jobs</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;
