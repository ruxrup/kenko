import styled from "styled-components";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import useDelivered from "../order-updates/useDelivered";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteOrder from "./useDeleteOrder";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function OrderRow({
  order: {
    id: orderId,
    price,
    date,
    time,
    isPriority,
    extraPrice,
    status,
    user: { firstName: guestName, lastName: guestName2, email, address, phone },
    dishes: { name: dishname },
  },
}) {
  const navigate = useNavigate();
  const { delivered, isDelivering } = useDelivered();
  const { isDeleting, deleteOrder } = useDeleteOrder();
  const statusToTagName = {
    preparing: "blue",
    "out-for-delivery": "green",
    delivered: "silver",
  };

  return (
    <Table.Row>
      <Cabin>{dishname}</Cabin>
      <Stacked>
        <span>{guestName + " " + guestName2}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>{date}</span>
        <span>{time}</span>
      </Stacked>
      <Stacked>
        <span>{address}</span>
        <span>{phone}</span>
      </Stacked>

      <Amount>{formatCurrency(price + extraPrice)}</Amount>

      <Tag type={isPriority ? "red" : "green"}>
        {isPriority ? "High" : "Regular"}
      </Tag>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={orderId} />
          <Menus.List id={orderId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/orders/${orderId}`)}
            >
              See Details
            </Menus.Button>

            <Modal.Open opens={"toDelete"}>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>

            {status === "preparing" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/out-for-delivery/${orderId}`)}
              >
                Out for delivery
              </Menus.Button>
            )}

            {status === "out-for-delivery" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => delivered(orderId)}
                disabled={isDelivering}
              >
                Delivered
              </Menus.Button>
            )}
          </Menus.List>
          <Modal.Window name={"toDelete"}>
            <ConfirmDelete
              resourceName={"order"}
              disabled={isDeleting}
              onConfirm={() => deleteOrder(orderId)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default OrderRow;
