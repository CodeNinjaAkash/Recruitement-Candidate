function Questions(props) {

  const handleOnChangeCheckbox = (selectedIndex, e) => {
    let options = props.question.options;
    options[selectedIndex].value = e.target.checked;

    let question = {
      ...props.question,
      options: options,
    };
    props.updateQuestion(question);
  };

  const handleOnChangeRadio = (selectedIndex, e) => {
    let options = props.question.options;
    options.map(
      (data) => (data.value = data.title === e.target.value ? true : false)
    );

    let question = {
      ...props.question,
      options: options,
    };
    props.updateQuestion(question);
  };

  const handleOnChangeQuery = (index, e, id) => {
    let options = props.question.options;
    options.map((data) => {
      data.query = e.target.value;
      return (data.value = data.query ? true : false);
    });

    let question = {
      ...props.question,
      options: options,
    };
    props.updateQuestion(question);
  };

  return (
    <>
      <div className="question-list-main">
        <div className="que-no">
          {props.question && String(props.question.index + 1)}
        </div>
        <div className="que-line">
          <h3>{props.question?.question}</h3>
        </div>
        {props.question?.marks ? (
          <div className="q-marks">Marks: {props.question?.marks}</div>
        ) : null}
        <div className="que-options">
          <div className="grid grid-cols-12 gap-4">
            {props.question?.options?.map((option, index) => {
              return (
                <div
                  className={
                    props.question?.optionType === "Query"
                      ? "col-span-12 sm:col-span-12"
                      : "col-span-12 sm:col-span-6"
                  }
                  key={`${index}-${props.question?._id}`}
                >
                  <div className="que-option">
                    {props.question?.optionType === "Multiple" ? (
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}-${props.question?._id}`}
                        name={option?.title}
                        checked={option?.value}
                        onChange={(e) => handleOnChangeCheckbox(index, e)}
                      />
                    ) : props.question?.optionType === "Query" ? (
                      <textarea
                        id={`custom-checkbox-${index}-${props.question?._id}`}
                        name={option?._id}
                        defaultValue={option?.query}
                        onChange={(e) =>
                          handleOnChangeQuery(index, e, option._id)
                        }
                      ></textarea>
                    ) : (
                      <input
                        type="radio"
                        value={option?.title}
                        id={`custom-checkbox-${index}-${props.question?._id}`}
                        name={option?.title}
                        checked={option?.value}
                        onChange={(e) => handleOnChangeRadio(index, e)}
                      />
                    )}
                    {props.question?.optionType !== "Query" && <span></span>}
                    {props.question?.optionType !== "Query" && (
                      <label
                        htmlFor={`custom-checkbox-${index}-${props.question?._id}`}
                      >
                        {option?.title}
                      </label>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Questions;
