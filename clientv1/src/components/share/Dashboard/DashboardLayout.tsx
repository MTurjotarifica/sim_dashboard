import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import { Divider } from "@mantine/core";
import TabGraph from "@/components/share/TabGraphs/TabGraph";
import { getFilterWebsite } from "@/components/hooks/globalHooks";
import { initalGraph } from "@/libs/global";
import { getData } from "@/api/getData";

const DashboardLayout = () => {
  const [apiData, setApiData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [dataLoading, setDataLoading] = useState(true);
  // const [showAverage, setShowAverage] = useState(false);
  const [currTab, setCurrTab] = useState<string>("scatter");

  const graphData = async () => {
    const response = await getData(setDataLoading);
    setApiData(response.data);
    setFilteredData(response.data);
    setDataLoading(false);
    setFilteredData(getFilterWebsite(initalGraph, response.data));
    // console.log("aa", response.data.dates)
  };

  useEffect(() => {
    graphData();
  }, []);

  return (
    <div className="flex gap-2 items-start">
      <SideBar
        data={apiData}
        setFilteredData={setFilteredData}
        filteredData={filteredData}
        // setShowAverage={setShowAverage}
        // showAverage={showAverage}
        currTab={currTab}
      />
      <Divider orientation="vertical" />
      <TabGraph
        data={apiData}
        filteredData={filteredData}
        setData={setApiData}
        setFilteredData={setFilteredData}
        dataLoading={dataLoading}
        // showAverage={showAverage}
        currTab={currTab}
        setCurrTab={setCurrTab}
      />
    </div>
  );
};

export default DashboardLayout;
