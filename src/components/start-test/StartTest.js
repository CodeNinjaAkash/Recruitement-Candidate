import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import endpoint from '../../constants/endpoint'
import Header from "../common/header/Header";
import http from "../../utils/http";
import { getCandidateId } from "../../Services/Localstorage";
const candidateId = getCandidateId();

function StartTest() {
  const navigate = useNavigate();
  const contextValue = useContext(UserContext);

  useEffect(() => {
    if (candidateId) {
      if (contextValue?.newUser?.step === "quiz") {
        navigate("/quiz");
      } else if (contextValue?.newUser?.step === "final") {
        navigate("/result");
      }
    } else navigate("/");
  }, [contextValue?.newUser?.step, navigate]);

  const handleStartTest = () => {
    http
      .put(
        `${endpoint.UPDATE_CURRENT_PATH}?id=${candidateId}&currentPath=${'/quiz'}`
      )
      .then(() => {});
    const addDetails = {
      step: "quiz",
    };
    contextValue.newUserDispatch({ type: "UPDATE_USER", payload: addDetails });
    navigate(`/quiz`);
  };

  return (
    <>
      <Header />
      <main className="main-wrap pb-7">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h3 className="card-header-title">
                Instructions For Aptitude Test
              </h3>
            </div>
            <div className="card-body">
              <ul className="list-type m-0 p-0">
                <li>30 Question asked for an aptitude test</li>
                <li>45 minutes for aptitude test</li>
                <li>One mark for each correct answer</li>
                <li>No negative marking</li>
                <li>
                  In mulitiple choice questions select only needed answers
                </li>
              </ul>
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleStartTest}
                >
                  <span className="btn-text">Start Test</span>
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
      </main>
    </>
  );
}

export default StartTest;
