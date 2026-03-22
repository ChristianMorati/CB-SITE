type Props = {
  title: string
}

export function CardTitle({ title }: Props) {
  return <h3 className="text-2xl">{title}</h3>
}