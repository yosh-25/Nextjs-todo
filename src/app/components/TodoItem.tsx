import Link from 'next/link';
import { TodoItem } from '../types';

interface TodoItemProps {
    todo: TodoItem;
  }

const TodoItemComponent: React.FC<TodoItemProps> = ({todo}) => {
    return (
        <>
        
        <li
          key={todo.id}
          className="flex justify-between mb-6 py-1 border-b border-blue-00"
        >
          <p className="outline-none w-1/6">{todo.title}</p>
          <p className="outline-none w-1/6">{todo.content}</p>
          <p className="outline-none w-1/6">{todo.deadline}</p>
          <p className="outline-none w-1/6">{todo.status}</p>
          <p className="outline-none w-1/6">{todo.comment}</p> 
          <Link href={`/todos/${todo.id}`}>
          <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 w-24 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          
        >
          詳細/編集
        </button>
        </Link>
        </li>
    
      
      </>
    )
};

export default TodoItemComponent;