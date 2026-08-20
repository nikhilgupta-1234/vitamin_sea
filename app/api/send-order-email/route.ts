import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import OrderConfirmation from "@/app/emails/OrderConfirmation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      customerName,
      orderId,
      items,
      total,
    } = body;

    if (!email) {
      return NextResponse.json(
        {
          error: "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    const { error } = await resend.emails.send({
      from: "Vitamin Sea <orders@yourdomain.com>",
      to: email,
      subject: `Order Confirmation #${orderId}`,
      react: OrderConfirmation({
        customerName,
        orderId,
        items,
        total,
      }),
    });

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          error,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Failed to send email",
      },
      {
        status: 500,
      }
    );
  }
}