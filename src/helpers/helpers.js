/**
 * Takes in an array of fish and averages the calories and fat.
 * Also returns the total number of fish, and the number of fish
 * not included in the calculation
 */
function calculateFishAverages(fishData) {
  let calories = 0;
  let fat = 0;
  let unavailableFish = 0;

  fishData.forEach((fish) => {
    const { Calories, FatTotal } = fish;
    // if the fish is not permitted for consumption,
    // don't include it in the total calculation
    if (!Calories || !FatTotal) {
      unavailableFish += 1;
      return;
    }

    calories += Number(Calories);
    fat += Number(FatTotal.slice(0, -2));
  });

  const totalFish = fishData.length - unavailableFish;

  return {
    calories: (calories / totalFish).toFixed(2),
    fat: (fat / totalFish).toFixed(2),
    unavailableFish,
    totalFish,
  };
}

export { calculateFishAverages };
