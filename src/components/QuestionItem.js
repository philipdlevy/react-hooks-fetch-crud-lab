import React from "react";

function QuestionItem({ question, onDeleteQuestion, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

    // fetch request to delete question
  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE", 
    })
    .then((resp) => resp.json())
    .then(() => onDeleteQuestion(question))
  }
  // handle answer change 
  function handleAnswerChange(e) {
    onAnswerChange(id, parseInt(e.target.value))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
