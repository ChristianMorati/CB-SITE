"use client";

import { useEffect, useState } from "react";
import { AttributeDefinition } from "./_Inputs/Attribute";
import { AttributeDefinitionService } from "@/app/_services/attributeDefinitionService";

export default function AttributeDefinitionList() {
    const [data, setData] = useState<AttributeDefinition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await AttributeDefinitionService.getAll();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p>Carregando...{JSON.stringify(data)}</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Attribute Definitions</h2>

            {data.length === 0 ? (
                <p>Nenhum atributo encontrado</p>
            ) : (
                <ul className="space-y-2">
                    {data.map((attr) => (
                        <li
                            key={attr.id}
                            className="border p-3 rounded-lg shadow-sm"
                        >
                            <p><strong>Label:</strong> {attr.label}</p>
                            <p><strong>Type:</strong> {attr.type}</p>
                            <p>
                                <strong>Metadata:</strong>{" "}
                                {attr.metadata
                                    ? JSON.stringify(attr.metadata)
                                    : "—"}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}