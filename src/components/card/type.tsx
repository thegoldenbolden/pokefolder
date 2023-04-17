import Image from '@ui/image';

export default function CardType({ type }: { type: string }) {
  return (
    <Image
      src={`/types/${type.toLowerCase()}.png`}
      height={20}
      width={20}
      className="w-[20px] h-[20px]"
      alt={`${type} icon`}
    />
  );
}
