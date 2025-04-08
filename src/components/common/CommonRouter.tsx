import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from '@pages/Home';
import Login from "@pages/00-login/Login";
import Join from "@pages/00-login/Join";

import M101 from '@pages/01-recruit/M101';
import M201 from '@pages/02-hr/M201';
import M202 from '@pages/02-hr/M202';
import M203 from '@pages/02-hr/M203';
import M204 from '@pages/02-hr/M204';
import M301 from '@pages/03-group/M301';
import M302 from '@pages/03-group/M302';
import M401 from '@pages/04-project/M401';
import M501 from '@pages/05-report/M501';
import M502 from '@pages/05-report/M502';
import M601 from '@pages/06-set/M601';
import M602 from '@pages/06-set/M602';
import M603 from '@pages/06-set/M603';
import M604 from '@pages/06-set/M604';

const CommonRouter = () => {
  return(
    <Routes>
      <Route path="/home" element={<Home />}/>

      <Route path="/" element={<Login />}/>
      <Route path="/join" element={<Join />}/>

      <Route path="/recruit" element={<M101 />}/>
      <Route path="/hr/manage" element={<M201 />}/>
      <Route path="/hr/transfer" element={<M202 />}/>
      <Route path="/hr/evaluate" element={<M203 />}/>
      <Route path="/hr/ability" element={<M204 />}/>
      <Route path="/group/manage" element={<M301 />}/>
      <Route path="/group/history" element={<M302 />}/>
      <Route path="/project" element={<M401 />}/>
      <Route path="/report/profile" element={<M501 />}/>
      <Route path="/report/stats" element={<M502 />}/>
      <Route path="/set/user" element={<M601 />}/>
      <Route path="/set/menu" element={<M602 />}/>
      <Route path="/set/code" element={<M603 />}/>
      <Route path="/set/batch" element={<M604 />}/>
    </Routes>
  )
}

export default CommonRouter;