// Component
import CompleteScreen from '@/components/shared/Auth/CompleteScreen';

// Lang
import { FORGOT_PASSWORD } from '@/utils/constants/langs';

const Content = () => {
  return (
    <>
      <span>{FORGOT_PASSWORD.resetCompleteContent}</span>
    </>
  );
};

const CompleteSendToEmail = () => {
  return <CompleteScreen title={FORGOT_PASSWORD.resetTitle} content={<Content />} />;
};

export default CompleteSendToEmail;
