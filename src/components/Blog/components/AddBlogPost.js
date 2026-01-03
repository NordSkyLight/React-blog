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
                        <button onClick={handleAddBlogHide} className='addPostBtn'>Создать пост</button>
                    </div>
                </form>
                <div onClick={handleAddBlogHide} className='overlay'></div>
            </>    
        );
    };
};