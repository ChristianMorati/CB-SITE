import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.name || !body.type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.rpc(
      "create_product_full",
      { payload: body }
    )

    if (error) {
      console.error("RPC ERROR:", error)

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    if (!data?.success) {
      return NextResponse.json(
        { error: data?.error || "Unknown error" },
        { status: 500 }
      )
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error("PRODUCT CREATE ERROR:", error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}