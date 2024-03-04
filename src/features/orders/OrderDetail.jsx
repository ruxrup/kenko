import styled from "styled-components";

import OrderDataBox from "./OrderDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useOrder from "./useOrder";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import useDelivered from "../order-updates/useDelivered";
import useDeleteOrder from "./useDeleteOrder";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function OrderDetail() {
  const { order, isLoading } = useOrder();
  const { delivered, isDelivering } = useDelivered();
  const { isDeleting, deleteOrder } = useDeleteOrder();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!order) return <Empty resource={"order"} />;

  const { status, id: orderId } = order;

  const statusToTagName = {
    preparing: "blue",
    "out-for-delivery": "green",
    delivered: "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Order #{orderId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <OrderDataBox order={order} />

      <ButtonGroup>
        {status === "preparing" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/out-for-delivery/${orderId}`)}
          >
            Out for delivery
          </Button>
        )}

        {status === "out-for-delivery" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => delivered(orderId)}
            disabled={isDelivering}
          >
            Delivered
          </Button>
        )}
        <Modal>
          <Modal.Open opens={"toDelete"}>
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name={"toDelete"}>
            <ConfirmDelete
              resourceName={"order"}
              disabled={isDeleting}
              onConfirm={() => deleteOrder(orderId)}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default OrderDetail;
