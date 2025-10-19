import profilePic from '../../assets/image/profilePic.jpg';
import { useInView } from "react-intersection-observer";
import ProjectCard from './ProjectCard';
import BottomNav from './BottomNav';
import AboutMe from './AboutMe';
import Contact from './Contact';
import studyFlow from '../../assets/Study Flow.png'
function Body() {
  const { ref:introRef, inView: introVeiw } = useInView({ threshold: 0.2});
  const {ref: projectRef, inView: projectVeiw} = useInView({threshold: 0.6})
  return(
    <>
      <div 
      className="intro-card"
      ref={introRef}
      style={{
        opacity: introVeiw ? 1 : 0,
        transform: introVeiw ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease-out",
      }}
      >
        <img src={profilePic} alt="profile pic"  className='profile-pic'/>
        <button className='dev-btn'>
          Frontend Developer
          </button>
          <br />
          <br />
          <p>
            I build great, accessible, responsive,  SEO-friendly web app using React.js, HTML, CSS, Javascript. i have 2+ years of experience  I am passionate about creating smooth user interfaces, maintaining excellent UI/UX, and writing clean, maintainable code. I craft modern user experiences
          </p>
          <a href="#contact">
          <button className='contact-btn'>Get In Touch</button>
          </a>

          <button className='CV-btn' onClick={ () => document.location.href='https://drive.google.com/file/d/1QfXFL-WB6p8xrekBoKptZKz_5TPJOBol/view'}>Download CV</button>
          
      </div>
      <AboutMe/>
      <br /><br />
      <h2 className='project-title' id='projects'>My projects</h2>
      <br />
      <div 
      className="projects"
      ref={projectRef}
      style={{
        opacity: projectVeiw ? 1 : 0,
        transform: projectVeiw ? `translateY(0px)`: 'translateY(30px)',
        transition: 'all 0.7s'
      }}
      >
              <ProjectCard imgURL={studyFlow} desTitle="Study Flow" des="A study website that makes studing easy and efficient for user with minimal distraction"/>
              <br /><br />
          </div>
          <div className="nav-bottom">
            <BottomNav/>
          </div>
      <Contact/>
      <footer style={{textAlign: 'center'}}>
      &copy; {new Date().getFullYear()} Excellent All rights reserved
      </footer>
    </>
  )
};

export default Body;
