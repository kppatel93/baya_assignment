import React, { useEffect, useState } from "react";
import { Input, Spin } from "antd";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import "./Comments.css";

const { TextArea } = Input;

export default function Comments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getComments = () => {
    setLoading(true);
    axios
      .get("https://660e46cf6ddfa2943b36408e.mockapi.io/comments")
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  const masterButtonAction = (id, actionName) => {
    const updatedData = data.map((d) => {
      if (id === d.id) {
        if (actionName === 'like') {
          d.like = !d.like;
        d.dislike = false;
        } else if (actionName === 'dislike') {
          d.dislike = !d.dislike;
          d.like = false;
        } else if (actionName === 'edit_comment') {
            d.editComments = true;
        } else if (actionName === 'save_cancel_action') {
          d.editComments = false;
        }
      }
      return d;
    });

    setData(updatedData);

  }

  const onInputChange = (e, id) => {
    e.preventDefault();
    const updatedData = data.map((d) => {
      if (Number(id) === Number(d.id)) {
        d.comments = e.target.value;
      }
      return d;
    });
    setData(updatedData);
  };

  return (
    <div className="comments-container">
      <Spin spinning={loading} size="large" />
      {data?.length
        ? data.map((d, index) => {
            return (
              <div key={index} className="comment-section">
                <div className="top-section">
                  <img src={d.avatar} alt="img" className="user-img" />
                  <p className="user-name">{d.name}</p>
                </div>
                <div className="middle-section">
                  {d.editComments ? (
                    <div>
                      <TextArea
                        defaultValue={d.comments}
                        onChange={(e) => onInputChange(e, d.id)}
                        value={d.comments}
                        style={{marginTop: "20px"}}
                        rows={3}
                      />
                      <button
                        className="btn cancel-btn"
                        onClick={() => masterButtonAction(d.id, 'save_cancel_action')}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn save-btn"
                        onClick={() => masterButtonAction(d.id, 'save_cancel_action')}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p>{d.comments}</p>
                  )}
                </div>

                <div className="bottom-section">
                  {!d.editComments ? (
                    <div>
                      <FaRegEdit
                        className="edit-icon"
                        onClick={() => masterButtonAction(d.id, 'edit_comment')}
                      />
                      {d.like ? (
                        <BiSolidLike
                          className="btn"
                          color="green"
                          size="18"
                          onClick={() => masterButtonAction(d.id, 'like')}
                        />
                      ) : (
                        <BiLike
                          className="btn"
                          color="green"
                          size="18"
                          onClick={() => masterButtonAction(d.id, 'like')}
                        />
                      )}

                      {d.dislike ? (
                        <BiSolidDislike
                          className="btn"
                          color="red"
                          size="18"
                          onClick={() => masterButtonAction(d.id, 'dislike')}
                        />
                      ) : (
                        <BiDislike
                          className="btn"
                          color="red"
                          size="18"
                          onClick={() => masterButtonAction(d.id, 'dislike')}
                        />
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
