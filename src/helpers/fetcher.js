/**
 * Using our constant API, get all fishData from the API
 * and return all the fish sorted by region.
 */
const fetchFish = async () => {
  const key = process.env.REACT_APP_API_KEY
  if(!key){
    console.error("NO API key found")
  }
  const response = await fetch(
    // best to instantiate this with AWS Secret Manager/ etc
    "http://localhost:5001/gofish?apikey=" + key
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();

  // sort all the fish by region
  const fishByRegion = {};
  data.forEach((datum) => {
    if (fishByRegion[datum.NOAAFisheriesRegion]) {
      fishByRegion[datum.NOAAFisheriesRegion].push(datum);
    } else {
      fishByRegion[datum.NOAAFisheriesRegion] = [datum];
    }
  });

  return fishByRegion;
};

export { fetchFish };
