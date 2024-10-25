'use client';

import React, { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Check, Search } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Flag from 'react-world-flags';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { useCountries } from '@/hooks/getCountries';
import HomeMap from '@/components/home-map';
import { Card, CardHeader } from '@/components/ui/card';
import Counter from '@/components/counter';
import SubmitButton from '@/components/submit-button';

const SearchComponent = () => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [locationValue, setLocationValue] = useState('');

  const { getAllCountries } = useCountries();
  const countries = useMemo(() => getAllCountries(), [getAllCountries]);

  function SubmitButtonLocal() {
    if (step === 1) {
      return <Button onClick={() => setStep(step + 1)}>Next</Button>;
    } else if (step === 2) {
      return <SubmitButton />;
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex cursor-pointer items-center rounded-full border px-5 py-2'>
          <div className='flex h-full divide-x font-medium'>
            <p className='px-4'>Anywhere</p>
            <p className='px-4'>Any Week</p>
            <p className='px-4'>Any Guest</p>
          </div>

          <Search className='h-8 w-8 rounded-full bg-primary p-1 text-white' />
        </div>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <form className='flex flex-col gap-4'>
          <input type='hidden' name='country' value={locationValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Country</DialogTitle>
                <DialogDescription>
                  Please choose a country, so that what you want
                </DialogDescription>
              </DialogHeader>

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
                                currentValue === locationValue
                                  ? ''
                                  : currentValue
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

              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all the info you need</DialogTitle>
                <DialogDescription>
                  Please choose a country, so that what you want
                </DialogDescription>
              </DialogHeader>

              <Card>
                <CardHeader className='flex flex-col gap-y-5'>
                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                      <h3 className='font-medium underline'>Guests</h3>
                      <p className='text-sm text-muted-foreground'>
                        How many guests do you want?
                      </p>
                    </div>

                    <Counter name='guest' />
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                      <h3 className='font-medium underline'>Rooms</h3>
                      <p className='text-sm text-muted-foreground'>
                        How many rooms do you have?
                      </p>
                    </div>

                    <Counter name='room' />
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                      <h3 className='font-medium underline'>Bathrooms</h3>
                      <p className='text-sm text-muted-foreground'>
                        How many bathrooms do you have?
                      </p>
                    </div>

                    <Counter name='bathroom' />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchComponent;
