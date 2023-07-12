import { Link } from "react-router-dom";
import { calculateFishAverages } from "../helpers/helpers";

/**
 * Home Page, shows all fish regions
 * each showing the average calories and fat per serving for the fish in that region.
 */
export default function Home({ fishData, regions, showError }) {
  // future, add sort by fat, calorie, fish region buttons

  if(showError){
    return "Sorry, we are unable to load and show the fish data at this time"
  }

  return (
    <div>
      {regions.map((region) => {
        const { calories, fat, totalFish } = calculateFishAverages(
          fishData[region]
        );
        return (
          <Link
            key={region}
            to={"/" + region}
            // use styled components to pull this styling out
            style={{
              background: "#F5D5CB",
              display: "flex",
              width: "60%",
              fontSize: "1.1em",
              fontFamily: "sans-serif",
              border: "1px solid black",
              margin: "16px",
              padding: "4px",
              justifyContent: "space-between",
              alignItems: "center",
              textDecoration: "none",
              color: "black",
              borderRadius: "4px",
            }}
          >
            <div style={{ padding: "4px", width: "25%" }}>Region: {region}</div>
            <div
              style={{
                padding: "4px",
                margin: "4px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <div>Average Calories: {calories}</div>
              <div>Average Fat: {fat}</div>
            </div>
            <div style={{ padding: "4px", width: "16%" }}>
              Fish in region: {totalFish}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
