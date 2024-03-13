import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getOrders({ filter, sortBy, page }) {
  let query = supabase.from("orders").select("*, user(*)", { count: "exact" });

  //FILTER:
  if (filter) query[filter.method || "eq"](filter.field, filter.value);

  //SORT-BY:
  if (sortBy)
    query.order(sortBy.field, { ascending: sortBy.direction === "asc" });

  //PAGINATION:
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    throw new Error("Orders could not be loaded.");
  }
  return { data, count };
}

export async function getOrder(id) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, user(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Order not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get orders created in the last 30 days, for example.
export async function getOrdersAfterDate(date) {
  const { data, error } = await supabase
    .from("orders")
    .select("*,user(*)")
    .gte("created_at", date)
    .lte("created_at", getToday());

  if (error) {
    console.error(error);
    throw new Error("Orders could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("orders")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Orders could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("orders")
    .select("*, user(*)")
    .neq("status", "delivered");

  if (error) {
    console.error(error);
    throw new Error("Orders could not get loaded");
  }
  return data;
}

export async function updateOrder(id, obj) {
  const { data, error } = await supabase
    .from("orders")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Order could not be updated");
  }
  return data;
}

export async function deleteOrder(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("orders").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Order could not be deleted");
  }
  return data;
}
