'use client';
// assets
import { signIn } from 'next-auth/react';
import Line from '@/assets/icons/register/line.svg';
import Google from '@/assets/icons/register/google.svg';
import Yahoo from '@/assets/icons/register/yahoo.svg';
import Facebook from '@/assets/icons/register/facebook.svg';
import Apple from '@/assets/icons/register/apple.svg';
import Twitter from '@/assets/icons/register/x.svg';

// Utils
import { routeToCartOrDefault } from '@/utils/helpers';

const SNSList = [
  {
    component: <Line />,
    name: 'line',
  },
  {
    component: <Google />,
    name: 'google',
  },
  {
    component: <Yahoo />,
    name: 'yahoo',
  },
  {
    component: <Facebook />,
    name: 'facebook',
  },
  {
    component: <Apple />,
    name: 'apple',
  },
  {
    component: <Twitter />,
    name: 'twitter',
  },
];

export function SNS() {
  return (
    <>
      <div className="flex items-center justify-center mb-8 bg-blue w-full">
        <div className="flex flex-wrap mb-[10px] w-[160px] h-[90px] ml-auto mr-auto bg-blue">
          {SNSList.slice(0, 6).map((item, index) => (
            <div
              onClick={async () => {
                await signIn(`${item.name}`, {
                  callbackUrl: routeToCartOrDefault(),
                });
              }}
              key={index}
              className={`${index !== 2 && index !== 5 && 'mr-5'}  ${
                index < 3 && 'mb-[10px]'
              } flex items-center w-10 h-10 cursor-pointer`}
            >
              {item.component}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
