import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  // callback function to delete question in question item
  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  // fetch to get questions to display
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((questions) => setQuestions(questions))
  }, [])

  // function for patch request for answer change
  // 
  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        correctIndex
      })
    })
    .then((resp) => resp.json())
    .then((resp) => {
      const updatedQuestions = questions.map((question) => {
        if (question.id === resp.id) {
          return resp
        } else {
          return question
        }
      })
      setQuestions(updatedQuestions)
    })
  }

  // maps through questions, return array of each question and render QuetsionItem
  function displayQuestions() {
    return questions.map((item) => {
      return <QuestionItem onAnswerChange={handleAnswerChange} key={item.id} question={item} onDeleteQuestion={handleDeleteQuestion} />
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions()}</ul>
    </section>
  );
}

export default QuestionList;
