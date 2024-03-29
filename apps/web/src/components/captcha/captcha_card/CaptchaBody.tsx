import { useMutation } from '@apollo/client';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { UpdateCaptcha } from '../../../graphql/documents/mutations';
import { Captcha } from '../../../types';
import { FloatingLabelInput } from '../../input/FloatingLabelInput';
import { Button, Stack } from '@mantine/core';

type CaptchaBodyProps = {
  captcha: Captcha;
};

const CaptchaBody = ({ captcha }: CaptchaBodyProps) => {
  const [text, setText] = useState<string>('');
  const { captchaId } = captcha;

  const [updateCaptcha, { loading }] = useMutation(UpdateCaptcha, {
    onError: (error) => {
      notifications.show({ message: error.message, color: 'red' });
    },
  });

  const handleOnClick = () => {
    updateCaptcha({
      variables: {
        input: {
          captchaId,
          text,
        },
      },
    });
  };

  return (
    <Stack my={6}>
      <FloatingLabelInput
        id="captcha-text"
        placeholder="Enter captcha here"
        label="Captcha Input"
        setValue={setText}
        value={text}
        maxLength={6}
      />

      <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={handleOnClick} disabled={loading}>
        Resolve Captcha
      </Button>
    </Stack>
  );
};

export default CaptchaBody;
