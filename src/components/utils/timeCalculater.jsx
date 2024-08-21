import { formatDistanceToNow } from 'date-fns';

export default function QuestionTime({ createdAt }) {
  console.log('Created At:', createdAt); // Debugging

  try {
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    return <p>{timeAgo}</p>;
  } catch (error) {
    console.error('Invalid date:', createdAt);
    return <p>Invalid date</p>;
  }
}
