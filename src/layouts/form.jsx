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
  const [dni, setDni] = useState({ value: "", valid: null, style: "" });
  const [loading, setLoading] = useState(false);
  const [deployMessage, setDeployMessage] = useState({
    value: "",
    valid: false,
  });
  const [errorAlert, setErrorAlert] = useState({
    value: "Error del servidor",
    valid: null,
  });

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
        visibleMessage("error");
      }
      setUsers(res.data.result);
    } catch (error) {
      setErrorAlert({ value: "Error del servidor", valid: true });
      throw error;
    }
    setLoading(false);
  };

  const visibleMessage = (state) => {
    setDeployMessage({ value: state, valid: true });
    setTimeout(() => {
      setDeployMessage({ ...deployMessage, valid: false });
    }, 2000);
  };

  const changeUserData = (e) => {
    e.preventDefault();
    if (dni.style === "error") {
      setUsers("");
      return visibleMessage("error");
    }
    if (dni.style === "success") {
      visibleMessage("success");
      return getUserData();
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
      <div className="Form">
        <form className="dni_data">
          <h4>Ingresar numero de DNI :</h4>
          <div className="container_dni">
            <div className="container_input_dni">
              <Input dni={dni} setDni={setDni} expression={/^[0-9]{8}$/} />
              <button onClick={changeUserData}>
                <img src={SearchIcon} alt="ok" />
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
          <h4>Datos personales :</h4>
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
    </>
  );
}
