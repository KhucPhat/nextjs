import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface TextareaBaseProps {
  placeholder: string;
  handleValue: (value: string) => void;
  classNameInput: string;
  classNameBox?: string;
  htmlFor: string;
  label: string;
  isShowlabel?: boolean;
}

export const InputBase = (props: TextareaBaseProps) => {
  const {
    placeholder,
    handleValue,
    classNameInput,
    classNameBox,
    htmlFor,
    label,
    isShowlabel = true,
  } = props;

  return (
    <div className={`${classNameBox}`}>
      <Label className={`${!isShowlabel && 'hidden'}`} htmlFor={htmlFor}>
        {label}
      </Label>
      <Textarea
        id={htmlFor}
        className={classNameInput}
        onChange={(e) => handleValue(e.target.value)}
      />
    </div>
  );
};
