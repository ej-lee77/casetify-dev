import React, { useEffect, useState } from 'react'
import Studio from '../components/main/Studio'
import Quality from '../components/main/Quality'
import NewArrival from '../components/main/NewArrival'
import BestProduct from '../components/main/BestProduct'
import Custom from '../components/main/Custom'
import MainTravel from '../components/main/Travel'
import Instagram from '../components/main/Instagram'
import MainSlider from '../components/main/MainSlider'
import Collab from '../components/main/Collab'
import Popup from '../components/main/Popup'
import { AnimatePresence, motion } from 'framer-motion';
import './scss/Main.scss'

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Main() {
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  
  useEffect(() => {
    // 세션 스토리지에서 '이미 방문했는지' 확인
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
      setIsFirstLoading(true);
      // 로딩 완료 후 방문 기록 저장
      const timer = setTimeout(() => {
        setIsFirstLoading(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 1500); // 초기 로딩은 조금 더 길게 가져가도 좋아

      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <>
      <AnimatePresence>
        {isFirstLoading && (
          <motion.div
            key="loader"
            className="full-page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className="loader-logo">
              <motion.img 
                src="/images/casetify-logo-15th.png" 
                alt="casetify"
                initial={{ rotate: 0 }}
                animate={{ 
                  rotate: [-5, 5, -5, 5, 0] // 좁은 각도로 두 번 까닥인 후 정중앙(0)으로
                }}
                transition={{
                  duration: 0.6,    // 전체 동작 시간 (더 빠르게 하려면 0.4)
                  ease: "easeInOut",
                  times: [0, 0.25, 0.5, 0.75, 1] // 각 동작의 시점 배분
                }}
                style={{ width: '180px' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isFirstLoading && (
        <motion.div
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4 }}
        >
          <div className='main-wrap'>
            <Popup />
            <MainSlider />
            <BestProduct />
            <Collab />
            <NewArrival />
            <MainTravel />
            <Custom />
            <Instagram />
            <Studio />
            <Quality />
          </div>
        </motion.div>
      )}
    </>
  )
}
