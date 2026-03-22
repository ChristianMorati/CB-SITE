'use client'

type ProductNotFoundedProps = {
    searchedId: string
}

export function ProductNotFounded({ searchedId }: ProductNotFoundedProps) {
    return (
        <div className="flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full text-center border rounded-xl p-8 shadow-sm text-white">

                <div className="text-4xl mb-4">🔎</div>

                <h2 className="text-xl font-semibold mb-2">
                    Produto não encontrado
                </h2>

                <p className="text-gray-600 mb-4">
                    Não foi possível encontrar um produto com o ID informado.
                </p>

                <div className="bg-gray-100 rounded-md px-3 py-2 text-sm font-mono text-gray-800 mb-6">
                    {searchedId}
                </div>

                <div className="flex justify-center gap-3">
                    <a
                        href="/cms/products"
                        className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:opacity-90 transition"
                    >
                        Ver produtos
                    </a>

                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50 transition"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    )
}