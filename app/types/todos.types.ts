export interface Todo {
  id: string;
  content: string;
  status: 'waiting' | 'started' | 'pending' | 'completed';
}
