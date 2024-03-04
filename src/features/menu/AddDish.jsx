import Button from "../../ui/Button";
import CreateDishForm from "./CreateDishForm";
import Modal from "../../ui/Modal";

function AddDish() {
  return (
    <Modal>
      <Modal.Open opens="dish-form">
        <Button>Add new Dish</Button>
      </Modal.Open>
      <Modal.Window name="dish-form">
        <CreateDishForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddDish;
