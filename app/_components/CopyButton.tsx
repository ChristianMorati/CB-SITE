type CopyButtonProps = {
    title: string
}

export default function CopyButton({
    title
}: CopyButtonProps) {
    return (
        <button className="
              px-10 md:py-4 bg-red-100
              text-[#ED7D3B]
              border
              rounded-sm
              uppercase
              font-bold
              text-sm md:text-md
              ">
            {title}
        </button>
    )
}