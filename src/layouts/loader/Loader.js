import React from "react";
import Curve from "../../assets/admin/images/curvelogo.svg";

const Loader = () => {
  return (
    <>
      <div className="web-loader">
        <div id="preloader">
          <svg
            width="100"
            height="100"
            viewBox="0 0 214 223"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_113_5432)">
              <path
                d="M28.3171 114.078C28.3171 168.539 72.4017 212.688 126.783 212.688C152.925 212.688 176.712 202.479 194.333 185.812C173.944 208.64 144.314 223 111.338 223C49.851 223 0 173.076 0 111.5C0 49.9236 49.851 0 111.338 0C157.52 0 197.138 28.165 214 68.2793C197.537 36.8788 164.651 15.4682 126.783 15.4682C72.4017 15.4682 28.3171 59.6171 28.3171 114.078Z"
                fill="url(#paint0_linear_113_5432)"
              />
              <path
                d="M214 68C197.519 36.728 164.597 15.4049 126.687 15.4049C88.7781 15.4049 57.3502 35.778 40.5216 65.8947L21 45.8554C41.2561 18.0623 74.1272 0 111.225 0C157.458 0 197.12 28.0498 214 68Z"
                fill="url(#paint1_linear_113_5432)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_113_5432"
                x1="14.5"
                y1="180"
                x2="141.5"
                y2="112"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#9EDAFD" />
                <stop offset="0.447666" stop-color="#5ABDF8" />
                <stop offset="0.819915" stop-color="#7FCDFB" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_113_5432"
                x1="21"
                y1="34"
                x2="214"
                y2="34"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D9F0FE" />
                <stop offset="0.77824" stop-color="#76C9FA" />
                <stop offset="1" stop-color="#5ABDF8" />
              </linearGradient>
              <clipPath id="clip0_113_5432">
                <rect width="214" height="223" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <img
            src={Curve}
            height="40px"
            style={{ position: "absolute", margin: "-1px 6px 2px 6px" }}
          />
        </div>
      </div>
    </>
  );
};

export default Loader;
