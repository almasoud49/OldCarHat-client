
const Blog = ({blog}) => {
    
    return (
<details className="collapse ">
  <summary className="collapse-title text-xl font-medium">{blog.question}</summary>
  <div className="collapse-content"> 
    <p>{blog.
answer}</p>
  </div>
</details>
    );
};

export default Blog;