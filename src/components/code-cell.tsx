import { useState, useEffect } from "react";
import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";
import bundle from "../bundler/index";
import Resizable from "./resizable";
const CodeCell = () => {
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      //send rawcode for bundling
      const output = await bundle(input);
      // set the bundle output value
      setCode(output.code);
      //set error if any
      setErr(output.err);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        {/* receive raw code form editor */}
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>

        {/* send bundled code for preview */}
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
