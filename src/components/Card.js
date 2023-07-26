import React from "react";
import { ImBin } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteGoals } from "../redux/features/goal.slice";

const Card = ({ goal, toggleEditModal, setCurrentGoal }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteGoals({ goalID: id, token: token }));
  };

  const handleUpdate = (goal) => {
    setCurrentGoal(goal);
    toggleEditModal();
  };

  return (
    <div className="border p-2 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-base md:text-xl">{goal?.content}</h1>
        <p
          className={`text-sm md:text-base text-white rounded-md px-3 py-1 capitalize bg-green-500`}
        >
          {goal?.priority}
        </p>
      </div>
      <div className="flex items-center gap-5 my-5 text-2xl w-full justify-between">
        <button
          onClick={() => handleUpdate(goal)}
          className="bg-yellow-500 rounded-full text-white p-2"
        >
          <AiFillEdit />
        </button>
        <button
          onClick={() => handleDelete(goal?._id)}
          className="bg-red-500 rounded-full text-white p-2"
        >
          <ImBin />
        </button>
      </div>
    </div>
  );
};

export default Card;
