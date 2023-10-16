import React from "react";

const Modal = (props) => {
  return (
    <div className="container_modal">
      <div className=" mx-2 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() =>
                  props?.setDataModal && props?.setDataModal(false)
                }
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
              <p className="my-4 text-xl font-semibold">
                {props?.dataModal?.title ?? ""}
              </p>
              <p className="my-0">{props?.dataModal?.description ?? ""}</p>
              {props?.children ? (
                <div className="modal_container-body">{props?.children}</div>
              ) : null}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end gap-2 py-2 px-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="tracking-wide capitalize rounded-md text-red-500 hover:text-white hover:bg-red-500 background-transparent font-bold px-6 py-2 outline-none focus:outline-none transition-all"
                type="button"
                onClick={() => {
                  props?.closeOptions && props?.closeOptions(undefined);
                  props?.setDataModal && props?.setDataModal(false);
                }}
              >
                {props?.dataModal?.cancelBtnText ?? "cancelar"}
              </button>
              <button
                onClick={() => {
                  props?.handleDelete && props?.handleDelete();
                  props?.setDataModal && props?.setDataModal({ show: false });
                }}
                className="btn capitalize flex justify-end py-2 px-6 bg-teal-500  text-white rounded-md font-semibold tracking-wide shadow-black pointer hover:bg-teal-400 hover:shadow-md transition-all"
              >
                {props?.dataModal?.confirmBtnText ?? "confirmar"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default Modal;
