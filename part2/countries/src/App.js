import { useEffect, useState } from "react";
import List from "./List";
import CountryView from "./CountryView";
import axios from "axios";

const URL_API = "https://restcountries.com/v3.1/all";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(URL_API).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const renderListOrCountryInfo = () => {
    if (search.length === 0) {
      return <p>Try to search a country</p>;
    }

    let regExpToMatch = new RegExp(search, "i");
    let filteredCountryResults = countries.filter((country) =>
      country.name.common.match(regExpToMatch)
    );

    if (filteredCountryResults.length >= 10) {
      return <p>Too many results, please be more precise</p>;
    } else if (filteredCountryResults.length === 1) {
      let country = filteredCountryResults[0];
      return <CountryView country={country} />;
    } else {
      return <List countries={filteredCountryResults} />;
    }
  };

  return (
    <>
      <label htmlFor="country">search a country </label>
      <input value={search} onChange={handleChange} name="country" />
      <div>{renderListOrCountryInfo()}</div>
    </>
  );
};

export default App;
