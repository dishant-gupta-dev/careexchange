import React from "react";
import LoaderImg from "../../assets/admin/images/loader.svg";
const AdminLoader = () => {
  return (
    <>
      <div className="auth-loading">
        <span>
          <img src={LoaderImg} />
        </span>
      </div>
    </>
  );
};

export default AdminLoader;
