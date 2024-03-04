import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import OrderDataBox from "../orders/OrderDataBox";
import useOrder from "../orders/useOrder";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useSendDelivery from "./useSendDelivery";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function SendForDelivery() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { send, isSending } = useSendDelivery();
  const { order, isLoading } = useOrder();

  useEffect(() => setConfirmPaid(order?.isPaid || false), [order]);

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  const {
    id: orderId,
    price,
    extraPrice,
    user: { firstName, lastName },
  } = order;

  function handleCheckin() {
    if (!confirmPaid) return;
    send(orderId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Send for delivery for booking #{orderId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <OrderDataBox order={order} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id={"confirm"}
          disabled={confirmPaid || isSending}
        >
          I confirm that {firstName + " " + lastName} has paid the total amount
          of {formatCurrency(price + extraPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isSending}>
          Send booking #{orderId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default SendForDelivery;
