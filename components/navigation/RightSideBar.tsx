import ROUTES from '@/constants/route'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import TagCard from '../cards/TagCard'

const hotQuestions = [
    {
        _id: "1",
        title: "How to implement authentication in a React application?",
    },
    {
        _id: "2",
        title: "What are the best practices for state management in React?",
    },
    {
        _id: "3",
        title: "How to optimize performance in a React application?", 
    },
    {
        _id: "4",
        title: "What is the difference between React Context and Redux?",
    },
    {
        _id: "5",
        title: "How to handle side effects in React using useEffect?",
    },

]

const popularTags = [
    { _id: "1", name: "JavaScript", questions: 1200 },
    { _id: "2", name: "React", questions: 900 },
    { _id: "3", name: "CSS", questions: 800 },
    { _id: "4", name: "Node.js", questions: 700 },
    { _id: "5", name: "Python", questions: 600 },
]

const RightSideBar = () => {
  return (
    <section className='pt-28 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden'>
        <div>
            <h3 className='h3-bold text-dark200_light900'>
                Top Questions
            </h3>
            <div className='mt-7 flex w-full flex-col gap-[30px]'>
                {hotQuestions.map(({_id, title}) => (
                    <Link 
                    key={_id} 
                    href={ROUTES.QUESTION(_id)}
                    className='flex cursor-pointer items-center justify-between gap-7'>
                        <p className='body-medium text-dark500_light700'>{title}</p>

                        <Image
                        src='/icons/chevron-right.svg'
                        alt="Chevron"
                        width={20}
                        height={20}
                        className='invert-colors'
                        />
                    </Link>
                ))}
            </div>
        </div>
        <div className='mt-16'>
            <h3 className='h3-bold text-dark200_light900'>
                Popular Tags
            </h3>
            <div className='mt-7 flex flex-col gap-4'>
                {popularTags.map(({_id, name, questions}) => (
                    <TagCard key={_id} _id={_id} name={name} questions={questions} showCount compact />
                ))}
            </div>
        </div>
    </section>
  )
}

export default RightSideBar