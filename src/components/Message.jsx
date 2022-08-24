export default function Message({ deployMessage, setDeployMessage }) {
  return (
    <div className={`message ${deployMessage.value}`}>
      {deployMessage.value === "success" ? (
        <label>Consulta exitosa</label>
      ) : deployMessage.value === "error" ? (
        <label>Datos Incorrectos</label>
      ) : (
        <label>El campo esta vacio</label>
      )}
    </div>
  );
}
