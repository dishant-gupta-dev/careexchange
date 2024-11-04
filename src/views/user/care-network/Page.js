import React from 'react'
import Search from "../../../assets/user/images/search1.svg";
import Clock from "../../../assets/user/images/clock.svg";
import Dollar from "../../../assets/user/images/dollar.svg";
import SuitCase from "../../../assets/user/images/jobs-suitcase.svg";

const Page = () => {
  return (
    <>
        <div class="container">
        <div class="carenetwork-section">
            <div class="care-title-header">
                <h2 class="heading-title">Care Network</h2>
                <div class="search-filter wd82">
                    <div class="row g-2">
                        <div class="col-md-7">
                            <div class="carenetwork-tab">
                                <ul class="carenetwork-btn-action">
                                    <li><a class="btn-bl" href="#" >Find A Job</a></li>
                                    <li><a href="jobs-request.html" class="btn-gr">Job Requests</a></li>
                                    <li><a href="view-applied-jobs.html" class="btn-wh"> Applied Jobs</a></li>
                                    <li><a href="#" class="btn-wh">Sort By Filter</a></li>
                                </ul>
                            </div>
                        </div>

                      
                        <div class="col-md-2">
                            <div class="form-group">
                                <input type="date" class="form-control"/>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="search-form-group">
                                    <input type="text" name="" class="form-control" placeholder="Search Title"/>
                                    <span class="search-icon"><img src={Search}/></span>
                                </div>
                            </div>
                        </div>
                    </div>           
                </div>
            </div>
            <div class="carenetwork-content">
                <div class="row">
                    <div class="col-md-6">
                        <div class="care-card">
                            <div class="care-card-head">
                                <div class="care-id">Job ID:<span>7983489</span></div>

                                <div class="care-date">Posted On: <span>25 Jul, 09:00 Am</span></div>
                            </div>
                            <div class="care-card-body">
                                <div class="care-content">
                                    <div class="title-text">Care For Marry Lane</div>
                                    <div class="tags-list">
                                        <div class="tags-item">Senior Care</div>
                                        <div class="tags-item">Home Care</div>
                                        <div class="tags-item">Full Time</div>
                                    </div>

                                    <div class="jobs-point">
                                        <div class="jobs-point-item">
                                            <img src={Clock}/> Work Timing:<span>09-05 PM</span>
                                        </div>
                                        <div class="jobs-point-item">
                                            <img src={Dollar}/> Salary:<span>$4000.00/Annually</span>
                                        </div>
                                        <div class="jobs-point-item">
                                            <img src={SuitCase}/> Work Exp:<span>3+ Years Experience </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="care-card-foot">
                                <div class="care-action">
                                    <a class="btn-gr" data-bs-toggle="modal" data-bs-target="#Applyjob">Apply</a>
                                    <a class="btn-bl" href="#">View Job Detail</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Page