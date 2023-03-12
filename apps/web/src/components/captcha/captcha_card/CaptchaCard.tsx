import { Card, Image } from '@mantine/core';
import { Captcha } from '../../../types';
import CaptchaBody from './CaptchaBody';

interface CaptchaCardProps {
  captcha: Captcha;
}

const CaptchaCard = ({ captcha }: CaptchaCardProps) => {
  const imageSrc = `http://localhost:8080/api/storage/image/${captcha.name}`;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section component="a" href={imageSrc} target="_blank" p={8}>
        <Image src={imageSrc} alt="captcha" />
      </Card.Section>
      <CaptchaBody captcha={captcha} />
    </Card>
  );
};

export default CaptchaCard;
