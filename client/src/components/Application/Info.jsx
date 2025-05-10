import React from "react";
import { useOutletContext } from "react-router-dom";
import "../../css/Info.css";

function Info() {
  const currentUser=useOutletContext();
  return (
    <div>
      <div className="user-page">
        <h1>פרטי המשתמש</h1>
        <div className="user-details">
          <p><strong>שם:</strong> {currentUser.name}</p>
          <p><strong>שם משתמש:</strong> {currentUser.username}</p>
          <p><strong>אימייל:</strong> {currentUser.email}</p>
          <p><strong>טלפון:</strong> {currentUser.phone}</p>
          {/* <p><strong>כתובת:</strong> {`${currentUser.address.street}, דירה ${currentUser.address.suite}, ${currentUser.address.city}`}</p> */}
        </div>
      </div>
    </div>
  );
}
export default Info;