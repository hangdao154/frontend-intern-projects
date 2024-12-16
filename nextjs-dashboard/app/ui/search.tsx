'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const useDebounce = <T extends (...params: any[]) => any>(callback: T, wait: number, immed: boolean = false) => {
    const debouncedFunction = useCallback(() => {
      let timer: NodeJS.Timeout | undefined = undefined;
      return function (this: any, ...args: Parameters<T>) {
        if (timer === undefined && immed) callback.apply(this, args);
        clearTimeout(timer);
        timer = setTimeout(() => callback.apply(this, args), wait);
        return timer;
      };
    }, [callback, wait, immed]);

    return debouncedFunction();
  };

  const handleSearch = useDebounce((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) params.set('query', term)
    else params.delete('query')
    replace(`${pathname}?${params.toString()}`) // Add/replace querry params to current URL
  }, 300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

