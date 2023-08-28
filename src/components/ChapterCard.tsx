'use client';

import { useState } from 'react';

import { Chapter } from '@prisma/client';
import { cn } from '@/lib/utils';

type ChapterCardProps = {
  chapter: Chapter;
  chapterIndex: number;
};

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  chapterIndex,
}) => {
  const [success, setSuccess] = useState<boolean | null>(null);

  return (
    <div
      key={chapter.id}
      className={cn('px-4 py-2 mt-2 rounded flex justify-between', {
        'bg-secondary': success === null,
        'bg-red-500': success === false,
        'bg-green-500': success === true,
      })}
    >
      <h5>{chapter.name}</h5>
    </div>
  );
};
