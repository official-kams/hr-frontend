import React, { Dispatch, useState, useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "antd";

import * as gateway from "@components/gateway/Gateway";

import homeImg from "@assets/imgs/logo/logo.png";
import openBtn from "@assets/imgs/layout/openbtn.png";
import menuImg01 from "@assets/imgs/layout/menu01.png";
import menuImg02 from "@assets/imgs/layout/menu02.png";
import menuImg03 from "@assets/imgs/layout/menu03.png";
import menuImg04 from "@assets/imgs/layout/menu04.png";
import menuImg05 from "@assets/imgs/layout/menu05.png";
import menuImg06 from "@assets/imgs/layout/menu06.png";

import logoutImg from "@assets/imgs/layout/logout.png";

interface PropsType {
  menuState: boolean;
  setMenuState: Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBar({ menuState, setMenuState }: PropsType) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const menuList = [
    {
      depth1Icon: menuImg01,
      depth1Name: "채용",
      depth1Link : "/recruit",
      depth2: false,
      depth2Menu : [],
      depth2Link : []
    },
    {
      depth1Icon: menuImg02,
      depth1Name: "인사",
      depth1Link: "/hr/manage",
      depth2: true,
      depth2Menu: ["인력정보등록", "인사발령", "평가", "역량관리"],
      depth2Link: ["/hr/manage", "/hr/transfer", "/hr/evaluate", "/hr/ability"],
    },
    {
      depth1Icon: menuImg03,
      depth1Name: "조직",
      depth1Link: "/group/manage",
      depth2: true,
      depth2Menu: ["조직관리", "변경이력"],
      depth2Link: ["/group/manage", "/group/history"],
    },
    {
      depth1Icon: menuImg04,
      depth1Name: "프로젝트",
      depth1Link : "/project",
      depth2: false,
      depth2Menu : [],
      depth2Link : []
    },
    {
      depth1Icon: menuImg05,
      depth1Name: "보고서",
      depth1Link: "/report/profile",
      depth2: true,
      depth2Menu: ["프로필관리", "통계"],
      depth2Link: ["/report/manage", "/report/stats"],
    },
    {
      depth1Icon: menuImg06,
      depth1Name: "설정",
      depth1Link : "/set/user",
      depth2: true,
      depth2Menu: ["사용자관리", "메뉴관리", "공통코드관리", "배치관리"],
      depth2Link: ["/set/user", "/set/menu", "set/code", "set/batch"],
    }
  ];

  // ✅ sideBar 열고 닫음
  const toggleMenu = () => {
    setMenuState(prev => !prev);
  };

  // ✅ depth2 Toggle 처리
  const toggleDepth2 = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ✅ menuState가 false일 때 depth2 접힘 처리
  useEffect(() => {
    if (!menuState) {
      setOpenIndex(null);
    }
  }, [menuState]);

  const logout = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      await gateway.post("/auth/logout", {accessToken});
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate("/");
    }
  }

  return (
    <article id="sideBar" className={menuState ? "open" : "close"}>
      <div className="sidebar-header">
        <Link to="/home">
          <img src={homeImg} alt="홈" />
        </Link>
        <button onClick={toggleMenu}>
          <img src={openBtn} alt="열기" />
        </button>
      </div>
      <div className="sidebar-body">
        {menuList.map((menu, idx) => (
          <div className="menu" key={idx}>
            <div className={`menu-depth1 ${menu.depth2Link?.some(link => link === location.pathname) ? "on" : ""} ${menu.depth1Link === location.pathname ? "on" : ""}`}>
              <Link to={menu.depth1Link} className="i-name">
                { menuState ?
                  <img src={menu.depth1Icon} alt={menu.depth1Name}/>
                  :
                  <Tooltip placement="right" title={menu.depth1Name}>
                    <img src={menu.depth1Icon} alt={menu.depth1Name}/>
                  </Tooltip>
                }
                {menuState && <span>{menu.depth1Name}</span>}
              </Link>
              {menu.depth2 && menuState && (
                <button onClick={() => toggleDepth2(idx)}>
                  {openIndex === idx ? "−" : "+"}
                </button>
              )}
            </div>

            <AnimatePresence initial={false}>
            {menu.depth2 && openIndex === idx && menuState && (
              <motion.div
                className="menu-depth2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul>
                  {menu.depth2Menu.map((subMenu, subIdx) => (
                    <li
                      key={subIdx}
                      className={
                        location.pathname === menu.depth2Link[subIdx] ? "on" : ""
                      }
                    >
                      <Link to={menu.depth2Link[subIdx]}>{subMenu}</Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="menu">
          <div className="menu-depth1">
            <Link to="#" onClick={logout} className="i-name">
              {menuState ?
                <img src={logoutImg} alt="로그아웃" />
                :
                <Tooltip placement="right" title="로그아웃">
                  <img src={logoutImg} alt="로그아웃"/>
                </Tooltip>
              }
              {menuState && <span>로그아웃</span>}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
