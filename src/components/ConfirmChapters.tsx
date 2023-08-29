'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Chapter, Course, Unit } from '@prisma/client';
import { ChapterCard, ChapterCardHandler } from '@/components/ChapterCard';
import { Separator } from '@/components/ui/separator';
import { Button, buttonVariants } from '@/components/ui/button';

type ConfirmChaptersProps = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

export const ConfirmChapters: React.FC<ConfirmChaptersProps> = ({ course }) => {
  const chapterRefs: Record<string, React.RefObject<ChapterCardHandler>> = {};
  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      chapterRefs[chapter.id] = React.useRef(null);
    });
  });
  console.log(chapterRefs);

  return (
    <div className='w-full mt-4'>
      {course.units.map((unit, unitIndex) => {
        return (
          <div
            className='mt-5'
            key={unitIndex}
          >
            <h2 className='text-sm uppercase text-secondary-foreground/60'>
              Unit {unitIndex + 1}
            </h2>
            <h3 className='text-2xl font-bold'>{unit.name}</h3>
            <div className='mt-3'>
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <ChapterCard
                    key={chapter.id}
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                    ref={chapterRefs[chapter.id]}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div className='flex items-center justify-center mt-4'>
        <Separator className='flex-[1]' />
        <div className='flex items-center mx-4'>
          <Link
            href='/create'
            className={buttonVariants({
              variant: 'secondary',
            })}
          >
            <ChevronLeft
              className='w-4 h-4 mr-2'
              strokeWidth={4}
            />
            Back
          </Link>
          <Button
            type='button'
            className='ml-4 font-semibold'
            onClick={() => {}}
          >
            Generate
            <ChevronRight
              className='w-4 h-4 ml-2'
              strokeWidth={4}
            />
          </Button>
        </div>
        <Separator className='flex-[1]' />
      </div>
    </div>
  );
};
