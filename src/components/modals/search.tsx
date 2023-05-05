'use client';

import { Dialog, Transition } from '@headlessui/react';
import { CloseIcon, SearchIcon } from '@ui/icons';
import { useState, Fragment, useRef } from 'react';
import SearchForm from '../forms/search';

export default function SearchModal(props: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-tw-gray text-sm hover:bg-tw-secondary focus:bg-tw-secondary hover:text-tw-black focus:text-tw-black rounded-md py-2 px-3"
      >
        Advanced Search
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          open={isOpen}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full backdrop-blur-md bg-tw-black/75 sm:items-center sm:justify-center sm:p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full min-w-md max-w-xl px-3 py-2 border-solid border-2 border-tw-gray sm:rounded-md backdrop-blur-md">
                  <SearchForm
                    closeRef={closeRef}
                    className="flex flex-col gap-2"
                  >
                    <Dialog.Title
                      as="h2"
                      className="text-xl sm:text-2xl flex items-center justify-between sm:justify-start gap-4 py-2 border-b-solid border-b-2 border-b-tw-gray"
                    >
                      <SearchIcon className="hidden sm:block h-[.85em] w-[.85em]" />
                      <span className="grow">Advanced Search</span>
                      <button ref={closeRef} type="button" onClick={closeModal}>
                        <CloseIcon className="h-[.85em] w-[.85em] bg-transparent text-white hover:text-red-600 focus:text-red-600" />
                      </button>
                    </Dialog.Title>
                    <div className="mb-6">
                      <kbd className="capitalize inline px-2 py-px rounded-sm font-bold text-sm bg-tw-gray text-white">
                        CTRL + Left Click
                      </kbd>
                      &nbsp; to select multiple.
                    </div>
                    {props.children}
                    <div className="flex flex-wrap grow sm:grow-0 items-center justify-end gap-2">
                      <button
                        className="px-3 py-2 grow sm:grow-0 min-w-[8rem] rounded-sm bg-red-600 hover:brightness-90 focus:brightness-90"
                        type="reset"
                      >
                        Reset
                      </button>
                      <button
                        className="px-3 py-2 grow sm:grow-0 text-tw-black min-w-[8rem] rounded-sm bg-tw-secondary hover:brightness-90 focus:brightness-90"
                        type="submit"
                      >
                        Search
                      </button>
                    </div>
                  </SearchForm>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
