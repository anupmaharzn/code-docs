import { useState } from "react";
import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";
import bundle from "../bundler/index";
const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    //send rawcode for bundling
    const output = await bundle(input);
    // set the bundle output value
    setCode(output);
  };

  return (
    <div>
      {/* receive raw code form editor */}
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      {/* send bundled code for preview */}
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
