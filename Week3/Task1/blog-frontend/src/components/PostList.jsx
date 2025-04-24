import { useState, useEffect } from "react";
import API from "../api";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get("/posts", {
          params: { page, per_page: perPage, search, sort },
        });
        setPosts(data.posts);
        setTotalPages(data.pages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [page, search, sort]);

  return (
    <div className="fade-in">
      <h1>Blog Posts</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={sort}
          onChange={(e) => {
            setPage(1);
            setSort(e.target.value);
          }}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        <Link to="/new" className="btn create-btn">
          Create New Post
        </Link>
      </div>

      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-item">
              <h3>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h3>
              <p>{new Date(post.created_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>

      <div className="pagination">
        <button
          className="btn pagination-btn"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page <= 1}
        >
          Previous
        </button>

        <span className="page-info">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn pagination-btn"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
