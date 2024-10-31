// src/modules/Home/OptionCard.js
import React from 'react';
import { FaFolderPlus, FaUserPlus, FaQuestionCircle } from 'react-icons/fa';
import styles from './Home.module.css';

const icons = {
  FaFolderPlus: <FaFolderPlus className={styles.cardIcon} />,
  FaUserPlus: <FaUserPlus className={styles.cardIcon} />,
  FaQuestionCircle: <FaQuestionCircle className={styles.cardIcon} />,
};

const OptionCard = ({ title, icon, colorClass, onClick }) => (
  <div className={`${styles.card} ${styles[colorClass]}`} onClick={onClick}>
    {icons[icon]}
    <h3>{title}</h3>
  </div>
);

export default OptionCard;
