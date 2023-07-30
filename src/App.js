import React, { useReducer, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./components/context/UserContext";
import { QuestionContext } from "./components/context/QuestionsContext";
import http from "./utils/http";
import endpoint from "./constants/endpoint";
import AppRouter from "./AppRouter";
import './Services/Localstorage.js';
import { getCandidateId } from "./Services/Localstorage";
const candidateId = getCandidateId();

function userReducer(state, action) {
  switch (action.type) {
    case "UPDATE_USER":
      http
        .put(
          `${endpoint.UPDATE_CANDIDATE}`.replace(":id", `${candidateId}`),
          action.payload
        )
        .then((res) => {})
        .catch((error) => {
          console.error(error);
        });

      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function questionReducer(state, action) {
  switch (action.type) {
    case "END_TEST":
      if (action.payload.questionAnswer.length) {
        let questionAnswerArr = action.payload.questionAnswer.map((data) => {
          let ans = [];
          data.options.forEach((op) => {
            if (op.value && op.title) {
              ans.push(op.title);
            }
          });
          return {
            questionId: data._id,
            ans: [...ans],
          };
        });
        http.post(`${endpoint.TEST_SUBMIT}`, {
          questionAnswer: questionAnswerArr,
          candidateId: action.payload?.candidateId,
        });
      }
      return [...state];
    default:
      return state;
  }
}

function App() {
  const [newUser, newUserDispatch] = useReducer(userReducer);
  const [question, questionDispatch] = useReducer(questionReducer, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <UserContext.Provider
        value={{
          newUser: newUser,
          newUserDispatch: newUserDispatch,
        }}
      >
        <QuestionContext.Provider
          value={{
            question: question,
            questionDispatch: questionDispatch,
          }}
        >
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <AppRouter />
            </Suspense>
          </BrowserRouter>
        </QuestionContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
