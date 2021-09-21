import { computeStats, filterData, sortAlphabeticalOrder, searchName } from "../src/data.js";

const mockData =
  [{
    "name": "Jessica",
    "status": "Alive",
    "species": "Cronenberg",
    "gender": "Female",
  },
  {
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "gender": "Male",
  },
  {
    "name": "Hamster In Butt",
    "status": "Alive",
    "species": "Animal",
    "gender": "unknown",
  }, {
    "name": "Agency Director",
    "status": "Dead",
    "species": "Human",
    "gender": "Male",
  },
  ]

const mockNames = [
  { "name": "Bearded Lady" },
  { "name": "Rick Sanchez" },
  { "name": "Morty Smith" },
  { "name": "Boobloosian" },
]

describe("filterData", () => {
  it('is a function', () => {
    expect(typeof filterData).toBe('function');
  });

  it("should return all characters that is Male", () => {
    const getAllCharacterThatIsMale = mockData
      .filter((gender) => gender.gender === 'Male')
    const statusExpected = filterData(getAllCharacterThatIsMale).length;
    const statusResults = 2;
    expect(statusExpected).toEqual(statusResults);
  });

  it("should return all characters that is Alive", () => {
    const getAllCharacterThatIsAlive = mockData
      .filter((status) => status.status === 'Alive')
    const statusExpected = filterData(getAllCharacterThatIsAlive).length;
    const statusResults = 3;
    expect(statusExpected).toEqual(statusResults);
  });

  it("should return all characters that is Human", () => {
    const getAllCharacterThatIsHuman = mockData
      .filter((species) => species.species === 'Human')
    const statusExpected = filterData(getAllCharacterThatIsHuman).length;
    const statusResults = 2;
    expect(statusExpected).toEqual(statusResults);
  });
});


describe("sortAlphabeticalOrder", () => {
  it("is a function", () => {
    expect(typeof sortAlphabeticalOrder).toBe("function");
  });

  describe('sortAlphabeticalOrder', () => {
    it('should be a function', () => {
      expect(typeof sortAlphabeticalOrder).toBe('function');
    });

    it('should return sorted by A-Z', () => {
      expect(sortAlphabeticalOrder(mockNames, "AZ")).toStrictEqual(mockNames);
    });
    it('should return sorted by Z-A', () => {
      expect(sortAlphabeticalOrder(mockNames, "ZA")).toStrictEqual(mockNames.reverse());
    });
  });
});

describe("computeStats", () => {
  it("is a function", () => {
    expect(typeof computeStats).toBe("function");
  });

  it("computeStats should return total alive characters", () => {
    const getAllCharacterThatIsAlive = mockData
      .filter((status) => status.status === 'Alive')
    const statusExpected = computeStats(getAllCharacterThatIsAlive);
    const statusResults = 3;
    expect(statusExpected).toEqual(statusResults);
  });
});

describe("searchName", () => {
  it("is a function", () => {
    expect(typeof searchName).toBe("function");
  });

  it('retorna o nome do personagem digitado pelo usuario', () => {
    const expected = searchName(mockData, 'Rick Sanchez', 'name')
    console.log();
    expect(expected[0]).toEqual('Rick Sanchez')

  });
});
