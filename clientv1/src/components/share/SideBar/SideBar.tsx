import DateRangePicker from "@/components/share/DateRangerPicker/DateRangerPicker";
import {
  getFilterProvider,
  getFilterWebsite,
  // getFilterKeywords,
  getUniqueProvider,
  getUniqueWebsite,
  getFilterDate,
  // getUniqueKeywords,
} from "@/components/hooks/globalHooks";
import { Button, Checkbox, Divider, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getDateArray } from "@/libs/date";
import MultiSelectDropdown from "../MultiSelctDropdown/MultiSelectDropdown";

interface SideBarProps {
  data: any;
  setFilteredData: (value: any) => void;
  filteredData: any;
  // showAverage: boolean;
  // setShowAverage: (value: boolean) => void;
  currTab: string;
}

const SideBar = ({
  data,
  setFilteredData,
  filteredData,
  // showAverage,
  // setShowAverage,
  currTab,
}: SideBarProps) => {
  // const [selectedKeyword, setSelectedKeyword] = useState<string[] | []>([]);
  const [selectedWebsite, setSelectedWebsite] = useState<string[] | []>([]);
  const [selectedProvider, setSelectedProvider] = useState<string[] | []>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>();
  // const allKeywords = getUniqueKeywords(data);
  const allWebsite = getUniqueWebsite(data);
  const allProvider = getUniqueProvider(data);

  useEffect(() => {
    // setSelectedKeyword(getUniqueKeywords(filteredData) as string[]);
    setSelectedWebsite(getUniqueWebsite(filteredData) as string[]);
    setSelectedProvider(getUniqueProvider(filteredData) as string[]);
  }, [filteredData]);

  const handleDateChange = (dates: any) => {
    console.log(dates);
    if (dates.length === 2) {
      setSelectedDates(getDateArray(dates));
    }
  };

  const submit = (e: any) => {
    e.preventDefault();
    const filteredDateDate = getFilterDate(selectedDates, data);
    const getFilteredWebsites = getFilterWebsite(
      selectedWebsite,
      filteredDateDate
    );
    // const getFilterCountries = getFilterCountry(
    //   selectedWebsite,
    //   getFilteredKeywords
    // );
    const getFilterProviders = getFilterProvider(
      selectedProvider,
      getFilteredWebsites
    );
    setFilteredData(getFilterProviders);
  };

  return (
    <div className="w-64 flex-shrink-0 space-y-2 ">
      <MultiSelectDropdown
        label="Website"
        placeholder="Pick any Website"
        value={selectedWebsite}
        allData={allWebsite}
        setSelectedValue={setSelectedWebsite}
      />
      {/* {selectedCountry && (
        <MultiSelectDropdown
          label="Country"
          placeholder="Pick any Keyword"
          value={selectedCountry}
          allData={allCountries}
          setSelectedValue={setSelectedCountry}
        />
      )} */}
      {selectedWebsite && (
        <MultiSelectDropdown
          label="Catgeory"
          placeholder="Pick any Catgeory"
          value={selectedProvider}
          allData={allProvider}
          setSelectedValue={setSelectedProvider}
        />
      )}
      <DateRangePicker
        label={
          <div className="flex w-full justify-between">
            <span>Date</span>
          </div>
        }
        placeholder="Select Date Range"
        classNames={{ label: "w-full" }}
        onChange={handleDateChange}
      />
      <Divider />
      <Button
        className="w-full py-3"
        placeholder="Select Dates"
        variant="outline"
        onClick={submit}
      >
        Submit
      </Button>
      <Divider />
      {/* {currTab === "scatter" && (
        <div>
          <Divider />
          <Text>Conputational Value Filters</Text>
          <Checkbox
            label="Show Averages"
            onChange={() => setShowAverage(!showAverage)}
          />
        </div>
      )} */}
    </div>
  );
};

export default SideBar;
