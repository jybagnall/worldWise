import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCity } from "../contexts/CityProvider";

export default function CityList() {
  const { cities, isLoading } = useCity();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add a city" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
