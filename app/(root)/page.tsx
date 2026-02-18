import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";
import Link from "next/link";

const questions = [
  {
    _id: '1',
    title: 'How to create a new react project?',
    description: 'I want to create a new project using React and Next.js',
    tags: [
      {
        _id: '1',
        name: 'React',
      },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      image: 'https://avatars.githubusercontent.com/u/10127349?v=4',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: '2',
    title: 'How to create a new next.js project?',
    description: 'I want to create a new project using React and Next.js',
    tags: [
      {
        _id: '1',
        name: 'Nextjs',
      },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      image: 'https://avatars.githubusercontent.com/u/10127349?v=4',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: '3',
    title: 'How to create a new javascript project?',
    description: 'I want to create a new project using javascript',
    tags: [
      {
        _id: '1',
        name: 'javascript',
      },
      {
        _id: '2',
        name: 'javascript',
      },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      image: 'https://avatars.githubusercontent.com/u/10127349?v=4',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
]

interface SearchParams { 
  searchParams: Promise<{ [key: string]: string | undefined }>
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query, filter } = await searchParams;

  const normalizedQuery = query?.toLowerCase() || '';
  const normalizedFilter = filter?.toLowerCase() || '';

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title.toLowerCase().includes(normalizedQuery);

    const matchesFilter =
      !normalizedFilter ||
      question.tags.some((tag) =>
        tag.name.toLowerCase().includes(normalizedFilter)
      );

    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Hi from App
          
        </h1>
        <Button className="primary-gradient min-h-11.5 px-4 py-3 text-light-900!" asChild>
          <Link
            href={ROUTES.ASK_QUESTION}>
              Ask a question
          </Link>
        </Button>
      </section>

      <section className="mt-11">
        <LocalSearch 
          route='/'
          imgSrc='/icons/search.svg'
          placeholder='Search for questions, topics, or keywords'
          otherClasses='flex-1'

          />
      </section>

      <section className="mt-10">
        <HomeFilter />
      </section>

      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}

      </div>
    </>
  );
}

export default Home;
