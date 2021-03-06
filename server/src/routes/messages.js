import { v4 } from "uuid";
import { readDB, writeDB } from "../dbController.js";

const getMsgs = () => readDB("messages");
const setMsgs = (data) => writeDB("messages", data);

const messagesRoute = [
  {
    // GET MESSAGES
    method: "get",
    route: "/messages",
    handler: ({ query: { cursor = "" } }, res) => {
      const msgs = getMsgs();
      const fromIndex = msgs.findIndex((msg) => msg.id === cursor) + 1;
      res.send(msgs.slice(fromIndex, fromIndex + 15));
    },
  },
  {
    // GET DETAIL MESSAGES
    method: "get",
    route: "/messages/:id",
    handler: ({ params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const msg = msgs.find((msg) => msg.id === id);
        if (!msg) throw Error("Not Found");

        res.send(msg);
      } catch (err) {
        res.status(404).send({ error: err });
      }
    },
  },
  {
    // POST MESSAGES
    method: "post",
    route: "/messages",
    handler: ({ body }, res) => {
      const msgs = getMsgs();
      const newMsgs = {
        id: v4(),
        text: body.text,
        userId: body.userId,
        timestamp: Date.now(),
      };
      msgs.unshift(newMsgs);
      setMsgs(msgs);
      res.send(newMsgs);
    },
  },
  {
    // PUT MESSAGES
    method: "put",
    route: "/messages/:id",
    handler: ({ body, params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메시지가 없습니다.";
        if (msgs[targetIndex].userId !== body.userId)
          throw "사용자가 다릅니다.";

        const updateMsg = { ...msgs[targetIndex], text: body.text };
        msgs.splice(targetIndex, 1, updateMsg);
        setMsgs(msgs);
        res.send(updateMsg);
      } catch (err) {
        res.status(500).send({ error: err });
      }
    },
  },
  {
    // DELETE MESSAGES
    method: "delete",
    route: "/messages/:id",
    handler: ({ query: { userId }, params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        console.log(" msgs[targetIndex].userId >>> ", msgs[targetIndex].userId);
        console.log("userId >>> ", userId);
        if (targetIndex < 0) throw "메시지가 없습니다.";
        if (msgs[targetIndex].userId !== userId) throw "사용자가 다릅니다.";

        msgs.splice(targetIndex, 1);
        setMsgs(msgs);
        res.send(id);
      } catch (err) {
        res.status(500).send({ error: err });
      }
    },
  },
];

export default messagesRoute;
