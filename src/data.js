export const filterData = (data, type, condition) => {
  const filterResults = data.filter(results => results[type] === condition);
  return filterResults;
};

export const sortAlphabeticalOrder = (data, order) => {
  if (order === "AZ") {
    return data.sort((a, z) => a.name > z.name ? 1 : -1);
  } else {
    return data.sort((a, z) => a.name > z.name ? -1 : 1);
  }
};

export const computeStats = (data, typeData, condition) => data.reduce((initialType, totalType) => {
  return initialType + (totalType[typeData] === condition) ;
},0);

export const searchName = (data, condition, type) => {

  const searchResults = data.filter(search => search[type].toLowerCase().includes(condition.toLowerCase()));
  return searchResults;
}

