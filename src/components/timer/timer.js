import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { QuestionContext } from "../context/QuestionsContext";
import http from "../../utils/http";
import endpoint from "../../constants/endpoint";
import { getCandidateId, storeQuizTime, getQuizTime } from "../../Services/Localstorage";

function CountdownTimer({ question }) {
  let initialTimer = { hours: 0, minutes: 59, seconds: 59 };
  const [timer, setTimer] = useState(initialTimer);
  const contextValue = useContext(UserContext);
  const questionContextValue = useContext(QuestionContext);
  const navigate = useNavigate();
  const [updateCurrentQuestion, setupdateCurrentQuestion] = useState([]);
  const [testQuestions, setTestQuestions] = useState([]);
  const [questionId, setquestionId] = useState(question._id);
  const [questionNum, setquestionNum] = useState(0);
  const [isSubmit, setisSubmit] = useState(false);
  let params = useParams();
  const candidateId = getCandidateId();

  useEffect(() => {
    http
      .get(`${endpoint.TEST_QUESTIONS}`.replace(':id', `${candidateId}`))
      .then((res) => {
        setTestQuestions((testQue) => [...res.data?.candidate.candidateQuestion]);
      });
  }, [question?._id]);

  useEffect(() => {
    if (params.id === undefined) {
      params.id = 1;
    }
    setquestionNum(params.id);
    setquestionId(question._id);
    let newTestQuestions = testQuestions.map((obj) => {
      if (obj?._id === question?._id) {
        setupdateCurrentQuestion(obj);
        return {
          ...obj,
          options: question?.options,
        };
      }
      return obj;
    });
    setTestQuestions(newTestQuestions);
    if (isSubmit) {
      handleEndTest(questionId);
    }
  }, [question._id, question?.options, questionId, questionNum, timer]);

  const handleEndTest = (id) => {
    http
      .put(`${endpoint.UPDATE_ANS}`.replace(':id', `${candidateId}`), {
        candidateQuestion: updateCurrentQuestion,
        selectedQueIndex: question.index,
      })
      .then(() => {
        setupdateCurrentQuestion([]);
        http.put(
          `${endpoint.UPDATE_CURRENT_PATH}?id=${candidateId}&currentPath=${'/result'}`
          );
        questionContextValue.questionDispatch({
          type: "END_TEST",
          payload: {
            candidateId: candidateId,
            questionAnswer: [...testQuestions],
          },
        });
        contextValue.newUserDispatch({
          type: "UPDATE_USER",
          payload: { step: "final" },
        });
        navigate(`/result`);
        setTimeout(() => {
          localStorage.clear()
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      http.post(`${endpoint.UPDATE_TIME}`, {
        quizTimer: JSON.parse(getQuizTime()),
        id: candidateId,
      });
    }, 1000);
  }, []);

  useEffect(() => {
    const storedTimer = JSON.parse(getQuizTime());
    let intervalId;

    const startTimer = () => {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          let newTimer = {
            hours: prevTimer.hours,
            minutes: prevTimer.minutes,
            seconds: prevTimer.seconds - 1,
          };

          if (newTimer.seconds < 0) {
            newTimer = {
              hours: newTimer.hours,
              minutes: newTimer.minutes - 1,
              seconds: 59,
            };
          }

          if (newTimer.minutes < 0) {
            newTimer = {
              hours: newTimer.hours - 1,
              minutes: 59,
              seconds: 59,
            };
          }

          if (newTimer.hours < 0) {
            newTimer = {
              hours: 0,
              minutes: 0,
              seconds: 0,
            };
            clearInterval(intervalId);
            setisSubmit(true);
          }
          storeQuizTime(JSON.stringify(newTimer))
          return newTimer;
        });
      }, 1000);
    };

    if (
      contextValue?.newUser?.step !== "start test" ||
      contextValue?.newUser?.step !== "result"
    ) {
      if (storedTimer) {
        setTimer(storedTimer);
      } else {
        setTimer(initialTimer);
      }
      if (navigator.onLine) {
        startTimer();
      }
    } else {
      clearInterval(intervalId);
    }

    const handleOnline = () => {
      if (
        contextValue?.newUser?.step !== "start test" ||
        contextValue?.newUser?.step !== "result"
      ) {
        startTimer();
      }
    };

    const handleOffline = () => {
      clearInterval(intervalId);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [contextValue?.newUser?.step]);

  return (
    <div>
      {(contextValue?.newUser?.step !== "start test" ||
        contextValue?.newUser?.step !== "result") && (
        <>
          <div className="bg-blue-500 rounded-md absolute  top-3 right-5 p-2">
            <p className="text-xl">
              {timer.hours.toString().padStart(2, "0")}:
              {timer.minutes.toString().padStart(2, "0")}:
              {timer.seconds.toString().padStart(2, "0")}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default CountdownTimer;
