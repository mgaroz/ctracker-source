import React, { useState, useEffect } from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/covid19.png";

const App = () => {
  const [state, setState] = useState({
    data: {},
    country: "",
  });

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setState({ data: result });
    };
    getData();
  }, []);

  const handleCountryChange = async (country) => {
    const getData = await fetchData(country);
    if (getData === undefined) {
      return;
    }
    setState({ data: getData, country: country });
  };

  const { data, country } = state;

  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt="COVID-19" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
};

export default App;
