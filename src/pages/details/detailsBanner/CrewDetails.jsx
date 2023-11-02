const CrewDetails = ({ crews, name }) => {
  return (
    <div>
      {crews?.length > 0 && (
        <div className="info">
          <span className="text bold">{name}: </span>
          <span className="text">
            {crews?.map((crew, index) => (
              <span key={index}>
                {crew.name} {crews?.length - 1 !== index && ","}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
};

export default CrewDetails;
