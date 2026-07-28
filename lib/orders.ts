import { supabase } from "./supabase";

export async function createOrder(
  items: any[],
  total: number,
  customer: any
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login first.");
  }

  // Check if customer already exists
  const {
    data: existingCustomer,
    error: customerFetchError,
  } = await supabase
    .from("customers")
    .select("id")
    .eq("email", customer.email.trim().toLowerCase())
    .maybeSingle();

  if (customerFetchError) {
    throw customerFetchError;
  }

  let customerId: number;

  if (existingCustomer) {
    customerId = existingCustomer.id;
  } else {
    const {
      data: newCustomer,
      error: customerInsertError,
    } = await supabase
      .from("customers")
      .insert({
        full_name: `${customer.firstName} ${customer.lastName}`.trim(),
        email: customer.email.trim().toLowerCase(),
      })
      .select()
      .single();

    if (customerInsertError) {
      throw customerInsertError;
    }

    customerId = newCustomer.id;
  }

  // Create order
  const { data: order, error: orderError } =
    await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        customer_id: customerId,
        total,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
        country: customer.country,
      })
      .select()
      .single();

  if (orderError) {
    throw orderError;
  }

  // Create order items
  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  }));

  const { error: itemError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemError) {
    throw itemError;
  }

  return order;
}