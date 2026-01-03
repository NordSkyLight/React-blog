import ClearIcon from '@mui/icons-material/Clear';
import './AddBlogPost.css';
import { Component } from 'react';

export class AddBlogPost extends Component {

    state = {
        postTitle: '',
        postDesc: ''
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

    createPost = () => {
        const post = {
            id: this.props.blogArr.length + 1,
            title: this.state.postTitle,
            description: this.state.postDesc,
            liked: false
        }

        this.props.addNewBlogPost(post);
    };

    render() {
        const handleAddBlogHide = this.props.handleAddBlogHide;
        return (
            <>
                <form className='addPostForm'>
                    <button onClick={handleAddBlogHide} className='CloseAddPostForm'><ClearIcon /></button>
                    <h2>Создание поста</h2>
                    <div>
                        <input 
                            placeholder='Название поста' 
                            type="text" 
                            value={this.state.postTitle}
                            onChange={this.handlePostTitleChange} 
                        />
                    </div>
                    <div>
                        <textarea 
                            placeholder='Текст' 
                            name="" 
                            id="" 
                            value={this.state.postDesc} 
                            onChange={this.handlePostDescChange}
                        ></textarea>
                    </div>
                    <div>
                        <button onClick={this.createPost} className='addPostBtn'>Создать пост</button>
                    </div>
                </form>
                <div onClick={handleAddBlogHide} className='overlay'></div>
            </>    
        );
    };
};