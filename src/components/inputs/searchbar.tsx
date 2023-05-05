import SearchForm from '@forms/search';
import { SearchIcon } from '@ui/icons';
import Text from './text';

type SearchbarProps = {
  placeholder?: string;
  className?: string;
  id: 'searchbar-header' | 'searchbar-hero';
};
export default function Searchbar({
  placeholder,
  className,
  id,
}: SearchbarProps) {
  return (
    <SearchForm
      id={id}
      className={`transition-colors group gap-2 ${className}`}
    >
      <div className="px-2 flex items-center bg-transparent">
        <SearchIcon className="text-white/75 group-hover:text-tw-secondary group-focus-within:text-tw-secondary h-5 w-5" />
      </div>
      <Text
        className="grow bg-transparent py-px border-solid border-l-2 border-white/75 px-2 outline-none placeholder:text-white/75 group-focus-within:placeholder:text-inherit group-focus-within:border-tw-secondary group-hover:border-tw-secondary group-hover:placeholder:text-inherit"
        placeholder={placeholder ?? 'Search cards'}
        name="cards"
        id="cards"
        aria-label="Search cards"
        autoFocus
        autoComplete="off"
      />
    </SearchForm>
  );
}
