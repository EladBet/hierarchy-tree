import { useState } from "react";
import { url, fetchData } from "./utils";

export default function UserForm({ id, first, last, onClose, onSubmitForm }) {
  const [firstName, setFirstName] = useState(first);
  const [lastName, setLastName] = useState(last);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return firstName && lastName;
  }

  async function onSubmit() {
    try {
      setIsLoading(true);
      const users = await fetchData(`${url}/users.json`);
      const userIndex = users.findIndex((user) => user && user.id === id);
      await fetchData(`${url}/users/${userIndex}/firstName.json`, firstName);
      await fetchData(`${url}/users/${userIndex}/lastName.json`, lastName);
      onSubmitForm();
    } catch (error) {
      setError("Save operations failed");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form className="border p-3">
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          type="text"
          value={firstName}
          className="form-control"
          onChange={(event) => setFirstName(event.target.value)}
        />
        {!firstName && (
          <small className="form-text text-muted">This field is required</small>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          value={lastName}
          className="form-control"
          onChange={(event) => setLastName(event.target.value)}
        />
        {!lastName && (
          <small className="form-text text-muted">This field is required</small>
        )}
      </div>
      {error && (
        <div className="mb-3">
          <span className="text-danger">{error}</span>
        </div>
      )}
      <button
        type="submit"
        className={`btn btn-primary`}
        onClick={(e) => {
          e.preventDefault();
          if (validateForm()) {
            onSubmit();
          }
        }}
      >
        {isLoading && <span className="spinner-border spinner-border-sm" />}
        Submit
      </button>
      <button
        type="submit"
        className="btn btn-light"
        onClick={(e) => {
          e.preventDefault();
          onClose(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
}
