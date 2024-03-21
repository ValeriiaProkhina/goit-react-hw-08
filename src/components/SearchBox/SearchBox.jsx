import { useId } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

import css from "./SearchBox.module.css";

export default function SearchBar({ children }) {
  const searchID = useId();
  const filterName = useSelector(selectNameFilter);
  const dispatch = useDispatch();
  return (
    <div className={css.container}>
      <label htmlFor={searchID}>{children}</label>
      <input
        className={css.input}
        id={searchID}
        type="text"
        name="search"
        value={filterName}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
}
