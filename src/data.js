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

export const computeStats = {

  characters: (data) => (data).length,

  gender: (data, genderParameter) => {

    const totalByGender = data.reduce(function (total, character) {
      if (character.gender === genderParameter) {
        return total + 1;
      }
      return total;
    }, 0)
    const average = Number(((totalByGender / data.length) * 100).toFixed(2));
    return average;
  },

};

export const searchName = (data, condition) => {
  const searchResults = data.filter(n => n.name.toLowerCase().includes(condition.toLowerCase()));
  return searchResults;
}

