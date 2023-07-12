import { Link, useParams } from "react-router-dom";

const linkStyling = { color: "blue", padding: "8px" };

/**
 * Header, creates a dynamic nav bar for each fishing region
 */
export default function Header({ pages }) {
  let { region } = useParams();

  return (
    <header
      style={{
        background: "#F6C5C1",
        margin: "8px",
        padding: "8px",
        borderRadius: '4px'
      }}
    >
      <h2 style={{ marginBottom: "0" }}>
        {region ? `${region} Region Fishery Fish` : "NOAA Fisheries Home"}
      </h2>
      <nav style={{ display: "flex" }}>
        <Link to="/" style={linkStyling}>
          Home
        </Link>
        {pages.sort().map((pageName) => (
          <Link key={pageName} to={`/${pageName}`} style={linkStyling}>
            {pageName}
          </Link>
        ))}
      </nav>
    </header>
  );
}
