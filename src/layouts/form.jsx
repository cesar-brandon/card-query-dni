import { useEffect, useState } from "react";
import _ from "underscore";
import axios from "axios";
import { SearchIcon, CheckIcon } from "../assets";
import { dbUri, token } from "../api/url.jsx";
import { Loader, Input, Message, CardError } from "../components";

import {
  InformationUser,
  EmptyInformation,
} from "../components/InformationUser.jsx";

export default function Form(props) {
  const [users, setUsers] = useState([]);
  const [dni, setDni] = useState({
    value: "",
    valid: null,
    style: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [deployMessage, setDeployMessage] = useState({
    value: "",
    valid: false,
  });
  const [errorAlert, setErrorAlert] = useState({
    value: "Error del servidor",
    valid: null,
  });

  const [fold, setFold] = useState("");

  const getUserData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .post(
          dbUri,
          {
            dni: dni.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .catch((error) => {
          setErrorAlert({ value: "Error del servidor", valid: true });
          setDni({ ...dni, value: "" });
          visibleMessage("error");
        });

      if (res.data.message === "no encontrado") {
        setErrorAlert({ value: "No encontrado", valid: true });
        setDni({ ...dni, value: "" });
        setUsers("");
        return setLoading(false);
        visibleMessage("error");
      }
      setUsers(res.data.result);
      setDni({ ...dni, message: res.data.message });
    } catch (error) {
      setErrorAlert({ value: "Error del servidor", valid: true });
      throw error;
    }
    setLoading(false);
    if (dni.style === "success") {
      setFold("open");
      return visibleMessage("success");
    }
  };

  const visibleMessage = (state) => {
    setDeployMessage({ value: state, valid: true });
    setTimeout(() => {
      setDeployMessage({ ...deployMessage, valid: false });
    }, 2000);
  };

  const changeUserData = (e) => {
    e.preventDefault();
    if (dni.value.length < 8) {
      visibleMessage("error");
      setDni({ ...dni, valid: false, style: "error" });
    }
    if (dni.style === "error") {
      setUsers("");
      return visibleMessage("error");
    }
    if (dni.style === "success") {
      getUserData();
    }
    if (dni.value === "") {
      visibleMessage("warning");
    }
  };

  return (
    <>
      {deployMessage.valid && (
        <Message
          deployMessage={deployMessage}
          setDeployMessage={setDeployMessage}
        />
      )}

      {errorAlert && (
        <CardError errorAlert={errorAlert} setErrorAlert={setErrorAlert} />
      )}
      <div className={`container_form ${fold}`}>
        <div className="Form">
          <form className="dni_data">
            <div className="container_dni">
              <div className="container_subtitle">
                <h4>Ingresar numero de DNI :</h4>
              </div>
              <div className="container_input_dni">
                <Input dni={dni} setDni={setDni} expression={/^[0-9]{8}$/} />
                <button onClick={changeUserData}>
                  <img src={SearchIcon} alt="ok" />
                  Consultar
                </button>
              </div>
              {dni.style === "error" && (
                <label className={`label ${dni.style}`}>
                  El campo debe contener 8 digitos
                </label>
              )}
            </div>
          </form>
          <div className="personal_data">
            <div className="container_subtitle">
              <h4>Datos personales :</h4>
            </div>
            <div className="container_input_data">
              {loading && <Loader />}

              {_.isEmpty(users) ? (
                <EmptyInformation />
              ) : (
                <InformationUser users={users} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
