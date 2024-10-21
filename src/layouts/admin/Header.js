import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/Auth";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Nav,
} from "reactstrap";
import LogoSvg from "../../assets/images/logo.svg";
import LogoMini from "../../assets/images/logomini.svg";
import Face1 from "../../assets/images/face1.jpg";
import { routes } from "../../utlis/routes.utlis";
import { api } from "../../utlis/api.utlis";
import ApiService from "../../core/services/ApiService";
import NoImage from "../../assets/images/no-image.jpg";

const Header = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const getUserDetails = async (api) => {
    const response = await ApiService.getAPIWithAccessToken(api);
    if (response.data.status && response.data.statusCode === 200) {
      setUser(response.data.data);
    } else setUser();
  };

  useEffect(() => {
    getUserDetails(api.profile);
  }, []);

  const dispatch = useDispatch();
  const signOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <Nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <Link className="navbar-brand brand-logo" to={routes.dashboard}>
            <img src={LogoSvg} alt="profile" />
          </Link>
          <Link className="navbar-brand brand-logo-mini" to={routes.dashboard}>
            <img src={LogoMini} alt="profile" />
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <span
            className="mdi mdi-menu mt-4"
            onClick={(e) => {
              e.preventDefault();
              props.sidebar();
            }}
          ></span>

          <ul className="navbar-nav navbar-nav-right">
            <UncontrolledDropdown nav className="nav-item nav-profile dropdown">
              <DropdownToggle
                className="nav-link dropdown-toggle"
                id="profileDropdown"
                nav
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="nav-profile-img">
                  {user?.image === null ||
                  user?.image === "" ||
                  user?.image === undefined ? (
                    <img src={NoImage} alt="" className="me-3" />
                  ) : (
                    <img src={user?.image} alt="" className="me-3" />
                  )}
                  <span className="availability-status online"></span>
                </div>
                <div className="nav-profile-text me-2">
                  <p className="mb-1 text-black">{user?.fullname}</p>
                </div>
              </DropdownToggle>
              <DropdownMenu
                end
                className="dropdown-menu navbar-dropdown"
                aria-labelledby="profileDropdown"
              >
                <DropdownItem
                  className="dropdown-item"
                  to=""
                  onClick={() => navigate(routes.profile)}
                >
                  <i className="mdi mdi-account-circle me-2 text-success"></i>{" "}
                  Profile
                </DropdownItem>
                <div className="dropdown-divider"></div>
                <DropdownItem className="dropdown-item" to="" onClick={signOut}>
                  <i className="mdi mdi-logout me-2 text-primary"></i> Signout{" "}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-none align-self-center"
            type="button"
          >
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </Nav>
    </>
  );
};

export default Header;
