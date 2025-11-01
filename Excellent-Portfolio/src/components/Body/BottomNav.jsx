import {useInView} from 'react-intersection-observer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faContactBook, faContactCard, faFolder, faHouse, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
function BottomNav () {
  const {ref, inView} = useInView({threshold: 0.2})
  return(
    <div className="hidden fixed bottom-0 w-full bg-[#c4c4c433] mx-auto py-6 rounded-5xl sm:flex justify-between  px-20 items-center  backdrop-blur-3xl left-0 text-gray-800 rounded-['80px]">
     <a href="#">
        <FontAwesomeIcon icon={faHouse}/>
        </a>
    <a href="#about-me">
    <FontAwesomeIcon icon={faInfoCircle}/>
    </a>
      <a href="#projects">
        <FontAwesomeIcon icon={faFolder}/></a>
      <a href="#contact">
      <FontAwesomeIcon icon={faContactBook}/>
      </a>
    </div>
  )
}

export default BottomNav