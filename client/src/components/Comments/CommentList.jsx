import './CommentList.css'
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
    return (
        <div>
            {comments &&
                comments.map(comment => (
                    <div className='comment-card my-3 p-3'>
                        <p className="pill mb-3 " key={comment._id}>
                            {comment.commentBody} {'// '}
                        </p>
                        <p className='mb-0 text-end'>
                            <Link className='link' to={`/profile/${comment.username}`} style={{ fontWeight: 700 }}>
                                {comment.username} 
                            </Link> on {comment.createdAt}
                        </p>
                    </div>
                ))}
        </div>
    )
}

export default CommentList;