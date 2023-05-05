'use client';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ChevronRightIcon } from '@ui/icons';

export default function ScrollToSet({ options }: { options: string[] }) {
  const [to, setTo] = useState(options[0]);

  const scrollTo = (value: string) => {
    const el = document.getElementById(value);
    if (!el) return;
    setTo(value);
    el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Listbox value={options[0]} onChange={scrollTo}>
      <div className="relative gap-2 self-end flex w-48 flex-col">
        <div className="sticky top-2 right-2 flex flex-col">
          <Listbox.Label className="bg-white/25 uppercase font-passion w-max max-w-screen self-end px-2 rounded-tl-md rounded-tr-md">
            Jump to Series
          </Listbox.Label>
          <Listbox.Button className="bg-black/25 flex justify-between items-center gap-2 border-2 border-solid border-white/25 backdrop-blur-sm rounded-tl-md rounded-bl-md rounded-br-md p-2">
            {to}
            <ChevronRightIcon className="rotate-90 transition-transform ui-open:-rotate-90" />
          </Listbox.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute w-full mt-2 top-full bg-black/25 select-none border-solid border-white/25 border-2 backdrop-blur-md rounded-md">
            {options.map((option) => (
              <Listbox.Option key={option} value={option}>
                {({ active }) => (
                  <li
                    className={`${
                      active
                        ? 'px-2 bg-blue-500 text-white cursor-pointer'
                        : 'px-2 cursor-pointer'
                    }`}
                  >
                    {option}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
