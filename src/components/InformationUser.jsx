const capitalizeFirstLetter = (string) => {
  const lowerCase = string.toLowerCase();
  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
};

export function EmptyInformation() {
  return (
    <>
      <div className="input input_empty">vacio</div>
      <div className="input input_empty">vacio</div>
      <div className="input input_empty">vacio</div>
    </>
  );
}

export function InformationUser(props) {
  const users = props.users;

  return (
    <>
      <div className="input">{capitalizeFirstLetter(users.paterno)}</div>
      <div className="input">{capitalizeFirstLetter(users.materno)}</div>
      <div className="input">{capitalizeFirstLetter(users.nombres)}</div>
    </>
  );
}
