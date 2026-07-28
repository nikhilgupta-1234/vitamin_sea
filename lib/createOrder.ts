import { supabase } from "./supabase";

export async function createOrder(
  customer: any,
  items: any[],
  total: number
) {
  const { data: order, error } = await supabase
    .from("orders")
    .insert([
      {
        customer_name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
        total,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return order;
}