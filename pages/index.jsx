import { useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";

export default function Home() {
  const [data, setData] = useLocalStorage("note", "");
  const [title, setTitle] = useLocalStorage("note_title", "");

  const noteRef = useRef(null);

  useEffect(() => {
    noteRef.current.value = data;
  }, [data]);

  console.log(data);

  return (
    <section
      style={{
        height: "100vh",
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

        <textarea
          ref={noteRef}
          defaultValue={data}
          value={data}
          placeholder="Tap/Click Here to Start Typing..."
          onChange={(e) => setData(e.target.value)}
          style={{
            width: "100%",
            color: "#d4d4d4",
            border: "none",
            resize: "none",
            backgroundColor: "#1e1e1e",
            overflow: "auto",
            height: "100%",
          }}
        />
      </div>
      <div style={{ padding: "1em" }}>
        {data?.match(/[^\s]+/g)?.length > 0 ? (
          data?.match(/[^\s]+/g)?.length
        ) : (
          <span style={{ color: "#7E735C" }}> Start Writing...</span>
        )}
      </div>
    </section>
  );
}
