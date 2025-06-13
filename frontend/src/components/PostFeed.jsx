import { useEffect, useState } from "react";
import PostFeedCard from "./PostFeedCard";
import { Base_URL } from "../constant";
import axios from "axios";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [lastPostId, setLastPostId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`${Base_URL}/post/feed`, {
        params: {
          lastPostId: lastPostId || undefined,
          limit: 10,
        },
        withCredentials: true,
      });

      const newPosts = data?.posts || [];

      setPosts((prev) => [...prev, ...newPosts]);
      setLastPostId(data?.nextCursor);
      if (!data?.nextCursor) setHasMore(false);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (loading || !hasMore) return;
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button className="btn btn-square btn-sm text-primary loading"></button>
      </div>
    );
  }

  if (posts?.length === 0) {
    return (
      <div className="text-center font-bold text-primary text-3xl mt-44">
        No Posts Available
      </div>
    );
  }

  return (
    <div className="">
      {posts.map((post, index) => (
        <div key={post._id+index} className="mb-6">
          {index > 0 && <div className="divider" key={post._id}></div>}
          <PostFeedCard key={index+post._id} post={post}  />
        </div>
      ))}
      {loading && <p>Loading more posts...</p>}
    </div>
  );
};

export default PostFeed;
