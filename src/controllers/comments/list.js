const listComment = async (req, res) => {
  const {
    db: { Comment },
    params: { id },
  } = req;
  console.log("this data here", id);

  const commented = await Comment.listComment(id);
  // session.userId = user.id;

  res.send(commented);
};

module.exports = listComment;
