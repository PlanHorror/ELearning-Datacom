import styles from "./alert.icon.module.scss";

const AlertIcon = () => {
  return (
    <div className={styles.notification}>
      <div className={styles.bell_container}>
        <div className={styles.bell}></div>
      </div>
    </div>
  );
};

export default AlertIcon;
