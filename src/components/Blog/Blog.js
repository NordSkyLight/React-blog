import { Component } from "react";
import "./Blog.css";
//import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";
import { AddBlogPost } from "./components/AddBlogPost";
import { EditPostForm } from "./components/EditPostForm";
import axios from 'axios';

export class Blog extends Component {

  state = {
    showAddBlog: false,
    showEditForm: false,
    blogArr: [],
    selectedPost: {}
  };

  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp
    });

    localStorage.setItem('blogStore', JSON.stringify(temp));
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


  addNewBlogPost = (blogPost) => {
    this.setState((state) => {
      const posts = [...state.blogArr];
      posts.push(blogPost);
      localStorage.setItem('blogStore', JSON.stringify(posts));

      return {
        blogArr: posts
      }
    });
  };

  componentDidMount() {
    axios.get('https://695c1f8d79f2f34749d38110.mockapi.io/posts')
      .then((response) => {
        this.setState({
          blogArr: response.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
    window.addEventListener('keyup', this.handleEsc)
  };

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEsc)
  };

  deletePost = (pos) => {
    if (window.confirm(`Вы уверены, что хотите удалить ${this.state.blogArr[pos].title}?`)) {
      const temp = [...this.state.blogArr];
      temp.splice(pos, 1);

      this.setState({
        blogArr: temp
      });

      localStorage.setItem('blogStore', JSON.stringify(temp));
    };  
  };

  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost
    })
  };

  //editBlogPost = (updatedBlogPost) => {
  //  this.setState({
  //    isPending
  //  })
  //}

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard 
          key={item.id} 
          title={item.title} 
          description={item.description} 
          liked={item.liked}
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(pos)}
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
        <div className="Posts">{blogPosts}</div>   
      </>
    );
  };
};
