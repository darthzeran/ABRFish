import { useParams } from "react-router-dom";
import { calculateFishAverages } from "../helpers/helpers";

/**
 * Shows the list of fish for each region
 * including:
 * The average calories and fat per serving for the fish in that region.
 * and
 * A list of fish from that region with:
 * - the name of the fish
 * - an image
 * - calories / fat per serving
 * - some descriptive text
 */
export default function Display({ fishData, showError }) {
  let { region } = useParams();
  const data = fishData[region] || [];
  
  if(showError){
    return "Sorry, we are unable to load and show the fish data at this time"
  }

  const fishAverages = calculateFishAverages(data);

  // again, use styled components to pull all this out to be cleaner and reusable
  // todo add buttons to sort fish by category
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          fontSize: "1.3em",
          padding: "32px",
          background: "#FAFAD2",
          width: "fit-content",
          borderRadius: "4px",
          marginLeft: '16px'
        }}
      >
        <h3> Key Details Summary </h3>
        <div>Average Calories: {fishAverages.calories}</div>
        <div>Average Fat: {fishAverages.fat}</div>
        <div>Total number of fish: {fishAverages.totalFish}</div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {data
          .sort((a, b) => a.SpeciesName.localeCompare(b.SpeciesName))
          .map((fish) => {
            const {
              SpeciesName,
              SpeciesIllustrationPhoto: { alt, src },
              Calories,
              FatTotal,
              PhysicalDescription,
            } = fish;
            return (
              <div
                key={SpeciesName}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  border: "1px solid black",
                  margin: "16px",
                  minHeight: "15em",
                  background: "#F8F1E9",
                  borderRadius: "4px",
                }}
              >
                <img
                  alt={alt}
                  src={src}
                  style={{
                    objectFit: "contain",
                    width: "30%",
                    maxHeight: "15em",
                    padding: "8px",
                  }}
                />
                <div style={{ fontWeight: 600 }}> {SpeciesName} </div>
                <div style={{ lineHeight: 2 }}>
                  {/* some fish do not have data for consumption,
                  so let the user know that */}
                  {Calories ? (
                    <>
                      <div>Calories: {Calories}</div>
                      <div>Fat: {FatTotal}</div>
                    </>
                  ) : (
                    <div style={{ textAlign: "center", width: "98%" }}>
                      This fish is not available for consumption
                    </div>
                  )}
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: PhysicalDescription }}
                  style={{ width: "35%" }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
