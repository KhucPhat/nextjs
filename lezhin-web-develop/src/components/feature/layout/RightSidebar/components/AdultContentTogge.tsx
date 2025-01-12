'use client';
// recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { safeModeAtom } from '@/stores/safeMode';

// Components
import { Switch } from '@/components/ui/switch';

export default function AdultContentTogge() {
  const { isSafeMode } = useRecoilValue(safeModeAtom);
  const setSafeMode = useSetRecoilState(safeModeAtom);

  const handleSwitchChange = () => {
    setSafeMode(() => ({ isSafeMode: !isSafeMode }));
  };

  return (
    <div className="relative ">
      <Switch checked={isSafeMode} onCheckedChange={handleSwitchChange}></Switch>
      <span
        className={`text-[11px] pointer-events-none absolute transition-all leading-[24px] h-[24px] w-fit top-0 px-[2px] ${
          isSafeMode ? 'left-0 text-white' : 'right-0'
        }`}
      >
        18+
      </span>
    </div>
  );
}
