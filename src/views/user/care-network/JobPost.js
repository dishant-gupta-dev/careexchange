import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MapImg from "../../../assets/user/images/Google_Maps_icon.svg";
import { api } from "../../../utlis/user/api.utlis";
import Loader from "../../../layouts/loader/Loader";
import ApiService from "../../../core/services/ApiService";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
<script
  defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBxVrpIiwVIHIwBEWULPzlaIxyd0vSSadc&libraries=places"
></script>

const JobPost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {};

  const validationSchema = Yup.object().shape({});

  const addPost = async () => {};

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <>
      {loading ? <Loader /> : null}
      <div class="container">
        <div class="carenetwork-section">
          <div class="care-title-header">
            <h2 class="heading-title">Post New Job</h2>
            <div class="search-filter ">
              <div class="row g-2">
                <div class="col-md-12">
                  <div class="form-group">
                    <Link
                      class="btn-bl wd100"
                      to=""
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="post-newjob-content">
            <div class="post-job-form">
              <Formik
                initialValues={initialValues}
                validateOnChange={true}
                validationSchema={validationSchema}
                onSubmit={addPost}
              >
                <Form>
                  <div class="post-job-card">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <h4>Job Title</h4>
                          <Field
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Enter Job Title"
                          />
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="alert alert-danger"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group search-form-group">
                          <h4>Job Location</h4>
                          <input
                            value={value}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="Where are you going?"
                          />
                          <span class="form-group-icon">
                            <img src={MapImg} />
                          </span>
                        </div>
                        {status === "OK" && <ul>{renderSuggestions()}</ul>}
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <h4>Job Duties Description..</h4>
                          <Field
                            type="text"
                            as="textarea"
                            className="form-control"
                            name="description"
                            placeholder="Enter Job Description"
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="alert alert-danger"
                          />
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div class="form-group">
                          <h4>Qualifications Required</h4>
                          <Field
                            type="text"
                            className="form-control"
                            name="qualification"
                            placeholder="Enter Job Qualification Required"
                          />
                          <ErrorMessage
                            name="qualification"
                            component="div"
                            className="alert alert-danger"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="post-job-card">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <h4>Care Category</h4>
                          <div class="category-card">
                            <div class="category-card-content">
                              <h2>Senior Care</h2>
                              <h5>Home Care</h5>
                            </div>
                            <a class="btn-gr" href="">
                              Change
                            </a>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group">
                          <h4>What Kind Of Job Are You Looking For ?</h4>
                          <div class="category-card">
                            <div class="category-card-content">
                              <h5>Care-Staff</h5>
                            </div>
                            <a
                              class="btn-gr"
                              data-bs-toggle="modal"
                              data-bs-target="#EditJobLookingFor"
                            >
                              Edit
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <select class="form-control">
                            <option></option>
                            <option>Nursing</option>
                            <option>Admin</option>
                            <option>Office</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <h4>Employment Benefits Offered</h4>
                          <Field
                            type="text"
                            as="textarea"
                            className="form-control"
                            name="benefit"
                            placeholder="Employment Benefits Offered"
                          />
                          <ErrorMessage
                            name="benefit"
                            component="div"
                            className="alert alert-danger"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="post-job-card">
                    <h3>Pay Range Offered</h3>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group search-form-group-r">
                          <h4>Pay Range</h4>
                          <Field
                            type="text"
                            className="form-control"
                            name="pay_range"
                            placeholder="$0.00"
                          />
                          <ErrorMessage
                            name="pay_range"
                            component="div"
                            className="alert alert-danger"
                          />
                          <span class="Rangedays-text">Annually</span>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <h4>Working Timing</h4>
                          <ul class="Workingtime-list">
                            <li>
                              <div class="cecheckbox">
                                <input type="checkbox" id="Full Time" name="" />
                                <label for="Full Time">Full Time</label>
                              </div>
                            </li>
                            <li>
                              <div class="cecheckbox">
                                <input type="checkbox" id="Part Time" name="" />
                                <label for="Part Time">Part Time</label>
                              </div>
                            </li>
                            <li>
                              <div class="cecheckbox">
                                <input type="checkbox" id="Per Visit" name="" />
                                <label for="Per Visit">Per Visit</label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="post-job-card">
                    <h3>Contact Person For This Job Posting</h3>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <h4>Full Name</h4>
                          <Field
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter Full Name"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="alert alert-danger"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <h4>Email Id</h4>
                          <Field
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email Id"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="alert alert-danger"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <h4>Phone</h4>
                          <Field
                            type="text"
                            className="form-control"
                            name="phone"
                            placeholder="Enter Phone"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="alert alert-danger"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="post-job-card">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <button
                            class="btn-gr"
                            data-bs-toggle="modal"
                            data-bs-target="#Post"
                          >
                            Post
                          </button>
                          <button class="btn-bl mx-2">Clear All</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPost;
