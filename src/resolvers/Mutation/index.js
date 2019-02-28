// Compose all mutations together and return as one
import AuthMutation from './AuthMutation';
import TodoMutation from './TodoMutation';

export default { ...AuthMutation, ...TodoMutation };
