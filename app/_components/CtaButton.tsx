type CtaButtonProps = {
    title: string
}

export default function CtaButton({
    title
}: CtaButtonProps) {
    return (
        <button className="
              px-8 py-4 bg-black
              text-[#ED7D3B]
              border
              rounded-sm
              uppercase
              text-xl
              ">
            {title}
        </button>
    )
}