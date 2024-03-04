import supabase, { supabaseUrl } from "./supabase";

export async function getMenu() {
  const { data, error } = await supabase.from("dishes").select("*");

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

export async function createEditDish({ dish, dishToEdit }) {
  const hasImagePath = dish.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${dish.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? dish.image
    : `${supabaseUrl}/storage/v1/object/public/kenko/${imageName}`;

  let query = supabase.from("dishes");

  if (!dishToEdit) {
    query = query.insert([{ ...dish, image: imagePath }]);
  }

  if (dishToEdit) {
    const { dishCode: editId, ...dishForEditing } = dish;
    query = query
      .update({ ...dishForEditing, image: imagePath })
      .eq("dishCode", editId);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("kenko")
      .upload(imageName, dish.image);

    if (storageError) {
      await supabase.from("dishes").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created."
      );
    }
  }
  return data;
}
export async function deleteDish(dishCode) {
  const { data, error } = await supabase
    .from("dishes")
    .delete()
    .eq("dishCode", dishCode);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}
