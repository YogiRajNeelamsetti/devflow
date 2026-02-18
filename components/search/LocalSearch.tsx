'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../ui/input'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { formURLQuery, removeKeysFromQuery } from '@/lib/url';

interface LocalSearchProps {
    route: string;
    imgSrc: string;
    placeholder: string;
    otherClasses?: string;
}

const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: LocalSearchProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('query') || '';

    const [searchQuery, setSearchQuery] = useState(search);

    useEffect(() => {
        const delayInputTimeout = setTimeout(() => {
            // Avoid pushing if the URL already reflects the current search query
            if (searchQuery === search) return;

            if (searchQuery) {
                const newUrl = formURLQuery({ 
                    params: searchParams.toString(), 
                    key: 'query', 
                    value: searchQuery 
                });
                router.push(newUrl, { scroll: false });
            } else {
                if(pathname === route) {
                    const newUrl = removeKeysFromQuery({
                        params: searchParams.toString(),
                        keysToRemove: ['query'],
                    })

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500);

        return () => clearTimeout(delayInputTimeout);
        
    }, [searchQuery, search, router, route, searchParams, pathname]);

  return (
    <div className={cn('background-light800_darkgradient flex min-h-14 grow items-center gap-4 rounded-[10px] px-4', otherClasses)}>
        <Image 
            src={imgSrc} 
            alt='Search'
            width={24}
            height={24}
            className='cursor-pointer'
        />
        <Input 
            type='text'
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none'
        />
    </div>
  )
}

export default LocalSearch