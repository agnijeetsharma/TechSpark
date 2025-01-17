const FeedCard = ({ user }) => {
  const { username } = user;
  return (
    <div className="card bg-base-300 w-56 sm:w-64 lg:w-72 mx-auto shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{username}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-between">
          <button className="btn btn-primary">Interseted</button>
          <button className="btn btn-primary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
