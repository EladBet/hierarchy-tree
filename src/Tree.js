import { useEffect, useState, useCallback } from "react";
import { fetchData, url, getUsersByManager, findChildrenByNode } from "./utils";
import TreeNode from "./TreeNode";
import User from "./User";

export default function Tree() {
  const [users, setUsers] = useState([]);
  const [rawUsers, setRawUsers] = useState([]);
  const getUsers = useCallback(async () => {
    try {
      const res = await fetchData(`${url}/users.json`);
      const filteredResult = res.filter((item) => item);

      setRawUsers(res);

      const usersByManager = getUsersByManager(filteredResult);

      setUsers(usersByManager);
    } catch (e) {
      console.log("Tree error");
      throw e;
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  async function onDelete(userId) {
    let managerChildren = findChildrenByNode(users, userId);

    const usersIndexToDelete = managerChildren.map((id) =>
      rawUsers.findIndex((user) => user && user.id === id)
    );
    try {
      await Promise.all(
        usersIndexToDelete.map((index) =>
          fetchData(`${url}/users/${index}.json`, null, true)
        )
      );
      await getUsers();
    } catch (e) {
      console.log("Error deleting");
    }
  }

  return users.map((item, index) => (
    <>
      {item.children.length > 0 ? (
        <>
          <User
            key={item.id.toString()}
            {...item}
            level={0}
            onUpdate={getUsers}
            onDelete={onDelete}
          />
          <TreeNode
            key={item.id.toString() + 0}
            node={item.children}
            level={1}
            onUpdate={getUsers}
            onDelete={onDelete}
          />
        </>
      ) : (
        <User
          key={item.id.toString()}
          {...item}
          level={0}
          onUpdate={getUsers}
          onDelete={onDelete}
        />
      )}
    </>
  ));
}
