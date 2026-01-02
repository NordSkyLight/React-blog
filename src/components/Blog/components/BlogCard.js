import './BlogCard.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const BlogCard = ({ title, description, liked, likePost, deletePost }) => {

  const heartFill = liked ? 'crimson' : 'black'
  
  return (
    <div className="Post">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className='like'>
        <button onClick={likePost} className='like-icon'>
          <FavoriteIcon style={{fill: heartFill}} />
        </button>
        <button onClick={deletePost} className='delete-icon'>
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  );
};
