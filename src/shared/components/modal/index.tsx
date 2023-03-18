import React from "react";

const Modal: React.FC<{
  label: string;
  title: string;
  children: React.ReactNode;
  id: string;
  closeTitle: string;
}> = ({ label, title, children, id, closeTitle }) => {
  return (
    <>
      <label htmlFor={id} className="btn-primary btn-sm btn normal-case">
        {label}
      </label>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box  !rounded-none">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="py-4">{children}</p>
          <div className="modal-action">
            <label htmlFor={id} className="btn">
              {closeTitle}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
