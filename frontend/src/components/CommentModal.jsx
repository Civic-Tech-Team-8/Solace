import { useContext, useEffect, useState } from "react";
import "./Modal.css";
import CurrentUserContext from "../contexts/current-user-context";

export default function CommentModal({ data, closeButton }) {
  const [comments, setComments] = useState("");
  const [eventComments, setEventComments] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  const inputValue = document.querySelector(".inputValue");
  console.log(currentUser);
  const eventId = data.id.replace(/\D/g, "").slice(10, 17);
  console.log("I WANT TO SEE", data.id.replace(/\D/g, "").slice(10, 17));
  useEffect(() => {
    async function getData(eventId) {
      const response = await fetch(`/api/userscomment/${eventId}`);
      const commentData = await response.json();
      console.log(commentData);
      setEventComments(commentData);
    }
    getData(eventId);
  }, []);

  const postComment = async (e) => {
    const res = await fetch("/api/userscomment", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventId, comments }),
    });

    const newData = await res.json();
    newData.username = currentUser.username;
    const commentArr = [...eventComments];
    // console.log(commentArr, "HII");x
    commentArr.push(newData);
    setEventComments(commentArr);
    inputValue.value = "";
  };

  // const getCommentData = async (eventId) => {
  //   const response = await fetch(`/api/userscomment/${eventId}`);
  //   const commentData = await response.json();
  //   console.log(commentData);
  // };
  // console.log(eventComments, "HIII");
  const changeInput = (e) => {
    setComments(e.target.value);
  };
  return (
    <>
      <div className="container">
        {eventComments.map((each) => {
          console.log(each.username, "HII");
          return (
            <p key={crypto.randomUUID()}>
              {each.username + ":" + each.comments}
            </p>
          );
        })}
      </div>
      <input
        className="inputValue"
        type="text"
        name="comment"
        id=""
        onChange={changeInput}
      />
      <button className="send-modal" onClick={postComment}>
        SEND
      </button>
      <button onClick={closeButton} className="close-modal">
        ClOSE
      </button>
    </>
  );
}
