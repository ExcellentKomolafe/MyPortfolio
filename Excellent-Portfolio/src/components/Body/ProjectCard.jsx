function ProjectCard({imgURL, des, desTitle}) {
  return(
    <div className="w-fit lg:w-1/2  mx-auto">
        <img src={imgURL} alt="project image" className="w-9/10 mx-auto rounded-t-xl"/>
        <div className=" mx-auto bg-black rounded-b-2xl py-4 font-sans pl-2 w-9/10 text-white">
          <h2 className="text-2xl my-2">{desTitle}</h2>
          <p className="des">{des}</p>
          <button className="project-btn">In Progress</button>
        </div>
    </div>
  );
};

export default ProjectCard;