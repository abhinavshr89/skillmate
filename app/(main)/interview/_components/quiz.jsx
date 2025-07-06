import React from "react";
import { generateQuiz } from "@/actions/interview";
import useFetch from "@/hooks/use-fetch";
import { useState } from "react";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  return <div>Quiz</div>;
}

export default Quiz;
