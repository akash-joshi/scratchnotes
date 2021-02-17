import { useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";

import "quill/dist/quill.snow.css";

let Quill = undefined;

export default function Home() {
  const [data, setData] = useLocalStorage("note", "");
  const [title, setTitle] = useLocalStorage("note_title", "");

  console.log(data);

  const quill = useRef(null);

  useEffect(() => {
    Quill = require("quill");

    if (!quill.current) {
      setTimeout(() => {
        quill.current = new Quill("#compose-editor-container", {
          modules: {
            toolbar: {
              container: [
                [
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  { list: "ordered" },
                  "link",
                ],
              ],
            },
          },
          theme: "snow", // or 'bubble'
        });

        quill.current.clipboard.dangerouslyPasteHTML(data);

        quill.current.on(
          "text-change",
          function () // params: delta, oldDelta, source
          {
            if (document.querySelector(".ql-editor")) {
              setData(document.querySelector(".ql-editor").innerHTML);
            }
          }
        );
      }, 200);
    }
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        backgroundColor: "#1e1e1e",
        gridTemplateRows: "1fr auto",
        color: "#d4d4d4",
      }}
    >
      <div
        style={{
          padding: "2em",
          borderBottom: "1px solid #7E735C",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          overflowX: "hidden",
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            border: "none",
            marginBottom: "1em",
            fontSize: "1.5em",
          }}
          type="text"
        />

        <div style={{}} className="quill">
          <div id="compose-editor-container">
            <div
              dangerouslySetInnerHTML={{
                __html: data,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div style={{ padding: "1em" }}>
        {quill?.current?.getText()?.match(/[^\s]+/g)?.length > 0 ? (
          quill?.current?.getText()?.match(/[^\s]+/g)?.length
        ) : (
          <span style={{ color: "#7E735C" }}> Start Writing...</span>
        )}
      </div>
    </section>
  );
}
