export function Table(props: React.ComponentProps<"table">) {
  return (
    <div className="w-full overflow-auto rounded-xl border border-border">
      <table className="w-full divide-y divide-border text-sm" {...props} />
    </div>
  );
}

export function TableHeader(props: React.ComponentProps<"thead">) {
  return <thead className="bg-fg font-medium text-canvas" {...props} />;
}

export function TableBody(props: React.ComponentProps<"tbody">) {
  return <tbody {...props} className="divide-y divide-border" />;
}

export function TableFooter(props: React.ComponentProps<"tfoot">) {
  return <tfoot className="bg-fg font-medium text-canvas" {...props} />;
}

export function TableRow(props: React.ComponentProps<"tr">) {
  return <tr {...props} />;
}

export function TableHead(props: React.ComponentProps<"th">) {
  return (
    <th
      className="h-10 px-2 text-left align-middle font-medium text-inherit [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
      {...props}
    />
  );
}

export function TableCell(props: React.ComponentProps<"td">) {
  return (
    <td
      className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
      {...props}
    />
  );
}

export function TableCaption(props: React.ComponentProps<"caption">) {
  return <caption className="text-sm text-fg" {...props} />;
}
