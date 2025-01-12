import { Button, ButtonProps } from '@/components/ui/button';

interface ButtonBaseProps extends ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
  fullBg?: boolean;
  noAction?: boolean;
}

export const ButtonBase = ({
  disable,
  fullBg,
  onClick,
  className,
  label,
  ...rest
}: ButtonBaseProps) => {
  const handleButtonClick = (e: { currentTarget: any; clientX: number; clientY: number }) => {
    if (!disable) {
      const button = e.currentTarget;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;

      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }

    if (onClick && !disable) {
      onClick();
    }
  };

  return (
    <div>
      {fullBg ? (
        <Button
          onClick={handleButtonClick}
          disabled={disable}
          className={`button-transition font-bold text-[15px] leading-[18px] overflow-hidden relative w-[calc(100%_-_88px)] flex ml-auto mr-auto p-[10px] rounded-[40px] h-12 ${
            disable ? '!cursor-not-allowed !bg-[#D1D1D1] text-light-gray-btn' : '!bg-primary'
          } ${className}`}
          {...rest}
        >
          {label}
        </Button>
      ) : (
        <Button
          onClick={handleButtonClick}
          className={`button-transition font-bold text-[15px] leading-[18px] overflow-hidden relative w-[calc(100%_-_88px)] !bg-white border-[1px] text-primary flex ml-auto mr-auto p-[10px] rounded-[40px] h-12 mb-4 border-primary text-[15px] leading-[18px] ${className}`}
          {...rest}
        >
          {label}
        </Button>
      )}
    </div>
  );
};
