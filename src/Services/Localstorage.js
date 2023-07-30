const storeCandidateId = (value) => {
  localStorage.setItem("candidate", value);
};

const getCandidateId = () => {
  let candidateId = localStorage.getItem("candidate");
  return candidateId;
};

const storeToken = (value) => {
  localStorage.setItem("token", value);
};

const getToken = () => {
  let token = localStorage.getItem("token");
  return token;
};

const storeCurrentPath = (value) => {
  localStorage.setItem("currentPath", value);
};

const getCurrentPath = () => {
  let currentPath = localStorage.getItem("currentPath");
  return currentPath;
};

const storeQuizTime = (value) => {
  localStorage.setItem("quizTimer", value);
};

const getQuizTime = () => {
  let quizTimer = localStorage.getItem("quizTimer");
  return quizTimer;
};

const clearLocalStorage = () => {
  localStorage.clear();
};

export {
  storeCandidateId,
  getCandidateId,
  storeToken,
  getToken,
  storeCurrentPath,
  getCurrentPath,
  storeQuizTime,
  getQuizTime,
  clearLocalStorage,
};
