import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import endpoint from "../../constants/endpoint";
import Header from "../common/header/Header";
import http from "../../utils/http";
import {
  clearLocalStorage,
  storeCandidateId,
  storeCurrentPath,
  storeQuizTime,
  storeToken,
} from "../../Services/Localstorage";
const Rejoin = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();

  function handleReJoin() {
    http
      .post(
        `${endpoint.auth.REJOIN_TEST}`
          .replace(":id", `${id}`)
          .replace(":token", `${token}`)
      )
      .then((res) => {
        clearLocalStorage();
        if (res.data.status !== "failed") {
          if (
            JSON.stringify(res.data.quizTimer) !== undefined &&
            JSON.stringify(res.data.quizTimer) !==
              JSON.stringify({ hours: 0, minutes: 0, seconds: 0 })
          ) {
            if (res.data.currentPath !== "/result") {
              storeQuizTime(JSON.stringify(res.data.quizTimer));
              storeToken(res.data.token ? res.data.token : "");
              storeCandidateId(id);
              storeCurrentPath(res.data.currentPath);
              navigate(res.data.token ? res.data.currentPath : "/");
              if (res.data.currentPath === "/quiz") {
                navigate(`/quiz/${res.data.currentQuestionNumber}`);
              }
            } else {
              toast.error("you have already submitted exam");
            }
          } else {
            toast.error("Your Quiz Time is up!");
          }
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Header />
      <div className="flex justify-center pt-6">
        <button
          className="btn btn-primary content-center"
          onClick={handleReJoin}
        >
          Start
        </button>
      </div>
    </>
  );
};

export default Rejoin;
