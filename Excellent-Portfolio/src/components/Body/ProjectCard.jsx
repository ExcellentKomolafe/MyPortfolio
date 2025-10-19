function ProjectCard({imgURL, des, desTitle}) {
  return(
    <div className="project-card">
        <img src={imgURL} alt="project image" className="project-img"/>
        <div className="description">
          <h2 className="des-title">{desTitle}</h2>
          <p className="des">{des}</p>
        </div>
        <button className="project-btn">In Progress</button>
    </div>
  );
};

export default ProjectCard;