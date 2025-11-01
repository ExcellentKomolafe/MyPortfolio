import profilePic from '../../assets/image/profilePic.jpg';
import { useInView } from "react-intersection-observer";
import ProjectCard from './ProjectCard';
import BottomNav from './BottomNav';
import AboutMe from './AboutMe';
import Contact from './Contact';
import studyFlow from '../../assets/Study Flow.png'
function Body() {
  const { ref:introRef, inView: introVeiw } = useInView({ threshold: 0.2});
  const {ref: projectRef, inView: projectVeiw} = useInView({threshold: 0.2})
  return(
    <>
      <div 
      className="mt-30"
      ref={introRef}
      style={{
        opacity: introVeiw ? 1 : 0,
        transform: introVeiw ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease-out",
      }}
      >
        <img src={profilePic} alt="profile pic"  className='w-3/5 mx-auto lg:w-1/3 rounded-full hover:grayscale-75 transition-all'/>
        <button className='mx-auto block my-6 bg-slate-100 py-3 px-4 rounded-2xl border shadow-sm cursor-pointer'>
          Frontend Developer
          </button>
         
          <p className='mx-auto w-4/5'>
            I build great, accessible, responsive,  SEO-friendly web app using React.js, HTML, CSS, Javascript. i have 2+ years of experience  I am passionate about creating smooth user interfaces, maintaining excellent UI/UX, and writing clean, maintainable code. I craft modern user experiences
          </p>
          <div className="flex w-full items-center justify-center space-x-4">
          <a href="#contact">
          <button className='bg-slate-900  my-6 py-3 px-4 rounded-2xl border shadow-sm cursor-pointer text-white hover:-translate-y-1 transition-all ease-in-out'>Get In Touch</button>
          </a>

          <button className='my-6 bg-slate-100 py-3 px-4 rounded-2xl border shadow-sm cursor-pointer hover:-translate-y-1 transition-all ease-in-out' onClick={ () => document.location.href='https://drive.google.com/file/d/1QfXFL-WB6p8xrekBoKptZKz_5TPJOBol/view'}>Download CV</button>
          </div>
          
      </div>
      <AboutMe/>

      <h2 className="text-3xl text-center mb-4">My projects</h2>
      <div 
      className="projects"
      ref={projectRef}
      style={{
        opacity: projectVeiw ? 1 : 0,
        transform: projectVeiw ? `translateY(0px)`: 'translateY(10px)',
        transition: 'all 0.7s'
      }}
      >
              <ProjectCard imgURL={studyFlow} desTitle="Study Flow" des="A study website that makes studing easy and efficient for user with minimal distraction"/>
              <br /><br />
          </div>
      <Contact/>
      <BottomNav/>
      <footer className='text-center mt-10 mb-2'>
      &copy; {new Date().getFullYear()} Excellent All rights reserved
      </footer>
    </>
  )
};

export default Body;
