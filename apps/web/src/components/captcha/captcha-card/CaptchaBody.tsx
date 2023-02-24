import { useState } from 'react';
import useUpdateCaptchaMutation from '../../../graphql/hooks/useUpdateCaptchaMutation';
import { Captcha } from '../../../types';

interface CaptchaBodyProps {
  captcha: Captcha;
}

const CaptchaBody = ({ captcha }: CaptchaBodyProps) => {
  const [text, setText] = useState('');
  const [updateCaptcha, { data, loading, error }] = useUpdateCaptchaMutation();

  const handleOnClick = () => {
    console.log('text: ', text);
  };

  return (
    <div className="card-body">
      <h2 className="card-title mx-auto">Captcha</h2>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Enter captcha</span>
        </label>
        <input
          id="captcha-text"
          type="text"
          placeholder="Type here"
          maxLength={6}
          value={text}
          onChange={(event) => {
            console.log('event:', event.target.value);
            setText(event.target.value);
          }}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-secondary" onClick={handleOnClick}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaptchaBody;
