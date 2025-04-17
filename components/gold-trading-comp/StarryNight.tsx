"use client";

import React, { JSX, useEffect, useState } from "react";
import styles from "./StarryNight.module.css";

const StarryNight: React.FC = () => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const starCount = 200;
      const newStars = [];

      for (let i = 0; i < starCount; i++) {
        const style = {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        };

        newStars.push(<div key={i} className={styles.star} style={style} />);
      }

      setStars(newStars);
    };

    generateStars();
  }, []);

  return <div className={`${styles.starryNight}`}>{stars}</div>;
};

export default StarryNight;
