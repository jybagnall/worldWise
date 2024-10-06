import styles from "./Button.module.css";

export default function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
/*
className={`${styles.btn} ${styles[type]}`} is equivalent to 
className={"btn primary"}

[] allows to access a class from the styles object,
   based on the value of the `type` variable.
 */
