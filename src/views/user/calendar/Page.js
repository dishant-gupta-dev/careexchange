import React, { useState, useEffect } from "react";
import locationImage from "../../../assets/admin/images/Google_Map.svg";
import RepeatImg from "../../../assets/user/images/Repeat.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { api } from "../../../utlis/user/api.utlis";
import ApiService from "../../../core/services/ApiService";
import NoData from "../../../assets/admin/images/no-data-found.svg";
import WhCalen from "../../../assets/provider/images/whcalendar.svg";
import Loader from "../../../layouts/loader/Loader";
import moment from "moment";
let events = [];

const Page = () => {
  const [dateVal, setDate] = useState(null);
  const [monthVal, setMonth] = useState(null);
  const [yearVal, setYear] = useState(null);
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCalendarData = async (api) => {
    setLoading(true);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentDay = moment().format("DD");
    const response = await ApiService.getAPIWithAccessToken(
      api + `?day=${dateVal ?? currentDay}&month=${monthVal ?? currentMonth}&year=${yearVal ?? currentYear}`
    );
    // console.log("all calendar list data => ", response.data);
    if (response.data.status && response.data.statusCode === 200) {
      setEvent(response.data.data.days);
      events = [];
      response.data.data.days.map((element) => {
        events.push({
          date: moment(element.start_date).format("yyyy-MM-DD"),
          title: element.job_id ?? "NA",
        });
      });
    } else setEvent([]);
    setLoading(false);
  };

  const hasEvent = (date) => {
    return events.some(
      (event) => event.date === moment(date).format("yyyy-MM-DD")
    );
  };

  useEffect(() => {
    getCalendarData(api.calendarData);
  }, [dateVal]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <div className="subscription-section">
          <div className="care-title-header my-3">
            <h2 className="heading-title">Calendar</h2>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Calendar
                onChange={(e) => {
                  setDate(moment(e).format("DD"));
                  setMonth(moment(e).format("MM"));
                  setYear(moment(e).format("yyyy"));
                }}
                defaultView="month"
                value={dateVal}
                tileClassName={({ date, view }) =>
                  view === "month" && hasEvent(date) ? "highlight" : null
                }
              />
            </div>

            <div className="col-md-8">
              {event.length !== 0 ? (
                event.map((ele, indx) => {
                  return (
                    <div key={indx} className="care-card">
                      <div className="care-card-head">
                        <div className="care-id">
                          Job ID: <span>{ele.job_id ?? "NA"}</span>
                        </div>

                        <div className="care-status">
                          Status: <span>Active</span>
                        </div>
                      </div>
                      <div className="care-card-body">
                        <div className="care-content">
                          <div className="title-text">
                            {ele.first_name ?? "NA"}
                          </div>
                          <div className="date-text">
                            <img src={WhCalen} />{" "}
                            {moment(ele.start_date).format("MM-DD-yyyy")}{" "}
                          </div>
                          <div class="tags-list float-end">
                            <div class="tags-item-sub">
                              {ele?.gender == "M" ? "Male" : "Female"}
                            </div>
                            <div class="tags-item-sub mx-2">
                              Age: {ele?.age ?? "NA"}
                            </div>
                          </div>
                          <div className="care-point-list">
                            <div className="row">
                              <div className="col-md-4">
                                <div class="jobs-details-point-item">
                                  <h4>Prefered Contact: </h4>
                                  <p className="text-capitalize">
                                    {ele.prefer_contacted ?? "NA"}
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div class="jobs-details-point-item">
                                  <h4>Best Time To Call: </h4>
                                  <p className="text-capitalize">
                                    {ele.best_time_to_call ?? "NA"}
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div class="jobs-details-point-item">
                                  <h4>Relationship: </h4>
                                  <p>{ele.relationship ?? "NA"}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="care-day-Weekly-info1">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="care-point-box">
                                <div className="care-point-icon">
                                  <img src={RepeatImg} />
                                </div>
                                <div className="care-point-text">
                                  <h4>Frequency:</h4>
                                  <p className="text-capitalize">
                                    {ele.frequency === "O"
                                      ? "One Time"
                                      : ele.frequency === "W"
                                      ? "Repeat Weekly"
                                      : "Repeat Monthly"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="care-point-box">
                                <div className="care-point-text">
                                  <h4>Payment Type:</h4>
                                  <p className="text-capitalize">
                                    {ele.payment_type ?? "NA"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="care-point-box">
                                <div className="care-point-icon">
                                  <img src={locationImage} />
                                </div>
                                <div className="care-point-text">
                                  <h4>Location:</h4>
                                  <p>{ele.address ?? "NA"}</p>
                                </div>
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
