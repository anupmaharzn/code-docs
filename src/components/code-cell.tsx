import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypeSelector } from "../hooks/use-typed-selector";
import "./code-cell.css";
import { useEffect } from "react";
import { useCumulativeCode } from "../hooks/use-cumulative-code";
type CodeCellProps = {
  cell: Cell;
};

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useTypeSelector((state: any) => state.bundles[cell.id]);
  //string
  const cumulativeCode = useCumulativeCode(cell.id);
  useEffect(() => {
    //inital render
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    //debounce logic
    const timer = setTimeout(() => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

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
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
