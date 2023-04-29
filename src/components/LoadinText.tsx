import { Animate, AnimateGroup } from "react-simple-animate";

interface character {
  letter: string;
  i: number;
}

export default function LoadingText(prop: any) {
  console.log(prop.text);

  const displayData = [
    "A new way to:",

    "Keep track of your plants",

    "Show off your plants",

    "Find new plants",
  ];

  const BAX = ["B", "A", "X"];

  const displayText = prop.text.split(" ");
  return (
    <AnimateGroup
      play={true}
      sequences={[
        { sequenceId: 0 },
        { sequenceId: 1, delay: 1 },
        { sequenceId: 2, delay: 1 },
      ]}
    >
      {displayText.map((word: string, i: number) => (
        <Animate
          key={i}
          play={true}
          duration={0.5}
          delay={0.5 * i}
          sequenceId={0}
          start={{
            transform: "translateX(-10px)",
            opacity: 0,
          }}
          end={{
            transform: "translateX(0px)",
            opacity: 1,
          }}
        >
          <div id={word}>{word}</div>
        </Animate>
      ))}
      <div id="BAX" className="flex flex-row">
        {BAX.map((letter: string, i: number) => (
          <Animate
            key={i}
            play={true}
            duration={0.5}
            delay={0.5 * i}
            sequenceId={1}
            start={{
              transform: "translateX(-10px)",
              opacity: 0,
              color: "white",
            }}
            end={{
              transform: "translateX(0px)",
              opacity: 1,
              color: "black",
            }}
          >
            <div id={letter}>{letter}</div>
          </Animate>
        ))}
      </div>
      {displayData.map((sentence: string, i: number) => (
        <Animate
          key={i}
          play={true}
          duration={1}
          delay={1 * i}
          sequenceId={2}
          start={{
            transform: "translatey(10px)",
            opacity: 0,
          }}
          end={{
            transform: "translatey(0px)",
            opacity: 1,
          }}
        >
          <div className="flex flex-col text-lg font-outline-3">
            <span>{sentence}</span>
          </div>
        </Animate>
      ))}
    </AnimateGroup>
  );
}
