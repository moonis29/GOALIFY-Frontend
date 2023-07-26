import React, { useState, useEffect } from "react";
import AddGoalModal from "../../components/Modal/AddGoalModal";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllGoals } from "../../redux/features/goal.slice";
import Card from "../../components/Card";
import DashboardHeader from "./DashboardHeader";
import EditGoalModal from "../../components/Modal/EditGoalModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const { goals, isLoading } = useSelector((state) => state.goal);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      dispatch(getAllGoals(token));
    }
  }, [user, navigate]);

  return (
    <>
      <div className="w-[90%] container mx-auto">
        <DashboardHeader toggleModal={toggleModal} />
        <div>
          <h1 className="text-2xl">All Goals</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 my-3">
            {isLoading ? (
              <div>
                <h1>Loading...</h1>
              </div>
            ) : (
              goals?.map((goal, idx) => {
                return (
                  <Card
                    key={idx}
                    goal={goal}
                    toggleEditModal={toggleEditModal}
                    setCurrentGoal={setCurrentGoal}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      <AddGoalModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      <EditGoalModal
        isModalOpen={isEditModalOpen}
        toggleModal={toggleEditModal}
        currentGoal={currentGoal}
      />
    </>
  );
};

export default Dashboard;
