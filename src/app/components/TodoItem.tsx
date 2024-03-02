import Link from 'next/link';
import { TodoItem } from '../types';

interface TodoItemProps {
    todo: TodoItem;
  }

const TodoItemComponent: React.FC<TodoItemProps> = ({todo}) => {
    return (
        <>
        <Link href={`/todos/${todo.id}`}>
        <li
          key={todo.id}
          className="flex justify-between mb-6 pb-2 border-b border-blue-00"
        >
          <p className="outline-none w-1/6">{todo.title}</p>
          <p className="outline-none w-1/6">{todo.content}</p>
          <p className="outline-none w-1/6">{todo.deadline}</p>
          <p className="outline-none w-1/6">{todo.status}</p>
          <p className="outline-none w-1/6">{todo.comment}</p>
        </li>
      </Link>
      </>
    )
};

export default TodoItemComponent;