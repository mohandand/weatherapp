import SearchCity from "./components/SearchCity";

function App() {

  // const location = useGeoLocation();

  return (
    <div className="App">
      <header className="App-header">
        
          {/* {location.loaded ? JSON.stringify(location) : "Location not avilable"} */}
          {/* <SearchCity location={JSON.stringify(location.coordinates)}/> */}
          <SearchCity />
    
      </header>
    </div>
  );
}

export default App;
