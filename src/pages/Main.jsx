import React from 'react'
import Studio from '../components/main/Studio'
import Quality from '../components/main/Quality'
import NewArrival from '../components/main/NewArrival'
import BestProduct from '../components/main/BestProduct'
import Custom from '../components/main/Custom'
import MainTravel from '../components/main/Travel'
import Instagram from '../components/main/Instagram'
import MainSlider from '../components/main/MainSlider'
import Collab from '../components/main/Collab'

import { motion } from "framer-motion";

const FadeInSection = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}       // 초기 상태 (투명하고 아래로 30px)
      whileInView={{ opacity: 1, y: 0 }}   // 화면에 나타났을 때 상태
      viewport={{ once: true, amount: 0.3 }} // 화면의 30%가 보일 때 실행, 한 번만 실행
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} // 애니메이션 시간과 효과
    >
      {children}
    </motion.div>
  );
};

export default function Main() {
  return (
    <div className='main-wrap'>
      <MainSlider />
      <FadeInSection>
        <BestProduct />
      </FadeInSection>
      <FadeInSection>
        <Collab />
      </FadeInSection>
      <FadeInSection>
        <NewArrival />
      </FadeInSection>
      <FadeInSection>
        <MainTravel />
      </FadeInSection>
      <FadeInSection>
        <Custom />
      </FadeInSection>
      <FadeInSection>
        <Instagram />
      </FadeInSection>
      <FadeInSection>
        <Studio />
      </FadeInSection>
      <FadeInSection>
        <Quality />
      </FadeInSection>
    </div>
  )
}
