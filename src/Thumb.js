export default function Thumb({ photo, initials }) {
  function onImageLoadError(e) {
    e.target.onerror = null;
    e.target.alt = "Error";
  }

  return (
    <>
      {photo ? (
        <div className="avatar">
          <img
            className="inner rounded-circle border mr-2"
            alt=""
            src={photo}
            onError={onImageLoadError}
          />
        </div>
      ) : (
        <div className="avatar d-flex justify-content-center align-items-center text-uppercase rounded-circle border mr-2">
          <div className="">{initials}</div>
        </div>
      )}
    </>
  );
}
