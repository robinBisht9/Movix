import "./style.scss";
import { useSelector } from "react-redux";

const Genre = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres">
      {data?.map((id) => {
        if (!genres[id]?.name) return;
        return (
          <div key={id} className="genre">
            {genres[id]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genre;
