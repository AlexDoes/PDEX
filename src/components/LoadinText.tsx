import { Animate, AnimateGroup } from "react-simple-animate";

interface character {
  letter: string;
  i: number;
}

export default function LoadingText(prop: any) {
  const displayData = [
    "A new way to:",

    "Show off your plants",

    "Keep track of your plants",
    "Explore other people's plants",
  ];

  const BAX = ["B", "A", "X"];

  const displayText = prop.text.split(" ");
  return (
    <AnimateGroup
      play={true}
      sequences={[
        { sequenceId: 0 },
        { sequenceId: 1 },
        { sequenceId: 2, delay: 0.5 },
      ]}
    >
      {displayText.map((word: string, i: number) => (
        <Animate
          key={i}
          play={true}
          duration={1}
          delay={0}
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
      <div id="BAX" className="flex flex-row mb-1">
        {BAX.map((letter: string, i: number) => (
          <Animate
            key={i}
            play={true}
            duration={1.5}
            delay={0.5 * i}
            sequenceId={1}
            start={{
              transform: "translateX(-10px)",
              opacity: 0,
            }}
            end={{
              transform: "translateX(0px)",
              opacity: 1,
              color: "#FFFDD0",
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
          duration={1.5}
          delay={0.5 * i}
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
          <div className="flex flex-col text-[#ffffff] text-xl font-light indent-1 items-start">
            <span>{sentence}</span>
          </div>
        </Animate>
      ))}
    </AnimateGroup>
  );
}
