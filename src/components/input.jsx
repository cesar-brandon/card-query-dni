import { useEffect, useState } from "react";

export default function Input({ dni, setDni, expression }) {
  const onChange = (e) => {
    setDni({ ...dni, value: e.target.value });
  };

  const result = expression.test(dni.value);
  const validated = () => {
    if (expression) {
      if (result) {
        setDni({ ...dni, valid: true, style: "success" });
      } else {
        setDni({ ...dni, valid: false, style: "error" });
      }
    }
  };
  return (
    <input
      className={`input ${dni.style}`}
      value={dni.value}
      id="input_dni"
      type="number"
      inputMode="numeric"
      placeholder="DNI"
      onChange={onChange}
      onKeyUp={validated}
      onBlur={validated}
    />
  );
}
