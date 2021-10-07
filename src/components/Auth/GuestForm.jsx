export const GuestForm = () => {
  return (
    <form>
      <input className="form-control" placeholder="Name" />

      <div className="form-button">
        <button type="submit" className="btn btn-primary btn-sm">
          Join
        </button>
      </div>
    </form>
  );
};
