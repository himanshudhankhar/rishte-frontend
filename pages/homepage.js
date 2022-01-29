import styles from "../styles/Home.module.css";
import { getSession, signOut } from "next-auth/client";
import { useEffect } from "react/cjs/react.development";
import { useRouter } from "next/router";

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
