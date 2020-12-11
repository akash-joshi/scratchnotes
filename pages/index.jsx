import { useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";

export default function Home() {
  const [data, setData] = useLocalStorage("note", "");

  const noteRef = useRef(null);

  useEffect(() => {
    noteRef.current.value = data;
  }, [data]);

  console.log(data);

  return (
    <section style={{ height: "100vh" }}>
      <textarea
        ref={noteRef}
        defaultValue={data}
        value={data}
        onChange={(e) => setData(e.target.value)}
        style={{ height: "100%", width: "100%", padding: "2em" }}
      />
    </section>
  );
}
