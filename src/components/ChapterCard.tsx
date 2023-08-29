'use client';

import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import { Chapter } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

type ChapterCardProps = {
  chapter: Chapter;
  chapterIndex: number;
  completedChapters: Set<String>;
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
};

export type ChapterCardHandler = {
  triggerLoad: () => void;
};

export const ChapterCard = React.forwardRef<
  ChapterCardHandler,
  ChapterCardProps
>(({ chapter, chapterIndex }, ref) => {
  const { toast } = useToast();
  const [success, setSuccess] = useState<boolean | null>(null);
  const { mutate: getChapterInfo, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/chapter/getInfo');
      return response.data;
    },
  });

  React.useImperativeHandle(ref, () => ({
    async triggerLoad() {
      console.log('trigger load');
    },
  }));

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
});

ChapterCard.displayName = 'ChapterCard';
