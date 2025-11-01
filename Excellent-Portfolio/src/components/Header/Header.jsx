import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Hamburger() {
  const [open, setOpen] = useState(false);

  return (
    <header className=''>
        <div className="bg-gray-950 w-fit py-6 px-8 rounded-2xl flex space-x-2.5 fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <span className=''>
          <a href="https://x.com/Excellent67144?t=6SDp6kMPSmk-Kj2H_dTgnw&s=09" className=''>
              <FontAwesomeIcon icon={faXTwitter} size="2x" color="#ccc"/>
        </a>
        </span>
        <span className=''>
          <a href="https://github.com/ExcellentKomolafe" className=''>
          <FontAwesomeIcon icon={faGithub} size="2x" color="#ccc"/>
          </a>
        </span>
        <span className=''>
          <a href="https://www.linkedin.com/in/ayoola-komolafe-b0871230a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className=''>
          <FontAwesomeIcon icon={faLinkedin} size="2x" color="#ccc"/>
          </a>
          </span>
        </div>

      <nav>
        <button className='' onClick={() => setOpen(!open)}>
          <span
            className=''
          ></span>
          <span
            className=''
          ></span>
          <span
            className=''
          ></span>
        </button>
      </nav>
    </header>
  );
}
