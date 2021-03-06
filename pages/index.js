import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import { getProfile, getRandomGif } from "../lib/api";
import styles from "../styles/Home.module.css";

import Skeleton from "react-loading-skeleton";
import GridLoader from "react-spinners/GridLoader";
import { motion, AnimatePresence } from "framer-motion";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/contributors", fetcher, {
    refreshInterval: 1000,
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Contributors</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Colaboradores</h1>
        <h2>En tiempo real ⏱</h2>
        <div className={styles.grid}>
          <AnimatePresence>
            {!data && <GridLoader color="gray" loading={true} />}
            {data &&
              data.list.map((row) => (
                <Card key={row.createdAt} profileName={row.name} />
              ))}
          </AnimatePresence>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

const itemVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", delay: 0.5 },
  },
};

function Card({ profileName }) {
  const { data, error } = useSWR(profileName, getProfile);
  const { data: gifUrl } = useSWR([profileName], () => getRandomGif("excited"));

  if (!data) {
    return <Skeleton count={2} />;
  }
  const { avatar_url, name, html_url } = data;
  return (
    <motion.div
      className={styles.card}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <Image
        className={styles.avatar}
        src={avatar_url}
        alt={`Avatar for ${name}`}
        width={100}
        height={100}
      />
      <p>
        Gracias{" "}
        <h2>
          <a className="link" href={html_url}>
            {name}
          </a>
        </h2>
      </p>
      {gifUrl && (
        <Image src={gifUrl} alt={`Random gif`} width={180} height={180} />
      )}
    </motion.div>
  );
}
