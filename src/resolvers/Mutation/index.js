// Compose all mutations together and return as one
import UserMutation from './UserMutation';
import TodoMutation from './TodoMutation';

export default { ...UserMutation, ...TodoMutation };
