import "./App.css";
import useCookie from "./useCookie";

function App() {
  const [allowGAcookie, updateAllowGAcookie] = useCookie(
    "allowGoogleAnalytics",
    "G-2WHW7E8WPX"
  );

  return (
    <div className="mx-auto container">
      <div>
        <h1>allow Google Analytics:</h1>
        {allowGAcookie ? (
          <div>GA is allowed</div>
        ) : (
          <div>GA is not allowed</div>
        )}
        <button
          className="bg-gray-200 mt-2"
          onClick={() => {
            updateAllowGAcookie(true, 10);
          }}
        >
          Click to allow GA
        </button>
        <br></br>
        <button
          className="bg-red-200 mt-2"
          onClick={() => {
            updateAllowGAcookie(false, 10);
          }}
        >
          Click to disallow GA
        </button>
      </div>
    </div>
  );
}

export default App;
