import Link from "next/link";
import { MdDirectionsBike } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import { TbMotorbike } from "react-icons/tb";
import { Section } from "./Section";

const pagePrefix = "/products";

export function Footer() {
    return (
        <footer
            className="
            px-2
            max-w-[1200px]
            mx-auto
            my-5
            "
        >
            <div
                className="
                grid
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-6
                divide-x
                divide-gray-900
                "
            >
                <div className="
                    p-2
                    ">
                    <h3>Produtos</h3>
                    <ul className={`
                        pl-5
                        cursor-pointer
                    `}>
                        <li className="flex gap-2
                        items-center
                        ">
                            <MdDirectionsBike /> <Link href={`${pagePrefix}/bikes`}>Bicicletas</Link>
                        </li>
                        <li className="flex gap-2
                        items-center
                        ">
                            <TbMotorbike /> <Link href={`${pagePrefix}/bikes-eletricas`}>Elétricas</Link>
                        </li>
                        <li className="flex gap-2
                        items-center
                        ">
                            <RiMotorbikeFill />  <Link href={`${pagePrefix}/motos`}>Motos</Link>
                        </li>
                    </ul>
                </div>
                <div className="
                    p-2
                    ">
                    <h3>Produtos</h3>
                    <ul className={`
                        pl-5
                        cursor-pointer
                    `}>
                        <li className="flex gap-2
                        items-center
                        ">
                            <MdDirectionsBike /> <Link href={`${pagePrefix}/bikes`}>Bicicletas</Link>
                        </li>
                        <li className="flex gap-2
                        items-center
                        ">
                            <TbMotorbike /> <Link href={`${pagePrefix}/bikes-eletricas`}>Elétricas</Link>
                        </li>
                        <li className="flex gap-2
                        items-center
                        ">
                            <RiMotorbikeFill />  <Link href={`${pagePrefix}/motos`}>Motos</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="my-2" />
            <div className="
                p-2
                ">
                <h1>Central Bikes e Motos</h1>
                <p className="">2026</p>
            </div>
        </footer >
    )
}