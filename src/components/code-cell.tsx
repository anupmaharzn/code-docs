import { useState, useEffect } from "react";
import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";
import bundle from "../bundler/index";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
type CodeCellProps = {
  cell: Cell;
};

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [err, setErr] = useState("");
  const [code, setCode] = useState("");
  const { updateCell } = useActions();
  useEffect(() => {
    const timer = setTimeout(async () => {
      //send rawcode for bundling
      const output = await bundle(cell.content);
      // set the bundle output value
      setCode(output.code);
      //set error if any
      setErr(output.err);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* receive raw code form editor */}
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>

        {/* send bundled code for preview */}
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
