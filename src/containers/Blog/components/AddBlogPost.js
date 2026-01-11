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

    createPost = (e) => {
        e.preventDefault();
        const post = {
            title: this.state.postTitle,
            description: this.state.postDesc,
            liked: false
        }

        this.props.addNewBlogPost(post);
        this.props.handleAddBlogHide();
    };
    
    //handleEnter = (e) => {
    //    if (e.key === 'Enter') this.createPost(e)
    //};

    //componentDidMount() {
    //    window.addEventListener('keyup', this.handleEnter)
    //};

    //componentWillUnmount() {
    //    window.addEventListener('keyup', this.handleEnter)
    //};

    render() {
        const handleAddBlogHide = this.props.handleAddBlogHide;
        return (
            <>
                <form className='addPostForm' onSubmit={this.createPost}>
                    <button onClick={handleAddBlogHide} className='CloseAddPostForm'><ClearIcon /></button>
                    <h2>Создание поста</h2>
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
                        <button type='submit' className='addPostBtn'>Создать пост</button>
                    </div>
                </form>
                <div onClick={handleAddBlogHide} className='overlay'></div>
            </>    
        );
    };
};