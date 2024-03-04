import Spinner from "../../ui/Spinner";
import MenuRow from "./MenuRow";
import useDishes from "./useDishes";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";

function MenuTable() {
  const { isLoading, dishes } = useDishes();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  if (!dishes.length) return <Empty resource={"dishes"} />;

  //For Filtering
  const filterValue = searchParams.get("discount") || "all";

  let filterDishes;
  if (filterValue === "all") filterDishes = dishes;
  if (filterValue === "no-discount")
    filterDishes = dishes.filter((dish) => dish.discount === 0);
  if (filterValue === "with-discount")
    filterDishes = dishes.filter((dish) => dish.discount > 0);

  //For Sorting
  const sortBy = searchParams.get("sortBy") || "created_at-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedDishes;

  if (field === "name") {
    sortedDishes = filterDishes.sort(
      (a, b) =>
        a.name.toUpperCase().localeCompare(b.name.toUpperCase()) * modifier
    );
  } else {
    sortedDishes = filterDishes.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr 2rem">
        <Table.Header>
          <div>Image</div>
          <div>Dish</div>
          <div>Description</div>
          <div>Servings</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={sortedDishes}
          render={(dish) => <MenuRow dish={dish} key={dish.dishCode} />}
        />
      </Table>
    </Menus>
  );
}

export default MenuTable;
