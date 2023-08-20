import React, { useState } from 'react';
import app from './App.module.scss';
import Header from './components/navigation/Header';
import Footer from './components/navigation/Footer';
import './index.scss';
import ClassTimeTableContainer from './components/ClassTimeTableContainer';
import LocalClock from './components/LocalClock';
import LockerInfoContainer from './components/LockerInfoContainer';
import { lockerContext } from './components/LockerInfoContainer';

function App() {
  const [selectedLocker, setSelectedLocker] = useState<string>('1234');
  return (
    <div className={app.app}>
      <Header />
      <div className={app.app_body}>
        <LockerInfoContainer uuid={selectedLocker}>
          <div className={app.app_body_col_container}>
            <LockerTitle />
            <div className={app.app_body_row_container}>
              <div>
                <span className={app.text_lockState_icon}>lock</span>
                <div className={app.box_lockerState_text}>
                  <span className={app.text_lockerState_states}>문이 잠겨 있습니다</span>
                  <span className={app.text_lockerState_content}>이동 수업 시간이 끝나면 다시 열립니다.</span>
                </div>
              </div>
            </div>
            <div className={app.app_body_row_container}>
              <div>
                <div className={app.box_lockerOrder_btn}>
                  <div className={app.btn_lockerOrder}>
                    <div className={app.box_lockerOrder_btn_content}>
                      <span className={app.text_lockerOrder_btn_icon}>lock_open</span>
                      <span className={app.text_lockerOrder_btn_content}>잠금해제</span>
                    </div>
                  </div>
                  <div className={app.btn_lockerOrder}>
                    <div className={app.box_lockerOrder_btn_content}>
                      <span className={app.text_lockerOrder_btn_icon}>lock_open</span>
                      <span className={app.text_lockerOrder_btn_content}>잠금해제</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={app.app_body_row_container}>
              <div className={app.box_classTimeTable}>
                <ClassTimeTableContainer uuid={selectedLocker} />
              </div>
            </div>
          </div>
        </LockerInfoContainer>
        <div></div>
      </div>
      <Footer />
    </div>
  );
}
function LockerTitle() {
  const { lockerInfo, refreshLockerInfo } = React.useContext(lockerContext);
  const editNickname = () => {
    let newNickname = prompt('변경할 이름을 입력해주세요', lockerInfo?.nickname as string);
    if (newNickname !== lockerInfo?.nickname) {
      fetch(`http://localhost/api/lockerState/${lockerInfo?.uuid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: newNickname,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            refreshLockerInfo?.();
          } else {
            throw new Error('Failed to fetch locker info');
          }
        })
        .catch((e) => {
          console.error(e);
        });
      alert('이름이 변경되었습니다.');
      refreshLockerInfo?.();
      return;
    } else {
      alert('동일한 이름으로 변경할 수 없습니다.');
      return;
    }
  };
  return (
    <div className={app.app_body_row_container}>
      <div>
        <div className={app.box_locker_title}>
          <span className={app.text_locker_title}>{lockerInfo?.nickname}</span>
          <span className={'material-icons'} onClick={editNickname}>
            edit
          </span>
        </div>
        <LocalClock style={app.text_local_clock} />
        <span className={'material-icons'} onClick={refreshLockerInfo}>
          refresh
        </span>
      </div>
      <hr className={app.horizon_line} />
    </div>
  );
}

export default App;
