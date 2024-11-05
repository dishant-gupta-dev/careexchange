import React from 'react'
import MailImg from "../../../assets/user/images/mail-sent-pana.svg";

const Page = () => {
  return (
    <>
        <div class="container">
        <div class="newsletter-section">
            <div class="row">
                <div class="col-md-12">
                     <div class="auth-content-card">
                        <div class="container">
                            <div class="auth-card">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="auth-content1">
                                            <img src={MailImg} alt="logo" />    
                                        </div>
                                    </div>
                                    <div class="col-md-6 auth-form-info">
                                        <div class="auth-form">
                                            <h2>Subscribe</h2>
                                            <p>Subscribe To Our Newsletter & Stay Updated</p>
                                            <form class="pt-4">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" placeholder="Name"/>
                                                </div>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" placeholder="Email Address"/>
                                                </div>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" placeholder="Phone Number"/>
                                                </div>
                                                <div class="form-group">
                                                    <button class="auth-form-btn">Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
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