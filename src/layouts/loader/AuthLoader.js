import React from "react";
import LoaderImg from "../../assets/admin/images/loader.svg";
const AuthLoader = () => {
  return (
    <>
      <div className="admin-loading">
        <span>
          <img src={LoaderImg} />
        </span>
      </div>
    </>
  );
};

export default AuthLoader;
