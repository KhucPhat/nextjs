import React from 'react';

// Component
import CompleteScreen from '@/components/shared/Auth/CompleteScreen';

// Lang
import { COMMON, REGISTER } from '@/utils/constants/langs';

const Content = () => {
  return (
    <>
      <span className="pb-2 block">{REGISTER.memberRegistrationThanks}</span>
      <span>
        {REGISTER.comicsStart}
        <br />
        {REGISTER.enjoyPremiumService}
      </span>
    </>
  );
};

export default function CompleteRegister() {
  return <CompleteScreen title={COMMON.freeMembershipRegistration} content={<Content />} />;
}
