'use client';

// Components
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';

// Hooks
import useTabCategory from './useTabCategory';

// Types
import { CategoryData } from '@/types/CategoryType';

// Styles
import './styles.css';

interface TabCategoryProps {
  categories: CategoryData[];
  defaultValue: string;
}

export default function TabCategory({ categories, defaultValue }: TabCategoryProps) {
  const { loading, changeCategoryParam } = useTabCategory(defaultValue);

  return (
    <>
      <div className="relative h-[32px] w-full">
        <div className="container-tab">
          <Tabs
            defaultValue={defaultValue}
            className="tabs-root"
            onValueChange={(value) => {
              changeCategoryParam(value);
            }}
          >
            <TabsList className="tabs-list">
              {categories?.map((item) => (
                <TabsTrigger
                  className="tab-trigger font-bold"
                  value={item.hash_id}
                  key={item.hash_id}
                >
                  {item.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {loading && (
        <div className="relative">
          <div className="fixed top-0 left-0 bg-black/50 z-10 w-full h-full flex items-center justify-center">
            <Spinner size="large" className="text-white" />
          </div>
        </div>
      )}
    </>
  );
}
