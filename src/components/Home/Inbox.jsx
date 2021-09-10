import { Link } from "react-router-dom";

export const Inbox = ({ image, text, route }) => {
  return (
    <Link to={route}>
      <div className="inbox">
        <figure>
          <img src={image} alt={`inbox-${text}`} />
        </figure>
        {text}
      </div>
    </Link>
  );
};
