import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {

        posts : [],
        selectedPostId: null
    }

    componentDidMount () {
        axios.get("http://dummy.restapiexample.com/api/v1/employees")
             .then(response => {
                 const posts = response.data.slice(0,300);
                 const updatedPosts = posts.map(post => {
                     return {
                         ...post,
                        
                     }
                  
                   });  
                 this.setState({posts:updatedPosts});
                 console.log(response);
             })
             .catch(error => {
                console.log("something is wrong");
            });

    }

    postSelectedHandler = (id, post) => {
        this.setState({selectedPostId: id, selectedPost: post})

    }
    render () {
        const { selectedPost } = this.state;
        const posts = this.state.posts.map((post) => {

            return <Post key={post.id}
                         id={post.id} 
                         employeeName={post.employee_name} 
                         employeeSalary={post.employee_salary} 
                         employeeAge={post.employee_age} 
                         profileImage={post.profile_image} 
                         
                         clicked={() => this.postSelectedHandler(post.id, post)}
                    />
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
                    
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                {selectedPost && <section>
                    <NewPost type={'update'} post={selectedPost}/>
                </section>}
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;