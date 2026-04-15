// services/attributeDefinitionService.ts

import { supabase } from "@/lib/supabase";
import { AttributeDefinition } from "../cms/products/create/_Inputs/Attribute";

export class AttributeDefinitionService {
    static async getAll(): Promise<AttributeDefinition[]> {
        const { data, error } = await supabase
            .from("attributeDefinition")
            .select("*");

        if (error) {
            console.error("Erro ao buscar atributos:", error);
            throw new Error("Erro ao carregar atributos");
        }

        return data ?? [];
    }
}