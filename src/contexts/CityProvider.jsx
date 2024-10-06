import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CityContext = createContext();

const base_url = "http://localhost:8000";

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  async function fetchCities() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${base_url}/cities`);
      const cities = res.data;
      setCities(cities);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCity(id) {
    try {
      setIsLoading(true);
      const res = await axios.get(`${base_url}/cities/${id}`);
      const city = res.data;
      setCurrentCity(city);
    } catch (e) {
      console.log(e);
      console.log(id, res.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        fetchCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("PostContext must be used within CityProvider");
  return context;
}

export { CityProvider, useCity };

/* error messages:

localhost:8000/cities/17806751:1 
        
Failed to load resource: the server responded with a status of 404 (Not Found)Understand this error
CityProvider.jsx:32 AxiosError
CityProvider.jsx:33 Uncaught (in promise) ReferenceError: res is not defined
    at fetchCity (CityProvider.jsx:33:23)Understand this error
localhost:8000/cities/17806751:1 
        
Failed to load resource: net::ERR_INTERNET_DISCONNECTEDUnderstand this error
client:176 [hmr] Failed to reload /src/contexts/CityProvider.jsx. This could be due to syntax errors or importing non-existent modules. (see errors above)
overrideMethod @ console.js:288
warnFailedUpdate @ client:176
fetchUpdate @ client:213
Show 1 more frame
Show lessUnderstand this error
localhost:8000/cities/73930385:1 
        
*/
