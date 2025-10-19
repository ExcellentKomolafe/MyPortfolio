import { useState } from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Hamburger() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>

      </div>

        <div className={`${styles.navLinks} ${open ? styles.open : ""}`}> 
        <span className={styles.socialLinkSpan}>
          <a href="https://x.com/Excellent67144?t=6SDp6kMPSmk-Kj2H_dTgnw&s=09" className={styles.socialLink}>
              <FontAwesomeIcon icon={faXTwitter} size="2x" color="#ccc"/>
        </a>
        </span>
        <span className={styles.socialLinkSpan}>
          <a href="https://github.com/ExcellentKomolafe" className={styles.socialLink}>
          <FontAwesomeIcon icon={faGithub} size="2x" color="#ccc"/>
          </a>
        </span>
        <span className={styles.socialLinkSpan}>
          <a href="https://www.linkedin.com/in/ayoola-komolafe-b0871230a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className={styles.socialLink}>
          <FontAwesomeIcon icon={faLinkedin} size="2x" color="#ccc"/>
          </a>
          </span>
        </div>

      <nav>
        <button className={styles.hamburger} onClick={() => setOpen(!open)}>
          <span
            className={`${styles.bar} ${styles.bar1} ${open ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.bar} ${styles.bar2} ${open ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.bar} ${styles.bar3} ${open ? styles.open : ""}`}
          ></span>
        </button>
      </nav>
    </header>
  );
}
