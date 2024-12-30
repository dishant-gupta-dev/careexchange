import React from "react";
import checkimage from "../../../assets/admin/images/checkimage.svg";

const PaymentSuccess = () => {
  return (
    <div className="payment-section">
      <div className="container">
        <div className="payment-list">
          <div className="payment-item">
            <div className="payment-item-image pulse paymentsuccess">
              <img src={checkimage} />
            </div>
            <div className="payment-item-text">
              <h2>Your payment was successful</h2>
              <p>
                Thank you for your payment. We Will be in Contact with more
                details shortly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
