import { Captcha } from '../../../types';
import CaptchaBody from './CaptchaBody';

interface CaptchaCardProps {
  captcha: Captcha;
}

const CaptchaCard = ({ captcha }: CaptchaCardProps) => {
  return (
    <div className="card glass">
      <div className="my-auto">
        <figure className="mt-8">
          <img
            src={`http://localhost:8080/image/${captcha.name}`}
            alt="captcha"
          />
        </figure>
        <CaptchaBody captcha={captcha} />
      </div>
    </div>
  );
};

export default CaptchaCard;
