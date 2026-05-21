
type Props = {
    src: string;
}

export function ProductImage({
    src
}: Props) {
    return (
        <img
            src={src}
            alt="Imagem do produto"
            className="
       object-contain
       overflow-hidden
        p-2
      "
        />
    );
}