import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import styles from "./Chart.module.css";
import ReactApexChart from "react-apexcharts";
import ApxBar from "./ChartApx";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  let dConf;
  let dDeath;
  if (dailyData.length) {
    dConf = dailyData.map(({ date, confirmed }) => ({
      x: date,
      y: confirmed,
    }));
    dDeath = dailyData.map(({ date, deaths }) => ({ x: date, y: deaths }));
  }

  const series = [
    {
      name: "Deaths",
      data: dDeath,
    },
    {
      name: "Confirmed",
      data: dConf,
    },
  ];

  const options = {
    chart: {
      type: "area",
      stacked: true,
      fontFamily: "Roboto",
    },
    colors: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "straight",
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  const mahChart = dailyData.length ? (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={650}
      width={1280}
      style={{ fontFamily: "Roboto" }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {country ? (
        <ApxBar
          confirmed={confirmed}
          recovered={recovered}
          deaths={deaths}
          country={country}
        />
      ) : (
        mahChart
      )}
    </div>
  );
};

export default Chart;
