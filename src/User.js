import { useState } from "react";
import Thumb from "./Thumb";
import UserForm from "./UserForm";

export default function User(props) {
  const {
    email,
    firstName,
    lastName,
    photo,
    children,
    id,
    level,
    onUpdate,
    onDelete
  } = props;
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div
        className="d-flex align-items-center p-3"
        style={{ marginLeft: `${level * 14}px` }}
      >
        <>
          <div className="px-2">{children.length > 0 ? "✚" : "⚊"}</div>

          <Thumb photo={photo} initials={firstName[0] + lastName[0]} />
          <div className="d-flex justify-content-between flex-grow-1 align-items-center px-2">
            <div>
              {firstName} {lastName} {email}
            </div>
            <div className="btn-group btn-group-sm visible-on-parent-hover">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowForm(true)}
              >
                ✎
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => onDelete(id)}
              >
                ✖
              </button>
            </div>
          </div>
        </>
      </div>
      {showForm && (
        <UserForm
          id={id}
          first={firstName}
          last={lastName}
          onClose={() => setShowForm(false)}
          onSubmitForm={() => {
            onUpdate();
            setShowForm(false);
          }}
        />
      )}
    </>
  );
}
