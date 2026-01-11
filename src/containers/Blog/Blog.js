import { Component } from "react";
import "./Blog.css";
import { BlogCard } from "./components/BlogCard";
import { AddBlogPost } from "./components/AddBlogPost";
import { EditPostForm } from "./components/EditPostForm";
import axios from 'axios';

export class Blog extends Component {

  state = {
    showAddBlog: false,
    showEditForm: false,
    blogArr: [],
    isPending: false,
    selectedPost: {}
  };

  fetchPosts = () => {
    axios.get('https://695c1f8d79f2f34749d38110.mockapi.io/posts')
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isPending: false
        });
      })
      .catch((err) => {
        console.log(err)
      });
  };

  addNewBlogPost = (blogPost) => {
    this.setState({
      isPending: true
    });
    axios.post('https://695c1f8d79f2f34749d38110.mockapi.io/posts/', blogPost)
      .then((response) => {
        console.log('Пост создан => ', response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  likePost = (blogPost) => {
    const temp = {...blogPost};
    temp.liked = !temp.liked;
    axios.put(`https://695c1f8d79f2f34749d38110.mockapi.io/posts/${blogPost.id}`, temp)
      .then((response) => {
        console.log('Пост изменен => ',response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err)
      })
  }; 

  deletePost = (blogPost) => {
    if (window.confirm(`Вы уверены, что хотите удалить ${blogPost.title}?`)) {
      this.setState({
        isPending: true
      });
      axios.delete(`https://695c1f8d79f2f34749d38110.mockapi.io/posts/${blogPost.id}`)
        .then((response) => {
          console.log('Пост удален => ', response.data)
          this.fetchPosts()
        })
        .catch((err) => {
          console.log(err)
        })
    };  
  };

  handleAddBlogShow = () => {
    this.setState({
      showAddBlog: true
    })
  };

  handleAddBlogHide = () => {
    this.setState({
      showAddBlog: false
    })
  };

  handleEditBlogShow = () => {
    this.setState({
      showEditForm: true
    })
  };

  handleEditBlogHide = () => {
    this.setState({
      showEditForm: false
    })
  };

  handleEsc = (e) => {
    if (e.key === 'Escape' && this.state.showAddBlog) this.handleAddBlogHide()
  };

  componentDidMount() {
    this.fetchPosts();
    window.addEventListener('keyup', this.handleEsc)
  };

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEsc)
  };

  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost
    })
  };

  editBlogPost = (updatedBlogPost) => {
    this.setState({
      isPending: true
    });
    axios.put(`https://695c1f8d79f2f34749d38110.mockapi.io/posts/${updatedBlogPost.id}`, updatedBlogPost)
    .then((response) => {
      console.log('Пост отредактирован => ', response.data)
      this.fetchPosts();
    })
    .catch((err) => {
      console.log(err);
    })
  };

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard 
          key={item.id} 
          title={item.title} 
          description={item.description} 
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          handleEditBlogShow={this.handleEditBlogShow}
          handleSelectPost={() => this.handleSelectPost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0)
      return <h2>Загружаю данные...</h2>

    return (
      <>
        {
          this.state.showEditForm && (
            <EditPostForm 
              handleEditBlogHide={this.handleEditBlogHide}
              selectedPost={this.state.selectedPost}
              editBlogPost={this.editBlogPost}
            />
          )
        }
        <button onClick={this.handleAddBlogShow} className='toggle-blog-button'>Создать пост</button>
        {
          this.state.showAddBlog ?
          <>
            <AddBlogPost 
              handleAddBlogHide={() => this.handleAddBlogHide()}
              blogArr={this.state.blogArr}
              showAddBlog={this.state.showAddBlog}
              addNewBlogPost={this.addNewBlogPost}
            />
          </>
          : null
        }
        {
          this.state.isPending && <h2>Подождите...</h2>
        }
        <div className="Posts">{blogPosts}</div>   
      </>
    );
  };
};
