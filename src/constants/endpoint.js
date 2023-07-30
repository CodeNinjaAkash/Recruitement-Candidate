const ROUTES = {
  auth: {
    REJOIN_TEST: `/api/v1/auth/rejoin-by-link/:id/:token`,
    CREATE_CANDIDATE: `/api/v1/auth/create-candidate`,
  },
  UPDATE_CANDIDATE: `/api/v1/users/update-candidate/:id`,
  TEST_QUESTIONS: `/api/v1/users/test-questions/:id`,
  UPDATE_ANS: `/api/v1/users/update-ans/:id`,
  COLLEGES: `/api/v1/users/colleges`,
  UPDATE_CURRENT_PATH: `/api/v1/users/update-currentPath`,
  TEST_SUBMIT: `/api/v1/users/submit-test`,
  UPDATE_TIME: `/api/v1/users/update-time`,
};

export default ROUTES;
