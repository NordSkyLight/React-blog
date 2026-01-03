import { Component } from "react";
import "./Blog.css";
import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";
import { AddBlogPost } from "./components/AddBlogPost";

export class Blog extends Component {

  state = {
    showBlog: true,
    showAddBlog: false,
    blogArr: JSON.parse(localStorage.getItem('blogStore')) || posts
  };

  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp
    });

    localStorage.setItem('blogStore', JSON.stringify(temp));

  };
  
  toggleBlog = () => {
    this.setState({
      showBlog: !this.state.showBlog
    })
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
    })

    

    this.props.handleAddBlogHide();
  }

  componentDidMount() {
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
        />
      );
    });
    return (
      <>

        <button onClick={this.handleAddBlogShow} className='toggle-blog-button'>Создать пост</button>
        {
          this.state.showAddBlog ?
          <>
            <AddBlogPost 
              handleAddBlogHide={() => this.handleAddBlogHide()}
              blogArr={this.state.blogArr}
              addNewBlogPost={this.addNewBlogPost}
            />
          </>
          : null
        }
        
        <button onClick={this.toggleBlog} className='toggle-blog-button'>{this.state.showBlog ? 'Скрыть блог' : 'Показать блог'}</button>
        {
          this.state.showBlog ?
          <>
            <div className="Posts">{blogPosts}</div>
          </>
          : null
        }
      </>
    );
  };
};
