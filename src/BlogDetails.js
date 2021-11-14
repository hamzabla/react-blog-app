import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";

const BlogDetails = () => {
   
    const { id } = useParams();
    const { data: blog,error,isPending } = useFetch('http://localhost:8000/blogs/'+id);
    const history = useHistory();
   
    const handleClick = () =>{
       fetch('http://localhost:8000/blogs/'+id,{
           method: 'Delete', 
       }).then( () =>{
           history.push('/');
       })
    }
    return ( 
        <div className="blog-details">
            {isPending && <div>Loading..</div>}
            {error && <div>{error}</div>}
            {blog && (
            <article>
                <h2>{blog.title}</h2>
                <p><strong>Written by {blog.author}</strong></p>
                <div>{blog.body}</div>
                <button onClick={handleClick}>Delete</button>
            </article>
            )}
        </div>
     );
}
 
export default BlogDetails;