import './BlogCard.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export const BlogCard = ({ title, description, liked, likePost, deletePost, handleEditBlogShow, handleSelectPost }) => {

  const showEditForm = () => {
    handleSelectPost();
    handleEditBlogShow();
  }

  const heartFill = liked ? 'crimson' : 'black'
  
  return (
    <div className="Post">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className='like'>
        <button onClick={likePost} className='like-icon'>
          <FavoriteIcon style={{fill: heartFill}} />
        </button>
        <div className='icons'>
          <button className='icons-item' onClick={showEditForm} >
            <EditIcon />
          </button>
          <button onClick={deletePost} className='icons-item' >
            <DeleteForeverIcon />
          </button>
        </div>
        
      </div>
    </div>
  );
};
