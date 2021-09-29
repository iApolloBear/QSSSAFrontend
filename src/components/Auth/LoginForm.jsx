export const LoginForm = () => {
  return (
    <form>
      <input className="form-control" placeholder="E-mail Address" />
      <input type="password" className="form-control" placeholder="Password" />

      <div className="form-button">
        <button type="submit" className="btn btn-primary btn-sm">
          Login
        </button>
      </div>
    </form>
  );
};
