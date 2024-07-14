import React from "react";
import Header from "./Header";

const Contact = () => {
  return (
    <div>
      <Header />

      <div className="notification-container" id="notification">
      <div className="notifiction-header"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m4 8l2.05 1.64a.48.48 0 0 0 .4.1a.5.5 0 0 0 .34-.24L10 4"/><circle cx="7" cy="7" r="6.5"/></g></svg>&nbsp;&nbsp; Message sent!</div>
      <div className="notifiction-footer">Thank's for completing the form. We'll be in touch soon!</div>
    </div>

      <div className="form-container">
        <form id="caca">
          <h2>Contact Us</h2>
          <div className="input-container">
            <div className="name-container">
              <div className="name-input">
                <label htmlFor="firstName">First Name *</label>
                <input type="text" id="firstName" />
                <span className="fistNameError">
                  Please enter a valid first name
                </span>
              </div>
              <div className="name-input">
                <label htmlFor="lastName">Last Name *</label>
                <input type="text" id="lastName" />
                <span className="lastNameError">
                  Please enter a valid last name
                </span>
              </div>
            </div>
            <div className="email-container">
              <label htmlFor="email">Email Adress *</label>
              <br />
              <input type="text" id="email" />
              <span>Please enter a valid email address</span>
            </div>
            <p className="query">Query Types *</p>
            <div className="query-container">
              <div className="general" id="generalContainer">
                <input
                  type="radio"
                  id="radio1"
                  value="generalRadio"
                  name="queryType"
                />
                <label htmlFor="radio1" className="label-radio1">
                  General Enquiry
                </label>
              </div>
              <div className="support" id="supportContainer">
                <input
                  type="radio"
                  id="radio2"
                  value="supportRadio"
                  name="queryType"
                />
                <label htmlFor="radio2" className="label-radio2">
                  Support Request
                </label>
              </div>
            </div>
            <span className="queryError">Please enter a valid last name</span>
            <p className="message">Message *</p>
            <div className="text-container">
              <textarea name="" id="textArea" minLength="7"></textarea>
            </div>
            <div className="check">
              <input type="checkbox" id="conscent" className="caca" />
              <label htmlFor="conscent" id="conscentLabel">
                I conscent to being contacted by the team *
              </label>
            </div>
            <input type="submit" value="Submit" id="submitBtn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
