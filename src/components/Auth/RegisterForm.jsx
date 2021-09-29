export const RegisterForm = () => {
  return (
    <form>
      <input className="form-control" placeholder="Full Name" />
      <input className="form-control" placeholder="E-mail Address" />
      <input type="password" className="form-control" placeholder="Password" />

      <div className="form-button">
        <button type="submit" className="btn btn-primary btn-sm">
          Register
        </button>
      </div>
    </form>
  );
};
