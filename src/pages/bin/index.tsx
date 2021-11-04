import { useEffect, useRef, useState } from "react";
import { tw } from "twind";

import "quill/dist/quill.snow.css";

let Quill = undefined;

export default function Bin() {
  const [htmlData, setHtmlData] = useState("");

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

        quill.current.clipboard.dangerouslyPasteHTML(htmlData);

        quill.current.on(
          "text-change",
          function () // params: delta, oldDelta, source
          {
            if (document.querySelector(".ql-editor")) {
              setHtmlData(document.querySelector(".ql-editor").innerHTML);
            }
          }
        );
      }, 200);
    }
  }, []);

  return (
    <section
      style={{
        gridTemplateRows: "auto 1fr auto",
      }}
      className={tw`h-screen grid bg-gray-900 text-white`}
    >
      <div className={tw`px-8 py-4`}>
        <button className={tw`border-1 border-gray-300 p-1 px-2 rounded`}>
          Connect to Web3
        </button>
      </div>
      <div
        style={{
          borderBottom: "1px solid #7E735C",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          overflowX: "hidden",
        }}
        className={tw`px-8`}
      >
        <div style={{}} className="quill">
          <div id="compose-editor-container">
            <div
              dangerouslySetInnerHTML={{
                __html: htmlData,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className={tw`p-4`}>
        <span style={{ color: "#7E735C" }}> Start Writing...</span>
      </div>
    </section>
  );
}
