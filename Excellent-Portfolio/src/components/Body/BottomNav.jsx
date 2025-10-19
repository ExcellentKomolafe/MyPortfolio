import {useInView} from 'react-intersection-observer'

function BottomNav () {
  const {ref, inView} = useInView({threshold: 0.2})
  return(
    <div className="bottom-nav">
      <span><a href="#">Home</a></span>
      <span><a href="#about-me">About</a></span>
      <span><a href="#projects">Project</a></span>
      <span><a href="#contact">Contact</a></span>
    </div>
  )
}

export default BottomNav