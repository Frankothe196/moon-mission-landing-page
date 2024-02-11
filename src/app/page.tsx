"use client"
import { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import Moon from "@/components/moon";

export default function Home() {

  return (
    <main className={styles.main}>
      <nav>
        <h2 className={styles.title}>Moon Village Association</h2> 
        <div className={styles.links}>
          <a href="">About</a>
          <a href="">Built by Franklin Barto</a>
        </div>
      </nav>
      <div className={styles.moon}>
        <Moon/>
      </div>

      <div className={styles.hero}>
        <span>Building Humanity`s Future Beyond Earth</span>
        <h1>Moon Habitat</h1>
        <p>Venturing Beyond the Horizon, we embark on a bold expedition to explore and conquer new frontiers, pushing the boundaries of human knowledge and discovery.</p>
        <a href="">Join the Mission <span>-&gt;</span></a>
      </div>

      <div className={styles.grid}>
        <p className={styles.floatingText}>Stages</p>
        <a
          href=""
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
          Exploration <span>-&gt;</span>
          </h2>
          <p> Send robotic missions to explore lunar terrain, identify resources, and assess potential landing sites.</p>
        </a>

        <a
          href=""
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
          Infrastructure <span>-&gt;</span>
          </h2>
          <p> Develop essential infrastructure such as habitats, power systems, and communication networks to support human presence</p>
        </a>

        <a
          href=""
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
          Sustainability <span>-&gt;</span>
          </h2>
          <p>Harness lunar resources like water ice and regolith to sustain life, produce fuel, and facilitate construction.</p>
        </a>

        <a
          href=""
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
          Human Settlement
          </h2>
          <p>
            Establish permanent human settlements for scientific research, technological development, and as a gateway for deeper space exploration
          </p>
        </a>
      </div>
    </main>
  );
}
