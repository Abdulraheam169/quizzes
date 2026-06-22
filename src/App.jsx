import { useState } from "react";
import quisesData from "./quises.json";
import Qus from "./Qus";

export default function App() {
  const [questions, setQuestions] = useState(quisesData);
  const [result, setResult] = useState(false);

  let finished =
    questions.every((question) => question.choosen === true) ||
    questions.filter((question) => question.display)[0].id == questions.length;

  function nextq() {
    setQuestions((prev) => {
      let foundActive = false;
      return prev.map((item, index, arr) => {
        if (item.display) {
          foundActive = true;
          if (index === arr.length - 1) {
            finished = true;
            return item;
          }
          return { ...item, display: false };
        }
        if (foundActive) {
          foundActive = false;
          return { ...item, display: true };
        }
        return item;
      });
    });
  }

  function setAnswers(qId, ansId) {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === qId) {
          const isAlreadySelected = q.choosenKey.includes(ansId);
          const nextKeys = isAlreadySelected
            ? q.choosenKey.filter((key) => key !== ansId)
            : [...q.choosenKey, ansId];

          return {
            ...q,
            choosen: nextKeys.length > 0,
            choosenKey: nextKeys,
          };
        }
        return q;
      }),
    );
  }

  return (
    <div className=" cont min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="linko">
        {" "}
        <a
          href="https://t.me/Hakarat_SVU"
          className="p-8 bg-yellow-400 font-black"
        >
          كويزات امتحانية هكرات مزنوقين{" "}
        </a>
      </div>
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-6">
        {!result ? (
          <>
            <Qus items={questions} onClick={setAnswers} />

            <div className="flex justify-end pt-4">
              <button
                onClick={nextq}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium rounded-xl shadow-md transition-all duration-200"
              >
                Next
              </button>
            </div>

            {finished && (
              <div className="p-1 bg-blue-500 rounded-xl">
                <button
                  onClick={() => setResult(true)}
                  className="w-full bg-white text-gray-800 font-bold py-3 px-4 rounded-xl "
                >
                  See Your Result
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-center text-gray-800 mb-4">
              Your Results
            </h2>

            {questions.map((qus) => (
              <div
                className="rounded-2xl bg-gray-50 p-5 border border-gray-200"
                key={qus.id}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {qus.question || qus.text}
                </h3>

                <div className="flex flex-col gap-2">
                  {qus.answers.map((answer) => {
                    const isChoosen = qus.choosenKey.includes(answer.key);
                    const isCorrect = qus.correct.includes(answer.key);
                    const isNotCorrect =
                      isChoosen && !qus.correct.includes(answer.key);

                    return (
                      <div
                        key={answer.key || answer.id}
                        className={`p-3 border-2 rounded-xl text-sm transition-all ${
                          isCorrect
                            ? "border-emerald-500 bg-emerald-500 text-white font-semibold"
                            : isNotCorrect
                              ? "border-rose-600 text-white bg-rose-300"
                              : null
                        }`}
                      >
                        {answer.text} {isChoosen && "Your Choise"}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              onClick={() => setResult(false)}
              className="w-full mt-4 py-2 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-900 transition-all"
            >
              Back to Quiz
            </button>
          </div>
        )}
      </div>
      <footer>
        Made By Abd-Alraheam Al-Roqaya{" "}
        <a href="https://github.com/Abdulraheam169">Github</a>
      </footer>
    </div>
  );
}
