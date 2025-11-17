
export default function Header() {
    const textColor = "#F6C9A1";

    return (
        <nav className={`
            h-[10vh]
            flex flex-row justify-center
            p-2
            bg-black/80
            border-b border-[#706A60]
            text-[${textColor}]
            `}>
            <div className="
            aspect-square bg-orange-950
            rounded-full
            ">
            </div>
            <div className="
            flex flex-1 items-center pl-5
            ">
                CENTRAL BIKE E MOTOS
            </div>
            <ul className="
            uppercase
            hidden lg:flex
            gap-3 items-center jusify-center
            pr-5
            ">
                <li>
                    <p>Contato</p>
                </li>
                <li>
                    <p>Produtos</p>
                </li>
                <li>
                    <p>Serviços</p>
                </li>
            </ul>
        </nav>
    )
}