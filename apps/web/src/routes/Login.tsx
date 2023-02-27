export default function Login() {
  const handleLogin = () => {};

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Welcome</h2>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
