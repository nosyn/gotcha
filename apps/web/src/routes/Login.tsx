import { useEffect, useState } from 'react';
import { useUserStore } from '../store/user';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useUserStore(({ user, setUser }) => [user, setUser]);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (!user) return;

    // Send user back to the page they tried to visit when they were
    // redirected to the login page. Use { replace: true } so we don't create
    // another entry in the history stack for the login page.  This means that
    // when they get to the protected page and click the back button, they
    // won't end up back on the login page, which is also really nice for the
    // user experience.
    navigate(from, { replace: true });
  }, [user]);

  const handleLogin = async () => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const { payload, errors } = await response.json();

    if (errors.length) {
      throw new Error(errors);
    }

    const { user } = payload;

    setUser(user);
  };

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Welcome</h2>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered input-primary w-full max-w-xs"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered input-primary w-full max-w-xs"
            onChange={(e) => setPassword(e.target.value)}
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
