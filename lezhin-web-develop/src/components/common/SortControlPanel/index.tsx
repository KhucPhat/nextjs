'use client';

// Icons
import TransferTwoLineIcon from '@/assets/icons/transfer-2-line.svg';

interface SortControlPanelProps {
  title: string;
  loading: boolean;
  titleSort: string;
  onSort: () => void;
}

export default function SortControlPanel({
  title,
  onSort,
  loading,
  titleSort,
}: SortControlPanelProps) {
  return (
    <div className="bg-[#3D3D3D] flex items-center justify-between px-4 py-3  border-y">
      <span className="text-white ml-1 text-[13px] font-bold">{title}</span>

      <div
        className="text-white flex items-center justify-center hover:underline hover:decoration-1"
        onClick={onSort}
        style={{
          pointerEvents: loading ? 'none' : 'auto',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        <TransferTwoLineIcon width="14px" height="14px" />
        <span className="text-[11px] font-bold">{titleSort}</span>
      </div>
    </div>
  );
}
