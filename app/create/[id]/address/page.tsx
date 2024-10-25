'use client';

import React, { useMemo, useState } from 'react';
import { useCountries } from '@/hooks/getCountries';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import SubmitButtonBar from '@/components/submit-button-bar';
import { createLocation } from '@/lib/action';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import Flag from 'react-world-flags';

const Page = ({ params }: { params: { id: string } }) => {
  const { getAllCountries } = useCountries();
  const [locationValue, setLocationValue] = useState('');
  const [open, setOpen] = useState(false);

  const LazyMap = dynamic(() => import('@/components/map'), {
    ssr: false,
    loading: () => <Skeleton className='h-[50vh] w-full' />,
  });

  const countries = useMemo(() => getAllCountries(), [getAllCountries]);

  return (
    <>
      <div className='mx-auto w-3/5'>
        <h2 className='mb-10 text-3xl font-semibold tracking-tight transition-colors'>
          Where is your Home located?
        </h2>
      </div>

      <form action={createLocation}>
        <input type='hidden' name='homeId' value={params.id} />
        <input type='hidden' name='countryValue' value={locationValue} />

        <div className='mx-auto mb-36 w-3/5'>
          <div className='mb-5'>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='w-full justify-between'
                >
                  {locationValue ? (
                    <div className='flex items-center gap-1'>
                      <Flag
                        code={
                          countries.find(
                            (country) => country.label === locationValue
                          )?.value
                        }
                        className='max-w-6'
                      />
                      {
                        countries.find(
                          (country) => country.label === locationValue
                        )?.label
                      }
                    </div>
                  ) : (
                    'Select country'
                  )}

                  <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>

              <PopoverContent align='start'>
                <Command className='w-full'>
                  <CommandInput placeholder='Search a country' />
                  <CommandList className='no-scrollbar'>
                    <CommandEmpty>No country found</CommandEmpty>
                    <CommandGroup>
                      {countries.map((item) => (
                        <CommandItem
                          className=''
                          key={item.value}
                          value={item.label}
                          onSelect={(currentValue) => {
                            setLocationValue(
                              currentValue === locationValue ? '' : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              locationValue === item.label
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          <Flag code={item.value} className='mr-1 h-4 w-5' />
                          {item.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <LazyMap locationValue={locationValue} />
        </div>

        <SubmitButtonBar />
      </form>
    </>
  );
};

export default Page;
