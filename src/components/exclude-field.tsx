import {
  type ExcludedFormKeys,
  useDispatchContext,
  useFormContext,
} from '@/context/search';
import { Toggle } from '@/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';
import { Ascending, Descending, Minus } from '@/ui/icons';

const ExcludeSearchField = ({ field }: { field: ExcludedFormKeys }) => {
  const { exclude } = useFormContext();
  const dispatch = useDispatchContext();
  const Icon = field == 'orderBy' ? (exclude ? Descending : Ascending) : Minus;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type="button">
          <Toggle
            aria-label="exclude from search"
            defaultPressed={exclude}
            variant="outline"
            type="button"
            className="flex capitalize border-2 aspect-square items-center rounded-none gap-1 px-1 py-0.5"
            onPressedChange={(e) => {
              dispatch({ type: 'set', key: 'exclude', value: !exclude });
            }}
          >
            <Icon className="w-5 h-5" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <span>Exclude from search</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { ExcludeSearchField };
