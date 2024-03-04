import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function OrderTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "preparing", label: "Preparing" },
          { value: "out-for-delivery", label: "Out for delivery" },
          { value: "delivered", label: "Delivered" },
        ]}
      />

      <SortBy
        options={[
          { value: "date-desc", label: "Sort by date (recent first)" },
          { value: "date-asc", label: "Sort by date (earlier first)" },
          {
            value: "isPriority-asc",
            label: "Sort by priority (regular first)",
          },
          { value: "isPriority-desc", label: "Sort by priority (high first)" },
          {
            value: "price-desc",
            label: "Sort by amount (high first)",
          },
          { value: "price-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default OrderTableOperations;
