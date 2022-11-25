const capitalizeFirstLetter = (string) => {
  const lowerCase = string.toLowerCase();
  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
};

export function EmptyInformation() {
  return (
    <>
      <div className="input input_empty">Apellido paterno</div>
      <div className="input input_empty">Apellido materno</div>
      <div className="input input_empty">Nombres</div>
    </>
  );
}

export function InformationUser(props) {
  const users = props.users;

  return (
    <>
      <div className="input">
        {capitalizeFirstLetter(users.apellido_paterno)}
      </div>
      <div className="input">
        {capitalizeFirstLetter(users.apellido_materno)}
      </div>
      <div className="input">{capitalizeFirstLetter(users.nombres)}</div>
    </>
  );
}
