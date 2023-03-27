import { Card, Image, Space, Text } from '@mantine/core';
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
      {captcha.status === 'RESOLVED' ? (
        <div style={{ display: 'flex' }}>
          <Text size="lg">Captcha was resolved with text:</Text>
          <Space w="sm" />
          <Text size="lg" color="green">
            {captcha.text}
          </Text>
        </div>
      ) : (
        <CaptchaBody captcha={captcha} />
      )}
    </Card>
  );
};

export default CaptchaCard;
