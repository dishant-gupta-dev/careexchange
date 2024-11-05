import React from "react";
import LoaderImg from "../../assets/admin/images/loader.svg";
const Loader = () => {
  return (
    <>
      <div class="loading">
        <span>
          <img src={LoaderImg} />
        </span>
      </div>
    </>
  );
};

export default Loader;
