import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateDish from "./useCreateDish";
import useEditDish from "./useEditDish";

function CreateDishForm({ dishToEdit = {}, onCloseModal }) {
  const editingSession = Boolean(dishToEdit.dishCode);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editingSession ? dishToEdit : {},
  });
  const { createDish, isCreating } = useCreateDish();
  const { editDish, isEditing } = useEditDish();
  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image == "string" ? data.image : data.image[0];

    if (editingSession) {
      editDish(
        { dish: { ...data, image: image }, dishToEdit: true },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else
      createDish(
        { dish: { ...data, image: image }, dishToEdit: false },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label={"Dish name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required!" })}
        />
      </FormRow>
      <FormRow label={"Dish Code"} error={errors?.dishCode?.message}>
        <Input
          type="number"
          id="dishCode"
          disabled={isWorking || Object.keys(dishToEdit).length}
          {...register("dishCode", { required: "This field is required!" })}
        />
      </FormRow>
      <FormRow label={"Restaurant ID"} error={errors?.restaurantId?.message}>
        <Input
          type="number"
          id="restaurantId"
          disabled={isWorking || Object.keys(dishToEdit).length}
          {...register("restaurantId", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow label={"Servings"} error={errors?.servings?.message}>
        <Input
          type="number"
          id="servings"
          disabled={isWorking}
          {...register("servings", {
            required: "This field is required!",
            min: { value: 1, message: "Servings should be atleast 1." },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          disabled={isWorking}
          {...register("price", {
            required: "This field is required!",
            min: { value: 0, message: "Price should be greater than 0." },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required!",
            validate: (value) =>
              value <= getValues().price ||
              "Discount should be less than price.",
          })}
        />
      </FormRow>

      <FormRow label={"Description"} error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required!" })}
        />
      </FormRow>
      <FormRow label={"Dish photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: Object.keys(dishToEdit).length
              ? false
              : "This field is required!",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {Object.keys(dishToEdit).length ? "Edit dish" : "Create new dish"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateDishForm;
