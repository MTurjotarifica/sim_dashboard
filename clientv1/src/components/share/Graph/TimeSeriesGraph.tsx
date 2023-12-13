import React from "react";
import Plot from "react-plotly.js";

interface TimeSeriesGraphProps {
  data: any;
  titleX: any;
  titleY: any;
}

const TimeSeriesGraph = ({ data, titleX, titleY }: TimeSeriesGraphProps) => {
  return (
    <Plot
      data={data}
      layout={{
        title: "Digital Demand",
        yaxis: {
          title: titleY,
          automargin: true,
        },
        xaxis: {
          title: titleX,
          automargin: true,
        },
        width: 1400,
        height: 900,
        autosize: true,
        margin: {
          l: 80,
          r: 100,
          t: 100,
          b: 80,
        },
        legend: {
          font: {
            size: 12,
          },
        },
      }}
      config={{
        toImageButtonOptions: {
          format: "svg",
          width: 1900,
          height: 1000,
        },
      }}
    />
  );
};

export default TimeSeriesGraph;
