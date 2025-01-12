'use client';

// component
import { Input, InputProps } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

// validate
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

interface InputBaseProps extends InputProps {
  typeValue?: string;
  classNameInput: string;
  classNameBox?: string;
  htmlFor?: string;
  label?: string;
  isShowlabel?: boolean;
  messageError: string | undefined;
  onChange: (value: any) => void;
}

export const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  ({ className, value, type, ...props }, ref) => {
    const {
      maxLength,
      typeValue,
      classNameInput,
      classNameBox,
      htmlFor,
      label,
      isShowlabel = false,
      messageError,
      onChange,
      ...rest
    } = props;
    const [isShowPass, setIsShowPass] = useState<boolean>(false);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (maxLength) {
        let sanitizedValue = e.target.value
          .replace(typeValue === 'number' ? /[^0-9]/g : '', '')
          .slice(0, maxLength)
          .trim();
        e.target.value = sanitizedValue;
        onChange(e);
      } else {
        onChange(e);
      }
    };

    return (
      <div className={`${classNameBox}`}>
        {isShowlabel && <Label htmlFor={htmlFor}>{label}</Label>}
        <div className="relative ">
          <Input
            type={isShowPass ? 'text' : type}
            ref={ref}
            id={htmlFor}
            className={`${classNameInput} p-[10px] !bg-red`}
            onChange={(value) => handleInput(value)}
            {...rest}
          />
          {type === 'password' ? (
            <div
              className="w-5 h-5 absolute top-[50%] translate-y-[-50%] right-[10px] "
              onClick={() => setIsShowPass(!isShowPass)}
            >
              {isShowPass ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
          ) : (
            <></>
          )}
        </div>
        {messageError && typeof messageError === 'string' && (
          <p className="error text-[11px] font-normal leading-[initial] text-primary">
            {messageError}
          </p>
        )}
      </div>
    );
  }
);

InputBase.displayName = 'InputBase';
