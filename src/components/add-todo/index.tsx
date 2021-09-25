import moment from "moment";
import React, { LegacyRef } from "react";
import { Button, Input, DatePicker } from "antd";
import { ScheduleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./index.styles.css";

interface AddTodoProps {
  value?: string;
  isDisabled?: boolean;
  dueDateValue?: string;
  onTodoSubmitPress?: React.ComponentProps<"input">["onClick"];
  handleDateChange?: (value: any, dateString: string) => void;
  handleInputChange?: React.ComponentProps<"input">["onChange"];
}

const AddTodo = React.forwardRef(
  (
    {
      value,
      dueDateValue,
      handleDateChange,
      onTodoSubmitPress,
      handleInputChange,
    }: AddTodoProps,
    ref: LegacyRef<HTMLFormElement>
  ) => {
    return (
      <form className="add-todo-container" ref={ref}>
        <Input
          size="large"
          value={value}
          className="todo-input"
          placeholder="Create a task"
          onChange={handleInputChange}
          prefix={
            <ScheduleOutlined
              style={{
                fontSize: 30,
              }}
              placeholder="large size"
            />
          }
          addonAfter={
            <Button
              type="primary"
              className="add-button"
              onClick={onTodoSubmitPress}
              disabled={!dueDateValue || !value}
            >
              <PlusCircleOutlined
                style={{
                  fontSize: 22,
                }}
              />
            </Button>
          }
        />
        <DatePicker
          className="date-picker"
          style={{
            flex: 1,
            minHeight: 46,
          }}
          onChange={handleDateChange}
          value={(dueDateValue && moment(dueDateValue)) || undefined}
        ></DatePicker>
      </form>
    );
  }
);

export default AddTodo;
