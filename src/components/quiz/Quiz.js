import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { QuestionContext } from "../context/QuestionsContext";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import Questions from "../questions/Questions";
import endpoint from "../../constants/endpoint";
import http from "../../utils/http";
import logo from "../common/header/atharva-brand-logo-dark.png";
import CountdownTimer from "../timer/timer";
import { getCandidateId } from "../../Services/Localstorage";
const candidateId = getCandidateId();

function Quiz() {
  const contextValue = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [testQuestions, setTestQuestions] = useState([]);
  const questionContextValue = useContext(QuestionContext);
  const [question, setQuestion] = useState({});
  const [updateCurrentQuestion, setupdateCurrentQuestion] = useState([]);

  useEffect(() => {
    if (!candidateId) {
      return;
    }
    http
      .get(`${endpoint.TEST_QUESTIONS}`.replace(":id", `${candidateId}`))
      .then((res) => {
        setTestQuestions((testQue) => [
          ...res.data?.candidate.candidateQuestion,
        ]);
        const que =
          res.data?.candidate.candidateQuestion[parseInt(params.id) - 1];
        if (JSON.stringify(params) === "{}") {
          setQuestion({
            ...res.data?.candidate.candidateQuestion[0],
            index: 0,
          });
        } else {
          setQuestion({
            ...res.data?.candidate.candidateQuestion[
              que ? parseInt(params.id) - 1 : 0
            ],
            index: que ? parseInt(params.id) - 1 : 0,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [candidateId]);

  useEffect(() => {
    if (candidateId) {
      if (contextValue?.newUser?.step === "start test") {
        navigate("/start_test");
      } else if (contextValue?.newUser?.step === "quiz") {
        navigate("/quiz");
        if (location.pathname.includes("quiz")) {
          navigate(location.pathname);
        } else {
          navigate("/quiz");
        }
      } else if (contextValue?.newUser?.step === "final") {
        navigate("/result");
      }
    } else navigate("/");
  }, [candidateId, contextValue?.newUser, location.pathname, navigate]);

  const handleQuestion = (id, index) => {
    setQuestion({
      ...testQuestions[index],
      index: index,
    });
    navigate(`/quiz/${index + 1}`);
    http
      .put(`${endpoint.UPDATE_ANS}`.replace(":id", `${candidateId}`), {
        candidateQuestion: question,
        selectedQueIndex: question.index,
        currentQuestionNumber: index + 1,
      })
      .then(() => {
        setupdateCurrentQuestion([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePreQuestion = (id) => {
    let selectedQueIndex = testQuestions.findIndex((data) => data._id === id);
    setQuestion({
      ...testQuestions[selectedQueIndex - 1],
      index: selectedQueIndex - 1,
    });
    navigate(`/quiz/${selectedQueIndex}`);
    http
      .put(`${endpoint.UPDATE_ANS}`.replace(":id", `${candidateId}`), {
        candidateQuestion: updateCurrentQuestion,
        selectedQueIndex: selectedQueIndex,
        currentQuestionNumber: selectedQueIndex,
      })
      .then(() => {
        setupdateCurrentQuestion([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNextQuestion = (id) => {
    let selectedQueIndex = testQuestions.findIndex((data) => data._id === id);
    setQuestion({
      ...testQuestions[selectedQueIndex + 1],
      index: selectedQueIndex + 1,
    });
    navigate(`/quiz/${selectedQueIndex + 2}`);
    http
      .put(`${endpoint.UPDATE_ANS}`.replace(":id", `${candidateId}`), {
        candidateQuestion: updateCurrentQuestion,
        selectedQueIndex: selectedQueIndex,
        currentQuestionNumber: selectedQueIndex + 2,
      })
      .then(() => {
        setupdateCurrentQuestion([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateQuestion = (que) => {
    setQuestion(que);
    let answers = [];
    que.options.map((data) =>
      data?.value && data?.title
        ? answers?.push(data?.title)
        : data?.query
        ? answers?.push(data?.query)
        : null
    );

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
  };

  const handleSubmitTest = (id) => {
    let selectedQueIndex = testQuestions.findIndex((data) => data._id === id);
    http
      .put(`${endpoint.UPDATE_ANS}`.replace(":id", `${candidateId}`), {
        candidateQuestion: updateCurrentQuestion,
        selectedQueIndex: selectedQueIndex,
      })
      .then(() => {
        setupdateCurrentQuestion([]);
      })
      .catch((error) => {
        console.error(error);
      });

    http.put(
      `${endpoint.UPDATE_CURRENT_PATH}?id=${candidateId}&currentPath=${"/quiz"}`
    );

    confirmAlert({
      title: "Are You Sure To Submit The Test ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            http.put(
              `${
                endpoint.UPDATE_CURRENT_PATH
              }?id=${candidateId}&currentPath=${"/result"}`
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
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <>
      <div className="body-bg">
        <div className="bg-full"></div>
        <div className="bg-ef bg-1"></div>
        <div className="bg-ef bg-2"></div>
        <div className="bg-ef bg-3"></div>
        <div className="bg-ef bg-4"></div>
      </div>
      <header className="main-header bg-white/20 border-b border-white py-2 md:py-4">
        <div className="container flex items-center justify-center">
          <div>
            <img
              className="max-h-[25px] md:max-h-[35px]"
              src={logo}
              alt="Atharva System"
            />
          </div>
          <CountdownTimer
            question={question}
            updateCurrentQuestion={updateCurrentQuestion}
          />
        </div>
      </header>
      <main className="main-wrap quiz-main-wrap">
        <div className="container quiz-container">
          <div className="question-box">
            <Questions question={question} updateQuestion={updateQuestion} />
            <div className="pt-10  que-actions">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-start-1 col-end-3">
                  <button
                    id="prev"
                    type="button"
                    disabled={question?._id === testQuestions[0]?._id}
                    onClick={() => handlePreQuestion(question?._id)}
                    className="!px-[15px] md:!px-[30px] !py-[14px] md:!py-[18px] btn btn-dark disabled:opacity-60"
                  >
                    <span className="btn-icon !mr-0">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 24L13.575 22.3875L4.3125 13.125H24V10.875H4.3125L13.575 1.6125L12 0L0 12L12 24Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span className="btn-text hidden md:inline-flex ml-3">
                      prev
                    </span>
                  </button>
                </div>
                <div className="col-end-7 col-span-2">
                  <button
                    type="submit"
                    disabled={
                      question?._id ===
                      testQuestions[testQuestions?.length - 1]?._id
                    }
                    onClick={() => handleNextQuestion(question?._id)}
                    className="!px-[15px] md:!px-[30px] !py-[14px] md:!py-[18px] btn btn-dark ml-3 disabled:opacity-60"
                  >
                    <span className="btn-text hidden md:inline-flex mr-3">
                      next
                    </span>
                    <span className="btn-icon !mr-0 !ml-0">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 12L5.2125 11.1937L9.84375 6.5625H0V5.4375H9.84375L5.2125 0.80625L6 0L12 6L6 12Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="col-start-3 mb-5">
                  <button
                    type="button"
                    className="!px-[15px] md:!px-[30px] !py-[14px] md:!py-[18px]  btn btn-primary"
                    onClick={() => handleSubmitTest(question?._id)}
                  >
                    <span className="btn-text">
                      {question?._id ===
                      testQuestions[testQuestions?.length - 1]?._id
                        ? "Submit"
                        : "End Test"}
                    </span>
                    <span className="btn-icon">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 12L5.2125 11.1937L9.84375 6.5625H0V5.4375H9.84375L5.2125 0.80625L6 0L12 6L6 12Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="question-wrap">
          {testQuestions?.map((que, index) => (
            <div
              key={index}
              onClick={() => handleQuestion(que._id, index)}
              className={
                question?._id === que._id
                  ? "que-menu active"
                  : que.options.some((data) => data.value)
                  ? "que-menu done"
                  : "que-menu"
              }
            >
              <span className="qno-no">{index + 1}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Quiz;
