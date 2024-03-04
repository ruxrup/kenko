import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import DeliverButton from "./DeliverButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 9rem 12rem 8rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, user, price, extraPrice, isPaid } = activity;
  return (
    <StyledTodayItem>
      {status === "preparing" && <Tag type="blue">Preparing</Tag>}
      {status === "out-for-delivery" && <Tag type="green">Sent</Tag>}

      {isPaid ? <Tag type="green">Paid</Tag> : <Tag type="red">Not Paid</Tag>}

      <Guest>{user.firstName + " " + user.lastName[0]}</Guest>
      <div>{price + extraPrice} $</div>

      {status === "out-for-delivery" && <DeliverButton orderId={id} />}
      {status === "preparing" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/out-for-delivery/${id}`}
        >
          {" "}
          Sent?{" "}
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
