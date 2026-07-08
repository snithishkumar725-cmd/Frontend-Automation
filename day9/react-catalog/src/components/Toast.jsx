import { useEffect, useRef } from "react";
import styles from "./Toast.module.css";

export default function Toast({ message, visible }) {
  return (
    <div
      className={`${styles.toast} ${visible ? styles.visible : ""}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
