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

  
  const colorMapping: { [key: string]: string } = {
    '1und1': '#9A31CD',
    Congstar: '#040404',
    o2: '#0166FF',
    Telekom: '#E2007A',
    Vodafone: '#F91600',
    Otelo: '#FE6B6A',
    Blau: '#30B8DB',
    Crash: '#007a72',
    High: '#f34759',
    Megasim: '#4442d8',
    Check24: '#042894',
    Deinhandy: '#CCBF71',
    Verivox: '#CC593F',
    Saturn: '#f27c05',
    Mediamarkt: '#770800',
    MediaMarktSaturn: '#770800',
    Klarmobil: '#EA7715',
    'freenet Mobile': '#1CCC48',
    Sparhandy: '#911111',
  };

  function getRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  const graph = () => {
    const latestDate = new Date(Math.max(...(filteredData?.dates ?? []).map((date: string) => new Date(date))));
    const oneWeekAgo = new Date(latestDate);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
    setTraces(
      filteredWebsite?.map((keyword: any) => {
        const filteredTwoYearCost = filteredData?.two_year_cost.filter(
          (value: any, index: number) => {
            const date = new Date(filteredData?.dates[index]);
            return filteredData?.website[index] === keyword && date >= oneWeekAgo;
          }
        );
        const filteredCategory = filteredData?.provider.filter(
          (value: any, index: number) => {
            const date = new Date(filteredData?.dates[index]);
            return filteredData?.website[index] === keyword && date >= oneWeekAgo;
          }
        );
        return {
          x: filteredData?.dates.filter((date: string) => {
            const dateObj = new Date(date);
            return dateObj >= oneWeekAgo;
          }),
          y: filteredTwoYearCost,
          
          marker: {
            color: filteredCategory.map((category: any) => colorMapping[category] || getRandomColor()),
          },
          type: "scatter",
          mode: "markers",
          name: keyword,
          hoverinfo: "y+name+text",
          text: filteredCategory.map((category: any) => ` ${category}`),
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
          <Tabs.Tab value="scatter">Time Series of Plan Pricing</Tabs.Tab>
          <Tabs.Tab value="trend-average">
            Moving Average & Trends of Tariffs and Plan
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
                title: "Time Series of Plan Pricing",
                yaxis: {
                  title: "Average Monthly Cost",
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
