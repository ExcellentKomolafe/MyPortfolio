import { useInView } from "react-intersection-observer";
export default function AboutMe() {
  const {ref, inView} = useInView({threshold: 0.2})
  return(
    <div className="about-me" id='about-me' ref={ref} style={
      {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate(0px, 0px)' : 'translate(10px, 20px)',
        transition: 'all 0.8s'
    }
    }>
            <h2 className="text-3xl text-center mb-6">About me</h2>

            <p className="w-4/5 mx-auto mb-6">
            My name is Komolafe Ayoola Excellent, and I am a Frontend Engineer with 2+ years of experience designing fast, usable, and SEO-friendly web applications. My specialty is crafting smooth-looking UIs with React.js and bringing things to life .</p>
            <p className="w-4/5 mx-auto mb-6">
            Alongside my frontend experience, I possess good Frontend skills in JavaScript. This allows me to manage projects from start-to-finish, from designing smooth UIs to create great user experince.
            </p>
           
            <p className="w-4/5 mx-auto mb-6">
            Outside of my tech career I'm a nursing student, I enjoy music. I'm always up for learning, experimenting, and growing and looking for opportunities wherein I can bring value toward impactful products and inventive teams.
            </p>
          </div>
  );
}