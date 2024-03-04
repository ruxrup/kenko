import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
  HiUser,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";

import {
  formatDistanceFromNow,
  formatCurrency,
  getNow,
} from "../../utils/helpers";

const StyledOrderDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function OrderDataBox({ order }) {
  const {
    created_at,
    price,
    isPaid,
    extraPrice,
    description,
    isPriority,
    time,
    date,
    user: {
      firstName: guestFName,
      lastName: guestLName,
      email,
      address,
      phone,
    },
    dishes: { name: dishName, servings: dishServings, discount: dishDiscount },
  } = order;

  return (
    <StyledOrderDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {dishServings} servings for <span>{dishName}</span>
          </p>
        </div>

        <p>
          {format(new Date(date), "EEE, MMM dd yyyy")} (
          {isToday(new Date(date)) ? "Today" : formatDistanceFromNow(date)}) at
          {"  "}
          {time}
        </p>
      </Header>

      <Section>
        <Guest>
          <HiUser />
          <p>{guestFName + " " + guestLName} </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>{phone}</p>
          <span>&bull;</span>
          <p>{address}</p>
        </Guest>

        <DataItem icon={<HiOutlineCheckCircle />} label="Priority Order?">
          {isPriority ? "Yes" : "No"}
        </DataItem>
        <DataItem icon={<HiOutlineCheckCircle />} label="Description of dish:">
          {description}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(price + extraPrice - dishDiscount)}

            {isPriority &&
              ` (${formatCurrency(price)} dish + ${formatCurrency(
                extraPrice
              )} extra Charges - ${formatCurrency(
                dishDiscount
              )} dish discount)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledOrderDataBox>
  );
}

export default OrderDataBox;