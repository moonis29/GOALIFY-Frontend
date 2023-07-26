import React from "react";
import ReactModal from "react-modal";
import { RxCross1 } from "react-icons/rx";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createGoals } from "../../redux/features/goal.slice";

ReactModal.setAppElement("#react-modal-portal");

const AddGoalModal = ({ isModalOpen, toggleModal }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      content: "",
      priority: "low",
    },
    onSubmit: function (values) {
      console.log(values);
      dispatch(createGoals({ goalObj: values, token: token }));
      toggleModal();
    },
  });
  return (
    <div>
      <ReactModal isOpen={isModalOpen} onRequestClose={toggleModal}>
        <div className="w-fit ms-auto">
          <button
            onClick={toggleModal}
            className="w-fit bg-red-500 text-white rounded-full p-3"
          >
            <RxCross1 />
          </button>
        </div>
        <form className="" onSubmit={formik.handleSubmit}>
          <div className="my-2 flex flex-col gap-2">
            <label htmlFor="content" className="font-medium text-xl">
              Content
            </label>
            <input
              id="content"
              className="border p-2 rounded-md outline-0"
              placeholder="Enter Content"
              value={formik.values.content}
              onChange={formik.handleChange}
              name="content"
            />
          </div>
          <div className="my-2 flex flex-col gap-2">
            <label htmlFor="priority" className="font-medium text-xl">
              Priority
            </label>
            <select
              id="priority"
              className="border p-2 rounded-md outline-0"
              value={formik.values.priority}
              onChange={formik.handleChange}
              name="priority"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="my-2 flex flex-col gap-2">
            <button
              type="submit"
              className="bg-blue-500 py-3 rounded-md text-white"
            >
              Add Goal
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
};

export default AddGoalModal;
