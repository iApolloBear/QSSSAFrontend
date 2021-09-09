export const Inbox = ({ image, text }) => {
  return (
    <div className="inbox">
      <figure>
        <img src={image} />
      </figure>
      {text}
    </div>
  );
};
