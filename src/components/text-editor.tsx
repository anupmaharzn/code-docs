import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState("# Header");
  useEffect(() => {
    const listner = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        //element clicked on is inside editor do nothing
        return;
      }
      //elementclicked is outside the editor then
      setEditing(false);
    };
    document.addEventListener("click", listner, { capture: true });
    return () => {
      document.removeEventListener("click", listner, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
