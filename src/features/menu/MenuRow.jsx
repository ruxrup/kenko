import styled from "styled-components";
import CreateDishForm from "./CreateDishForm";
import useDeleteDish from "./useDeleteDish";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Dish = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function MenuRow({ dish }) {
  const { isDeleting, deleteDish } = useDeleteDish();

  const { dishCode, name, servings, price, discount, description, image } =
    dish;

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Dish>{name}</Dish>
        <div>{description}</div>
        <div>{servings} people</div>
        <Price>{price}</Price>
        {discount ? <Discount>{discount}</Discount> : <span>&mdash;</span>}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={dishCode} />
              <Menus.List id={dishCode}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="edit">
                <CreateDishForm dishToEdit={dish} />
              </Modal.Window>
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabins"
                  disabled={isDeleting}
                  onConfirm={() => deleteDish(dishCode)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default MenuRow;
