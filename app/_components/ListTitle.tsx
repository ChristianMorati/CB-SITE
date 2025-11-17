type ListTitleProps = {
    text: string
}

export default function ListTitle({
    text
}: ListTitleProps) {
    return (
        <h2 className="
        text-3xl font-semibold mb-3 text-[rgb(237,125,59)]
        Lg:text-6xl font-stroke uppercase
        ">
            {text}
        </h2>
    )
}