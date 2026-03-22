
type SectionTitleProps = {
    name: string
}

export function SectionTitle({
    name,
}: SectionTitleProps) {
    return (
        <>
            <h1 className="
            text-4xl
            pt-4
            pb-2
            ">{name}</h1>
        </>
    )
}