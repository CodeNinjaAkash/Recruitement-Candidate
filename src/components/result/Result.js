import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Header from "../common/header/Header";
import { getCandidateId } from "../../Services/Localstorage";
const candidateId = getCandidateId();

function Result() {
  const contextValue = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (candidateId) {
      if (contextValue?.newUser?.step === "start test") {
        navigate("/start_test");
      } else if (contextValue?.newUser?.step === "quiz") {
        navigate("/quiz");
      }
    } else navigate("/");
  }, [contextValue?.newUser?.step, navigate]);

  useEffect(() => {
    if (
      candidateId
    ) {
      contextValue.newUserDispatch({
        type: "UPDATE_USER",
        payload: { step: "final" },
      });
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="shadow bg-white px-5 py-14 text-center my-12 mx-auto max-w-[700px] rounded-2xl">
          <div className="w-[100px] h-[100px] flex mx-auto bg-green-100 rounded-full items-center justify-center text-black mb-5 border border-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
              <path
                fill="currentColor"
                d="M35.8 42H13.6V16.4L27.5 2l1.95 1.55q.3.25.45.7.15.45.15 1.1v.5L27.8 16.4h14.95q1.2 0 2.1.9.9.9.9 2.1v4.1q0 .35.075.725t-.075.725l-6.3 14.5q-.45 1.05-1.475 1.8Q36.95 42 35.8 42Zm-19.2-3h19.85l6.3-14.95V19.4H24.1l2.65-12.45-10.15 10.7Zm0-21.35V39Zm-3-1.25v3H6.95V39h6.65v3H3.95V16.4Z"
              />
            </svg>
          </div>
          <h4 className="text-green-600 text-[30px] font-[600] leading-tight">
            Thank You For Showing Interest
            <br />
            Have a Look Around Our Website
          </h4>
          <hr />
          <a
            className="text-red-500"
            href="https://www.atharvasystem.com"
            target="_blank"
            rel="noreferrer"
          >
            www.atharvasystem.com
          </a>
        </div>
      </div>
    </>
  );
}

export default Result;
