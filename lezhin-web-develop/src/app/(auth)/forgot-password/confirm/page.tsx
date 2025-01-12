// Component
import CompleteScreen from '@/components/shared/Auth/CompleteScreen';

// Lang
import { FORGOT_PASSWORD } from '@/utils/constants/langs';

const Content = () => {
  return (
    <>
      <span>
        {FORGOT_PASSWORD.passwordResetEmailSent}
        <br />
        {FORGOT_PASSWORD.checkYourEmail}
      </span>
    </>
  );
};

const CompleteSendToEmail = () => {
  return <CompleteScreen title={FORGOT_PASSWORD.title} content={<Content />} />;
};

export default CompleteSendToEmail;
