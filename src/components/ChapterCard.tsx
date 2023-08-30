'use client';

import React, { useCallback, useEffect, useImperativeHandle } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

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
>(({ chapter, chapterIndex, completedChapters, setCompletedChapters }, ref) => {
  const { toast } = useToast();

  const [success, setSuccess] = useState<boolean | null>(null);
  const { mutate: getChapterInfo, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/chapter/getInfo', {
        chapterId: chapter.id,
      });
      return response.data;
    },
  });

  const addChapterIdToSet = useCallback(() => {
    setCompletedChapters((prev) => {
      const newSet = new Set(prev);
      newSet.add(chapter.id);
      return newSet;
    });
  }, [chapter.id, setCompletedChapters]);

  useEffect(() => {
    if (chapter.videoId) {
      setSuccess(true);
      addChapterIdToSet();
    }
  }, [chapter, addChapterIdToSet]);

  useImperativeHandle(ref, () => ({
    async triggerLoad() {
      if (chapter.videoId) {
        addChapterIdToSet();
        return;
      }

      getChapterInfo(undefined, {
        onSuccess: () => {
          setSuccess(true);
          addChapterIdToSet();
        },
        onError: (error) => {
          console.error(error);
          setSuccess(false);
          toast({
            title: 'Error',
            description: 'There was an error loading your chapter.',
            variant: 'destructive',
          });
          addChapterIdToSet();
        },
      });
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
      {isLoading && <Loader2 className='animate-spin' />}
    </div>
  );
});

ChapterCard.displayName = 'ChapterCard';
