import AdminPanel from "../components/AdminPanel";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";

const Admin = () => {
  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link to="/" className={styles.wordmark}><span>E</span> EXPLORE</Link>
        <nav><Link to="/">DIRECTORY</Link><span>ADMIN <i /></span></nav>
      </header>
      <section className={styles.intro}>
        <div className={styles.eyebrow}><span /> CONTROL ROOM / PROFILE DATABASE</div>
        <h1>Manage the roster<span>.</span></h1>
        <p>Add field entries or remove outdated records. Changes are stored in this browser.</p>
      </section>
      <AdminPanel />
    </main>
  );
};

export default Admin;
