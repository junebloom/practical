import { useRef, useState, useEffect } from "react";
import { openDB } from "idb";

function useRecordings() {
  const [recordings, setRecordings] = useState([]);
  const db = useRef();

  // Set up the database on load
  useEffect(() => {
    openDB("Recordings", 1, {
      upgrade(db) {
        db.createObjectStore("recordings", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    }).then(async (idb) => {
      db.current = idb;

      const results = await db.current.getAll("recordings");
      results.forEach((recording) => {
        recording.url = URL.createObjectURL(recording.blob);
      });

      setRecordings(results.reverse());
    });
  }, []);

  async function addRecording(recording) {
    recording.id = await db.current.add("recordings", recording);
    recording.url = URL.createObjectURL(recording.blob);
    setRecordings((recordings) => [recording, ...recordings]);
  }

  async function deleteRecording(recording) {
    await db.current.delete("recordings", recording.id);
    URL.revokeObjectURL(recording.url);
    setRecordings((recordings) =>
      recordings.filter((item) => item !== recording)
    );
  }

  return {
    recordings,
    addRecording,
    deleteRecording,
  };
}

export default useRecordings;
