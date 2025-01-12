'use client';

// Components
import { Tabs as TabsRoot, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Styles
import './styles.css';

interface TabsProps {
  items: any[];
  itemLabel?: string;
  itemValue?: string;
  defaultValue: string;
  onChange: (value: any) => void;
}

export default function Tabs({
  items,
  defaultValue,
  itemLabel = 'label',
  itemValue = 'value',
  onChange,
}: TabsProps) {
  return (
    <div className="container-tab-common">
      <TabsRoot
        defaultValue={defaultValue}
        className="tabs-root-common"
        onValueChange={(value) => {
          onChange(value);
        }}
      >
        <TabsList className="tabs-list-common">
          {items?.map((item) => (
            <TabsTrigger
              className="tab-trigger-common font-bold"
              value={item[itemValue]}
              key={item[itemValue]}
            >
              {item[itemLabel]}
            </TabsTrigger>
          ))}
        </TabsList>
      </TabsRoot>
    </div>
  );
}
