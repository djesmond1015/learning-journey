import { redirect } from 'next/navigation';
import { InfoIcon } from 'lucide-react';

import { getAuthSession } from '@/lib/auth';
import { CreateCourseForm } from '@/components/CreateCourseForm';

const CreatePage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/gallery');
  }
  return (
    <div className='flex flex-col items-start max-w-xl px-8 mx-auto my-16 mt-10 sm:px-0'>
      <h1 className='self-center text-4xl font-bold text-center sm:text-6xl'>
        Learning Journey
      </h1>
      <div className='flex items-center p-4 mt-5 last:border-none bg-secondary'>
        <InfoIcon className='w-16 h-16 mr-3 text-blue-400' />
        <div className='leading-[1.40] '>
          Enter in a course title, or what you want to learn about. Then enter a
          list of units, which are the specifics you want to learn. And our AI
          will generate a course for you!
        </div>
      </div>
      <CreateCourseForm />
    </div>
  );
};

export default CreatePage;
