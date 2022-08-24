import { useState } from "react";
import IconError from "../assets/error.png";
import IconClose from "../assets/close-icon.png";

export default function CardError({ errorAlert, setErrorAlert }) {
  return (
    <>
      {errorAlert.valid && (
        <div className="container_card_error">
          <div className="container_card_error_items">
            <img className="icon_error" src={IconError} alt="Error" />
            <label>{errorAlert.value}</label>
          </div>
          <img
            className="icon_close"
            src={IconClose}
            alt="Close"
            onClick={() => setErrorAlert(!errorAlert)}
          />
        </div>
      )}
    </>
  );
}
