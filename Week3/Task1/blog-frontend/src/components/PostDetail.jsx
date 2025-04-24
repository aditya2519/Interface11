import { useState, useEffect } from "react";
import API from "../api";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.created_at}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
};

export default PostDetail;
