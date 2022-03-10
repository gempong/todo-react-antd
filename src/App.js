import React from "react";
import { Input, Space, Button, Card, Typography, Form } from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./App.css";

const { Title, Paragraph } = Typography;

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <Card className="cardToDo" style={{width: 700}}>
      <Space direction="horizontal" size="middle">
        <Paragraph
          style={{ textDecoration: todo.isDone ? "line-through" : "" }}
        >
          {todo.text}
        </Paragraph>
        <Button
          type="primary"
          icon={<CheckOutlined />}
          onClick={() => markTodo(index)}
        />
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => removeTodo(index)}
        />
      </Space>
    </Card>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    console.log(value);
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onFinish={handleSubmit}>
      <Space direction="vertical" size="middle">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add Todo"
        />
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Space>
    </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "This is a sampe todo",
      isDone: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <Card className="cardToDo" style={{width: 700}}>
        <Space direction="vertical" size="middle">
          <Title level={3}>My ToDo</Title>
          <FormTodo addTodo={addTodo} />
        </Space>
      </Card>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          index={index}
          todo={todo}
          markTodo={markTodo}
          removeTodo={removeTodo}
        />
      ))}
    </div>
  );
}

export default App;
