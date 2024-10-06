import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCity } from "../contexts/CityProvider";

export default function CountryList() {
  const { cities, isLoading } = useCity();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add a city" />;

  // generate a list of unique countries from the cities array.
  // acc: the value that accumulates the result. It starts with [].
  // city: current item being processed from the `cities` array.
  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country))
      return [...acc, { country: city.country, emoji: city.emoji }];
    else return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

/* 
const uniqueCountries = Array.from(
  new Set(cities.map((city) => city.country))
).map((country) => {
  const { emoji } = cities.find((city) => city.country === country);
  return { country, emoji };
});

*/
