import User from "./User";

export default function TreeNode({ node, level, onUpdate, onDelete }) {
  return node.map((item, index) => (
    <>
      {item.children.length > 0 ? (
        <>
          <User
            key={item.id.toString()}
            {...item}
            level={level}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          <TreeNode
            key={item.id.toString() + level}
            node={item.children}
            level={level + 1}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </>
      ) : (
        <User
          key={item.id.toString()}
          {...item}
          level={level}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
    </>
  ));
}
