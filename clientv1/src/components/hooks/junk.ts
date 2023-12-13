import InputField from "@/components/share/InputField/InputField";
import {
  getFilterSearchData,
  getUniqueWebsite,
} from "@/components/hooks/globalHooks";
import { Loader, Tabs } from "@mantine/core";
import dynamic from "next/dynamic";
import { Data } from "plotly.js";

import React, { useState, useEffect } from "react";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface TabGraphProps {
  filteredData: any;
  data: any;
  setData: (value: any) => void;
  setFilteredData: (value: any) => void;
  dataLoading: boolean;
  currTab: string;
  setCurrTab: (value: string) => void;
}

const TabGraph = ({
  data,
  filteredData,
  setFilteredData,
  dataLoading,
  currTab,
  setCurrTab,
}: TabGraphProps) => {
  const [input, setInput] = useState("");
  const [traces, setTraces] = useState<Data[]>();
  const [barTraces, setBarTraces] = useState<any>();
  const [averageTraces, setAverageTraces] = useState<any>();
  const [filteredWebsite, setFilteredWebsite] = useState<any>();
  const [trendTraces, setTrendTraces] = useState<any>();

  useEffect(() => {
    setFilteredWebsite(getUniqueWebsite(data));
  }, [filteredData]);

  useEffect(() => {
    graph();   
  }, [filteredData, filteredWebsite, data]);

  
  const graph = () => {
    setTraces(
      filteredWebsite?.map((keyword: any) => {
        const filteredTwoYearCost = filteredData?.two_year_cost.filter(
          (value: any, index: number) => {
            return filteredData?.website[index] === keyword;
          }
        );
        const filteredCategory = filteredData?.provider.filter(
          (value: any, index: number) => {
            return filteredData?.website[index] === keyword;
          }
        );
        // console.log("filteredTwoYearCost", filteredTwoYearCost)
        return {
          x: filteredData?.dates,
          y: filteredTwoYearCost,
          z:filteredCategory,
          type: "scatter",
          mode: "markers",
          name: keyword,
          hoverinfo: "y+z+name",
          showlegend: true,
        };
      })
    );
  };

  

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilteredData(getFilterSearchData(filteredData, input));
  };

  return (
    <div className="w-full h-full">
      <Tabs value={currTab} onTabChange={(value: any) => setCurrTab(value)}>
        <Tabs.List>
          <Tabs.Tab value="scatter">Timeseries of Digital Demand</Tabs.Tab>
          <Tabs.Tab value="trend-average">
            Moving Average & Trend of Digital Demand
          </Tabs.Tab>
        </Tabs.List>
        <div className="py-3 flex justify-end">
          <InputField input={input} setInput={setInput} onSubmit={onSubmit} />
        </div>
        <Tabs.Panel className="w-full h-full" value="scatter" pt="xs">
          {traces && !dataLoading ? (
            <Plot
              className="w-full"
              data={traces}
              layout={{
                title: "Scatter Plot of Average Monthly Cost per Month",
                yaxis: {
                  title: "Two Year Cost",
                  automargin: true,
                },
                xaxis: {
                  title: "Date",
                  automargin: true,
                },
                autosize: true,
                height: 600,
                margin: {
                  l: 10,
                  r: 10,
                  t: 30,
                  b: 20,
                },
                legend: {
                  font: {
                    size: 20,
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
          ) : (
            <Loader />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="trend-average">
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default TabGraph;
