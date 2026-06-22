export default function Qus(props) {
  const displayed = props.items.filter((item) => item.display == true)[0];
  console.log(displayed);
  return (
    <>
      <div
        className="q-box rounded-2xl bg-gray-50 p-6 mx-auto"
        key={displayed.id}
      >
        <h1 className="p-6">{displayed.question}</h1>
        {displayed.img ? <img src={displayed.img}></img> : undefined}
        <div className="answers">
          {displayed.answers.map((answer) => (
            <div>
              <label key={answer.key} htmlFor={answer.text}>
                <input
                  type="checkbox"
                  name="quis"
                  id={answer.text}
                  onChange={() => props.onClick(displayed.id, answer.key)}
                />
                {answer.text}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
