import styles from "../styles/Home.module.css";
import { getSession, signOut } from "next-auth/client";
import { useEffect } from "react/cjs/react.development";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  function handleLogout() {
    signOut();
  }
  const router = useRouter();
  //   useEffect(() => {
  //     getSession().then((session) => {
  //       if (!session) {
  //         router.replace("/login");
  //       }
  //     });
  //   }, []);

  return (
    <div className={styles.container}>
      <button onClick={handleLogout}>Logout</button>
      <h1>home page with login</h1>
      <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
        <Link href="/profile">
          <button>Profile</button>
        </Link>
        <Link href="/matches">
          <button>Matches</button>
        </Link>
        <Link href="/messages">
          <button>Messages</button>
        </Link>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
