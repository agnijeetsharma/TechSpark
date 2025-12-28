import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import PostFeedCard from "./PostFeedCard";
import FeaturePost from "./FeaturePost";

import { FiSearch } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [lastPostId, setLastPostId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async (isNewSearch = false) => {
    if (loading || (!hasMore && !isNewSearch)) return;

    setLoading(true);
    try {
      const { data } = await api.get("/post/feed", {
        params: {
          lastPostId: isNewSearch ? undefined : lastPostId,
          limit: 10,
          search: searchQuery.trim(),
        },
      });

      const newPosts = data?.posts || [];
      setPosts((prev) => (isNewSearch ? newPosts : [...prev, ...newPosts]));
      setLastPostId(data?.nextCursor);
      setHasMore(!!data?.nextCursor);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(true);
  }, []);

  useEffect(() => {
    setSearchInput("");
    setSearchQuery("");
    setPosts([]);
    setLastPostId(null);
    setHasMore(true);

    fetchPosts(true);
  }, [location.key, searchQuery]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(searchInput.trim());
    }
  };

  return (
    <div className="flex justify-evenly mt-16">
      <div className="w-full lg:w-2/3 lg:mt-32 mt-12">
        <div className="mb-6 flex ml-28 lg:-mt-28  border-none">
          <div className="relative w-6/7 max-w-md">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search posts by title..."
              className="input input-bordered h-10 w-full pl-10 rounded-full  border-gray-300  focus:outline-none"
            />
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {loading && posts.length === 0 && (
          <div className="flex justify-center items-center h-48">
            <button className="btn btn-square btn-sm text-primary loading"></button>
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center font-bold text-primary text-3xl mt-20">
            No Posts Available
          </div>
        )}

        {posts.map((post, index) => (
          <div key={post._id + index} className="">
            {index > 0 && <div className="divider" />}
            <PostFeedCard post={post} />
          </div>
        ))}

        {hasMore && !loading && posts.length > 0 && (
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={() => fetchPosts()}>
              Load More
            </button>
          </div>
        )}

        {loading && posts.length > 0 && (
          <div className="text-center text-sm text-gray-500 mt-2">
            Loading...
          </div>
        )}
      </div>

      <div className="hidden lg:block w-1/3 mt-7">
        <FeaturePost />
      </div>
    </div>
  );
};

export default PostFeed;
