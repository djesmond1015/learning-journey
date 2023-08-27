'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash } from 'lucide-react';

import { createChaptersSchema } from '@/validators/course';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

type Input = z.infer<typeof createChaptersSchema>;

export const CreateCourseForm = () => {
  const form = useForm<Input>({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      title: '',
      units: ['', '', ''],
    },
  });

  const onSubmit = (data: Input) => {
    console.log(data);
  };

  form.watch();

  return (
    <div className='w-full mt-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => {
              return (
                <FormItem className='flex flex-col items-start w-full sm:items-center sm:flex-row'>
                  <FormLabel className='flex-[1] text-xl'>Title</FormLabel>
                  <FormControl className='flex-[6]'>
                    <Input
                      placeholder='Enter the main topic of the course'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <AnimatePresence>
            {form.watch('units').map((_, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    height: { duration: 0.2 },
                  }}
                >
                  <FormField
                    key={index}
                    control={form.control}
                    name={`units.${index}`}
                    render={({ field }) => {
                      return (
                        <FormItem className='flex flex-col items-start w-full mt-2 sm:items-center sm:flex-row'>
                          <FormLabel className='flex-[1] text-xl'>
                            Unit {index + 1}
                          </FormLabel>
                          <FormControl className='flex-[6]'>
                            <Input
                              placeholder='Enter subtopic of the course'
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div className='flex items-center justify-center mt-4'>
            <Separator className='flex-[1]' />
            <div className='flex gap-2 mx-4'>
              <Button
                type='button'
                variant='secondary'
                className='text-semibold'
                onClick={() => {
                  form.setValue('units', [...form.watch('units'), '']);
                }}
              >
                Add Unit
                <Plus className='w-4 h-4 ml-2 text-green-500' />
              </Button>
              <Button
                type='button'
                variant='secondary'
                className='ml-2 text-semibold'
                onClick={() => {
                  form.setValue('units', form.watch('units').slice(0, -1));
                }}
              >
                Remove Unit
                <Trash className='w-4 h-4 ml-2 text-red-500' />
              </Button>
            </div>
            <Separator className='flex-[1]' />
          </div>
          <Button
            type='submit'
            className='w-full mt-6'
            size='lg'
          >
            Lets Go!
          </Button>
        </form>
      </Form>
    </div>
  );
};
