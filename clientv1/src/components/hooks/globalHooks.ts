// export function getUniqueKeywords(data: any) {
//   const uniqueKeywords = Array.from(new Set(data.keywords));
//   return uniqueKeywords;
// }

export function getUniqueWebsite(data: any) {
  const uniqueKeywords = Array.from(new Set(data.website));
  return uniqueKeywords;
  console.log("uniqueKeywords", uniqueKeywords)
}

export function getUniqueProvider(data: any) {
  const uniqueKeywords = Array.from(new Set(data.provider));
  return uniqueKeywords;
}

export function getFilterSearchData(data: any, input: string) {
  const inputKeyword: string = input.trim();

  const filtered = {
    website: [] as string[],
    dates: [] as string[],
    provider: [] as string[],
    id: [] as (null | number)[],
    two_year_cost: [] as number[],
  };

  for (let i = 0; i < data.provider.length; i++) {
    if (data.provider[i].includes(inputKeyword)) {
      filtered.dates.push(data.dates[i]);
      filtered.provider.push(data.provider[i]);
      filtered.id.push(data.id[i]);
      filtered.two_year_cost.push(data.two_year_cost[i]);
    }
  }
  return filtered;
}

export function getFilterWebsite(selectedKeyword: any, data: any) {
  const filtered = {
    website: [] as string[],
    dates: [] as string[],
    provider: [] as string[],
    id: [] as (null | number)[],
    two_year_cost: [] as (number)[],
  };
  
  for (let i = 0; i < data.website.length; i++) {
    if (selectedKeyword?.some((keyword: any) => data.website[i] === keyword)) {
      filtered.website.push(data.website[i]);
      filtered.dates.push(data.dates[i]);
      filtered.provider.push(data.provider[i]);
      filtered.id.push(data.id[i]);
      filtered.two_year_cost.push(data.two_year_cost[i]);
    }
  }
  return filtered;
}

export function getFilterDate(selectedDate: any, data: any) {
  if (!selectedDate) {
    return data;
  }
  const filtered = {
    website: [] as string[],
    dates: [] as string[],
    provider: [] as string[],
    id: [] as (null | number)[],
    two_year_cost: [] as (number)[],
  };

  for (let i = 0; i < data.dates.length; i++) {
    if (selectedDate?.some((dates: any) => data.dates[i].includes(dates))) {
      filtered.website.push(data.website[i]);
      filtered.dates.push(data.dates[i]);
      filtered.provider.push(data.provider[i]);
      filtered.id.push(data.id[i]);
      filtered.two_year_cost.push(data.two_year_cost[i]);
    }
  }
  return filtered;
}


export function getFilterProvider(selectedCategory: any, data: any) {
  const filtered = {
    website: [] as string[],
    dates: [] as string[],
    provider: [] as string[],
    id: [] as (null | number)[],
    two_year_cost: [] as (number)[],
  };

  for (let i = 0; i < data.provider.length; i++) {
    if (
      selectedCategory?.some((keyword: any) =>
        data.provider[i].includes(keyword)
      )
    ) {
      filtered.website.push(data.website[i]);
      filtered.dates.push(data.dates[i]);
      filtered.provider.push(data.provider[i]);
      filtered.id.push(data.id[i]);
      filtered.two_year_cost.push(data.two_year_cost[i]);
    }
  }
  return filtered;
}
