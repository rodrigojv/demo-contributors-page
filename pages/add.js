import { useState } from "react";

import styles from "../styles/Home.module.css";

export default function AddPost() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handlePost = async (e) => {
    e.preventDefault();

    // reset error and message
    setError("");
    setMessage("");

    // fields check
    if (!name) return setError("All fields are required");

    // post structure
    let githubName = {
      name,
      createdAt: new Date().toISOString(),
    };

    // save the post
    let response = await fetch("/api/contributors", {
      method: "POST",
      body: JSON.stringify(githubName),
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields
      setName("");
      // set the message
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handlePost} className={styles.form}>
          {error ? (
            <div className={styles.formItem}>
              <h3 className={styles.error}>{error}</h3>
            </div>
          ) : null}
          {message ? (
            <div className={styles.formItem}>
              <h3 className={styles.message}>{message}</h3>
            </div>
          ) : null}
          <div className={styles.formItem}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="name"
            />
          </div>

          <div className={styles.formItem}>
            <button type="submit">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
