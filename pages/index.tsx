import React, { useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";

import "quill/dist/quill.snow.css";
import { Tabs } from "antd";

let Quill = undefined;

export default function Home() {
  const [htmlData, setHtmlData] = useLocalStorage("note", "");
  const [currentTitle, setCurrentTitle] = useLocalStorage("note_title", "");
  const [selectedTab, setSelectedTab] = useLocalStorage("selectedTab", "1");
  const [allData, setAllData] = useLocalStorage("allData", [
    { data: "", title: "" },
    { data: "", title: "" },
    { data: "", title: "" },
    { data: "", title: "" },
    { data: "", title: "" },
  ]);

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
        <div>
          <Tabs
            activeKey={selectedTab}
            onChange={(selectedKey) => {
              const nextData = [...allData];

              nextData[parseInt(selectedTab) - 1].data = htmlData;
              nextData[parseInt(selectedTab) - 1].title = currentTitle;
              setAllData(nextData);

              setSelectedTab(selectedKey);

              quill.current.clipboard.dangerouslyPasteHTML(
                nextData[parseInt(selectedKey) - 1].data
              );
              setHtmlData(nextData[parseInt(selectedKey) - 1].data);
              setCurrentTitle(nextData[parseInt(selectedKey) - 1].title);
            }}
          >
            <Tabs.TabPane tab="Tab 1" key="1"></Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2"></Tabs.TabPane>
            <Tabs.TabPane tab="Tab 3" key="3"></Tabs.TabPane>
            <Tabs.TabPane tab="Tab 4" key="4"></Tabs.TabPane>
            <Tabs.TabPane tab="Tab 5" key="5"></Tabs.TabPane>
          </Tabs>

          <input
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
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
        </div>

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
