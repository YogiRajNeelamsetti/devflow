"use client"

import { useState } from "react";
import { Button } from "../ui/button"
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { formURLQuery, removeKeysFromQuery } from "@/lib/url";

const filters = [
    { name: "React", value: "react" },
    { name: "Nextjs", value: "nextjs" },
    { name: "Javascript", value: "javascript" },
    // {
    //     name: "all",
    //     value: "all",
    // },
    // {
    //     name: "newest",
    //     value: "newest",
    // },
    // {
    //     name: "oldest",
    //     value: "oldest",
    // },
    // {
    //     name: "popular",
    //     value: "popular",
    // },
    // {
    //     name: "unanswered",
    //     value: "unanswered",
    // },
    // {
    //     name: "recommended",
    //     value: "recommended", 
    // },
]

const HomeFilter = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const filter = searchParams.get('filter');
    const [active, setActive] = useState(filter || '');
    const handleFilter = (filter: string) => {

        let newUrl = '';
        if(filter === active) {
            setActive("");
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['filter'],
            })
            
        } else {
            setActive(filter);
            newUrl = formURLQuery({ 
                params: searchParams.toString(), 
                key: 'filter', 
                value: filter.toLowerCase()
            });
        }

        router.push(newUrl, { scroll: false });
        
    }
  return (
    <div className="mt-10 hidden flex-wrap items-center gap-2 sm:flex">
        {filters.map((filter) => (
            <Button 
            key={filter.value} 
            variant="outline" 
            className={cn(`body-medium rounded-lg px-6 py-3 capitalize shadow-none`, active === filter.value ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400" : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300")}
            onClick={() => handleFilter(filter.value)}
            >
                {filter.name}
            </Button>
        ))}
    </div>
  )
}

export default HomeFilter