import { useEffect, useState } from 'react';

// Hooks
import { useRouter } from '@/hooks/useRouter';

const useTabCategory = (defaultValue: string) => {
  const router = useRouter();
  const [lastRoute, setLastRoute] = useState('');
  const [loading, setLoading] = useState(false);

  const changeCategoryParam = (hashId: string) => {
    const currentUrl = new URL(window.location.href);

    currentUrl.searchParams.set('category', hashId);
    setLastRoute(hashId);
    setLoading(true);

    router.push(currentUrl.toString());
  };

  useEffect(() => {
    if (defaultValue === lastRoute) {
      setLoading(false);
    }
  }, [defaultValue]);

  return { changeCategoryParam, loading };
};

export default useTabCategory;
