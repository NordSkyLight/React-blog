import ClearIcon from '@mui/icons-material/Clear';
import './EditPostForm.css';
import { Component } from 'react';

export class EditPostForm extends Component {

    state = {
        postTitle: this.props.selectedPost.title,
        postDesc: this.props.selectedPost.description
    };

    handlePostTitleChange = (e) => {
        this.setState({
            postTitle: e.target.value
        })
    };

    handlePostDescChange = (e) => {
        this.setState({
            postDesc: e.target.value
        })
    };

    savePost = (e) => {
        e.preventDefault();
        const post = {
            id: this.props.selectedPost.id,
            title: this.state.postTitle,
            description: this.state.postDesc,
            liked: this.props.selectedPost.liked
        }

        this.props.editNewBlogPost(post); 
        this.props.handleEditBlogHide();
    };
    
    handleEsc = (e) => {
        if (e.key === 'Escape') this.props.handleEditBlogHide()
    };

    componentDidMount() {
        window.addEventListener('keyup', this.handleEsc)
    };

    componentWillUnmount() {
        window.addEventListener('keyup', this.handleEsc)
    };

    render() {
        const handleEditBlogHide = this.props.handleEditBlogHide;
        return (
            <>
                <form className='editPostForm' onSubmit={this.savePost}>
                    <button onClick={handleEditBlogHide} className='CloseAddPostForm'><ClearIcon /></button>
                    <h2>Редактирование поста</h2>
                    <div>
                        <input 
                            placeholder='Название поста' 
                            type="text" 
                            value={this.state.postTitle}
                            onChange={this.handlePostTitleChange}
                            required 
                        />
                    </div>
                    <div>
                        <textarea 
                            placeholder='Текст' 
                            name="" 
                            id="" 
                            value={this.state.postDesc} 
                            onChange={this.handlePostDescChange}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button type='submit' className='addPostBtn'>Сохранить</button>
                    </div>
                </form>
                <div onClick={handleEditBlogHide} className='overlay'></div>
            </>    
        );
    };
};