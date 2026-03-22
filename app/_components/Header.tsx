import Link from "next/link";
import { FullscreenMenu } from "./Mobile/Menu/FullscreenMenu";

export default function Header() {
    const textColor = "#F6C9A1";

    return (
        <nav className={`
            h-[10vh]
            w-full
            z-100
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
            text-xs md:text-lg
            ">
                <h3>
                    CENTRAL BIKES E MOTOS
                </h3>
                <Link className="pl-2" href="/cms">CMS</Link>
            </div>

            <div className="
                lg:hidden flex justify-center items-center
            ">
                <FullscreenMenu />
            </div>

            <ul className="
                hidden lg:flex
                uppercase
                gap-3 items-center justify-center
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