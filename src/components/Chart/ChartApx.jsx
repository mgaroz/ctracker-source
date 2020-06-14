import React, { Fragment } from "react";
import ReactApexChart from "react-apexcharts";

const ApxBar = ({ confirmed, recovered, deaths, country }) => {
  let cValue;
  let aValue;
  let rValue;
  let dValue;
  if (confirmed) {
    cValue = confirmed.value;
    rValue = recovered.value;
    dValue = deaths.value;
    aValue = cValue - (rValue + dValue);
  }

  const series = [
    {
      name: ["Value"],
      data: [cValue, aValue, rValue, dValue],
    },
  ];

  const options = {
    chart: {
      type: "bar",
    },
    colors: [
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 159, 64, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(255, 99, 132, 0.6)",
    ],
    plotOptions: {
      bar: {
        columnWidth: "55%",
        distributed: true,
        barHeight: "70%",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "15px",
        colors: ["#fafafa"],
      },
      offsetY: -25,
      background: {
        enabled: true,
        foreColor: "#000",
        borderColor: "#fafafa",
      },
    },
    grid: {
      padding: {
        top: 20,
      },
    },
    xaxis: {
      categories: ["Infected", "Active", "Recovered", "Deaths"],
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
    responsive: [
      {
        breakpoint: 450,
        options: {
          chart: {
            height: 350,
          },
        },
        legend: {
          position: "bottom",
        },
      },
    ],
    title: {
      text: `Current state in ${country}`,
      position: "top",
      align: "center",
      style: {
        color: "#000",
        fontWeight: 400,
        fontSize: "20px",
        fontFamily: "Roboto",
      },
    },
    stroke: {
      width: 3,
      colors: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
      ],
    },
  };

  const apxBar = country ? (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      //height={415}
      //height={650}
      height="100%"
      // width={1280}
      style={{ fontFamily: "Roboto", width: "80%" }}
    />
  ) : null;

  return <Fragment>{apxBar}</Fragment>;
};

export default ApxBar;
