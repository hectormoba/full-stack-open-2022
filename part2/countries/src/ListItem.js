import { useState } from "react";
import CountryView from "./CountryView";

const ListItem = ({ country }) => {
  const [visible, setVisible] = useState(false);
  let countryDetails = null;

  const handleClick = () => {
    setVisible(!visible);
  };

  if (visible) {
    countryDetails = <CountryView country={country} />;
  }

  return (
    <div>
      <span>{country.name.common}</span>
      <button onClick={handleClick}>{visible ? "hide" : "show"}</button>
      {countryDetails}
    </div>
  );
};

export default ListItem;
