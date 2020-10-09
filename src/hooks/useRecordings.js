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
    })
      .then((idb) => {
        db.current = idb;
        updateRecordings();
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Update the state with the recordings from the database
  async function updateRecordings() {
    const results = await db.current.getAll("recordings");
    recordings.forEach(({ url }) => URL.revokeObjectURL(url));
    results.forEach((recording) => {
      recording.url = URL.createObjectURL(recording.blob);
    });
    setRecordings(results.reverse());
  }

  async function addRecording(recording) {
    await db.current.add("recordings", recording);
    await updateRecordings();
  }
  async function deleteRecording(recording) {
    await db.current.delete("recordings", recording.id);
    await updateRecordings();
  }

  return {
    recordings,
    addRecording,
    deleteRecording,
  };
}

export default useRecordings;
