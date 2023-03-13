import { Box, Button } from "@mui/material";
import { useState } from "react";
import Input from "../Input";

const borderRadius = "0.25rem";

export default function Calculator() {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

  const removeSpaces = (num) => num.toString().replace(/\s/g, "");
  const math = (a, b, sign) =>
    sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;

  const numClickHandler = (value) => {
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const comaClickHandler = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + "." : calc.num,
    });
  };

  const signClickHandler = (sign) => {
    setCalc({
      ...calc,
      sign: sign,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Box
      sx={{
        height: 200,
        minWidth: 150,
        maxWidth: 150,
        backgroundColor: "primary.light",
        padding: "1rem",
        margin: "1px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "flex-start",
        borderRadius: borderRadius,
      }}
    >
      <Input
        sx={{
          backgroundColor: "white",
          height: "1.5rem",
          maxHeight: "1.5rem",
          borderRadius: borderRadius,
          marginBottom: "0.5rem",
          padding: 0,
          input: {
            padding: 0,
            paddingLeft: 1,
          },
          fieldset: {
            display: "none",
          },
        }}
        value={calc.num ? calc.num : calc.res}
        deisabled={true}
        // onChange={(e) => numClickHandler(+e.target.value)}
      />
      <div style={{ display: "flex", width: "100%", marginBottom: "0.25rem" }}>
        <Button
          value="C"
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={resetClickHandler}
        >
          C
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={invertClickHandler}
        >
          +-
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={percentClickHandler}
        >
          %
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
          }}
          onClick={() => signClickHandler("/")}
        >
          /
        </Button>
      </div>
      <div style={{ display: "flex", width: "100%", marginBottom: "0.25rem" }}>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={() => numClickHandler(7)}
        >
          7
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={() => numClickHandler(8)}
        >
          8
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={() => numClickHandler(9)}
        >
          9
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
          }}
          onClick={() => signClickHandler("X")}
        >
          X
        </Button>
      </div>
      <div style={{ display: "flex", width: "100%", marginBottom: "0.25rem" }}>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={() => numClickHandler(4)}
        >
          4
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={() => numClickHandler(5)}
        >
          5
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={() => numClickHandler(6)}
        >
          6
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
          }}
          onClick={() => signClickHandler("-")}
        >
          -
        </Button>
      </div>
      <div style={{ display: "flex", width: "100%", marginBottom: "0.25rem" }}>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={() => numClickHandler(1)}
        >
          1
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={() => numClickHandler(2)}
        >
          2
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={() => numClickHandler(3)}
        >
          3
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
          }}
          onClick={() => signClickHandler("+")}
        >
          +
        </Button>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={() => numClickHandler(0)}
        >
          0
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
            marginRight: "0.25rem",
          }}
          onClick={comaClickHandler}
        >
          .
        </Button>
        <Button
          sx={{
            display: "flex",
            flex: 2,
            minWidth: "auto",
            backgroundColor: "white",
            maxHeight: "1.5rem",
          }}
          onClick={equalsClickHandler}
        >
          =
        </Button>
      </div>
    </Box>
  );
}
