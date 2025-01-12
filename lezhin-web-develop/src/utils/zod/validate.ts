import { z } from 'zod';
import { regexPassword } from '../validate';
import { COMMON } from '../constants/langs';

export const emailSchema = (errorMessage?: string) => {
  return z
    .string()
    .min(1, { message: COMMON.requireEmail })
    .regex(/^[^']*$/, `${errorMessage ? errorMessage : COMMON.validateEmailSuggest}`)
    .email(`${errorMessage ? errorMessage : COMMON.validateEmailSuggest}`);
};

export const passwordSchema = z
  .string()
  .min(1, COMMON.requirePassword)
  .refine((value) => value.length >= 8, COMMON.validatePasswordNoSuggest)
  .refine((value) => regexPassword.test(value), COMMON.validatePasswordSuggest);

const forbiddenDomains = ['@docomo.ne.jp', '@au.com', '@softbank.ne.jp'];

export const restrictedEmailSchema = emailSchema().refine(
  (email) => !forbiddenDomains.some((domain) => email.endsWith(domain)),
  { message: COMMON.unsupportedEmails }
);
