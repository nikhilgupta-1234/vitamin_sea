import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Props {
  customerName: string;
  orderId: string;
  items: OrderItem[];
  total: number;
}

export default function OrderConfirmation({
  customerName,
  orderId,
  items,
  total,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>
        Your Vitamin Sea order has been confirmed!
      </Preview>

      <Body
        style={{
          backgroundColor: "#f8fafc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
          }}
        >
          <Heading
            style={{
              color: "#0f4c81",
              textAlign: "center",
            }}
          >
            🌊 Vitamin Sea
          </Heading>

          <Text>Hello {customerName},</Text>

          <Text>
            Thank you for shopping with Vitamin Sea.
            Your order has been confirmed and we're
            getting it ready.
          </Text>

          <Hr />

          <Text>
            <strong>Order ID:</strong> #{orderId}
          </Text>

          <Hr />

          {items.map((item, index) => (
            <Section key={index}>
              <Text>
                {item.name}
              </Text>

              <Text>
                Qty: {item.quantity}
              </Text>

              <Text>
                ₹{item.price}
              </Text>

              <Hr />
            </Section>
          ))}

          <Heading
            as="h2"
            style={{
              color: "#0f4c81",
            }}
          >
            Total: ₹{total}
          </Heading>

          <Button
            href={`${process.env.NEXT_PUBLIC_SITE_URL}/orders`}
            style={{
              backgroundColor: "#0ea5e9",
              color: "#ffffff",
              padding: "14px 24px",
              borderRadius: "999px",
              textDecoration: "none",
            }}
          >
            View My Orders
          </Button>

          <Hr />

          <Text
            style={{
              fontSize: "13px",
              color: "#666",
            }}
          >
            Vitamin Sea
            <br />
            Handmade Ocean Inspired Accessories
          </Text>

          <Text
            style={{
              fontSize: "13px",
              color: "#666",
            }}
          >
            support@vitaminsea.in
          </Text>
        </Container>
      </Body>
    </Html>
  );
}