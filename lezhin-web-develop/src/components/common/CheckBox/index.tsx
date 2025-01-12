import React from 'react';

// component
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CheckBoxBaseProps {
  value?: boolean;
  name: string;
  classNameCheckBox: string;
  classNameBox?: string;
  htmlFor?: string;
  label?: React.ReactNode;
  isShowlabel?: boolean;
  classNameContent?: string;
  content?: React.ReactNode;
  onChange: (value: boolean) => void;
  isFileInput?: boolean;
}

export const CheckBoxBase = React.forwardRef<HTMLInputElement, CheckBoxBaseProps>(
  ({ isFileInput = false, ...props }, ref) => {
    const {
      value,
      name,
      classNameCheckBox,
      classNameBox,
      htmlFor,
      label,
      isShowlabel = true,
      classNameContent,
      content,
      onChange,
      ...rest
    } = props;

    return (
      <div className={`${classNameBox}`}>
        <Checkbox
          id={htmlFor}
          checked={value}
          onCheckedChange={onChange}
          className={classNameCheckBox}
          {...rest}
        />
        <div className={classNameContent}>
          <Label className={`${!isShowlabel && 'hidden'}`} htmlFor={htmlFor}>
            {label}
          </Label>
          {content}
        </div>
      </div>
    );
  }
);

CheckBoxBase.displayName = 'CheckBoxBase';
