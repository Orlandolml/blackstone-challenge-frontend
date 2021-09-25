import React from "react";
import { Select } from "antd";
import "./index.styles.css";
import { useAppDispatch } from "../../hooks";
import { setVisibilityFilter } from "../../redux/todosSlice";

const { Option } = Select;

const VisibilitySelect = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Select
        defaultValue="All"
        className="select"
        onChange={(value: string) => {
          dispatch(setVisibilityFilter(value));
        }}
      >
        <Option value="all">All</Option>
        <Option value="completed">Completed</Option>
        <Option value="uncompleted">Uncompleted</Option>
      </Select>
    </div>
  );
};

export default VisibilitySelect;
