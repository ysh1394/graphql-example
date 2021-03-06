import styled from "styled-components";
import MsgInput from "./MsgInput";

const MsgItem = ({
  id,
  userId,
  timestamp,
  text,
  onUpdate,
  isEditing,
  startEdit,
  doneEdit,
  onDelete,
  myId,
  serverUser,
}) => {
  console.log("serverUser >>", serverUser);

  return (
    <List>
      <h3>
        {`${serverUser?.nickname} (${serverUser?.id})`}
        <sub>
          {new Date(timestamp).toLocaleString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </sub>
      </h3>
      {isEditing ? <MsgInput mutate={onUpdate} text={text} id={id} /> : text}

      {myId === userId ? (
        <ButtonWrapper>
          <button onClick={isEditing ? doneEdit : startEdit}>
            {" "}
            {isEditing ? "취소" : "수정"}
          </button>
          <button onClick={onDelete}>삭제</button>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <span>동일한 아이디만 수정 가능합니다.</span>
        </ButtonWrapper>
      )}
    </List>
  );
};

const ButtonWrapper = styled.div`
  display: none;
  position: absolute;
  text-align: right;
  right: 10px;
  bottom: 10px;

  span {
    font-size: 12px;
  }
`;

const List = styled.li`
  position: relative;
  margin: 10px 0;
  padding: 15px 15px 5px;
  border-radius: 5px;
  border: solid 1px #aaa;
  h3 {
    font-size: 0.85em;
    margin: 0 0 10px;
  }
  sub {
    font-weight: normal;
    margin-left: 5px;
    vertical-align: baseline;
  }
  p {
    margin: 10px 0;
  }

  &:hover {
    ${ButtonWrapper} {
      display: block;
    }
  }
`;

export default MsgItem;
