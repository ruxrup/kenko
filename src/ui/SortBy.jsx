import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSelected = searchParams.get("sortBy") || options.at(0).value;

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      value={currentSelected}
      options={options}
      onChange={handleChange}
      type={"white"}
    />
  );
}

export default SortBy;
