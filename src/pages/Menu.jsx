import Heading from "../ui/Heading";
import Row from "../ui/Row";
import MenuTable from "../features/menu/MenuTable";
import AddDish from "../features/menu/AddDish";
import MenuOperations from "../features/menu/MenuOperations";

function Menu() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Menu</Heading>
        <MenuOperations />
      </Row>
      <Row>
        <MenuTable />
      </Row>
      <AddDish />
    </>
  );
}

export default Menu;
