import app from '../App.module.scss';
import { lockerContext } from './LockerInfoContainer';
import React, { Fragment, useMemo, useRef } from 'react';
import { LockerData } from '../types';

function LockerList() {
  const lockerCtx = React.useContext(lockerContext);
  const lockerList = useMemo(() => {
    return lockerCtx.lockerInfo as Array<LockerData>;
  }, [lockerCtx.lockerInfo]);
  const editRef = useRef<HTMLElement>(null);
  const editGradeClass = () => {
    const index = Number(editRef.current?.dataset.index);
    const lockerInfo = lockerList[index];
    let newGrade = Number(prompt('변경할 학년을 입력해주세요', String(lockerInfo?.grade)));
    if (newGrade !== lockerInfo?.grade) {
      fetch(`https://api.thezoot3.com/api/lockerState/${lockerInfo?.uuid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grade: newGrade,
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Failed to fetch locker info');
          }
        })
        .catch((e) => {
          console.error(e);
          alert('내부 문제가 발생하였습니다.');
          return;
        });
      alert('학년이 변경되었습니다.');
    }
    let newClass = Number(prompt('변경할 학년을 입력해주세요', String(lockerInfo?.classNumber)));
    if (newGrade !== lockerInfo?.classNumber) {
      fetch(`https://api.thezoot3.com/api/lockerState/${lockerInfo?.uuid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classNumber: newClass,
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Failed to fetch locker info');
          }
        })
        .catch((e) => {
          console.error(e);
          alert('내부 문제가 발생하였습니다.');
          return;
        });
      alert('반이 변경되었습니다.');
    }
  };
  return (
    <Fragment>
      {lockerList.map((locker, index) => {
        return (
          <div className={app.box_lockerList_item} key={index}>
            <div className={app.box_lockerList_item_text}>
              <span className={app.text_lockerList_item_title_icon}>{locker.isLocked ? 'lock' : 'lock_open'}</span>
              <span className={app.text_lockerList_item_title}>{locker.nickname}</span>
              <span className={app.text_lockerList_item_icon} onClick={editGradeClass} ref={editRef} data-index={index}>
                edit
              </span>
            </div>
            <span className={app.text_lockerList_item_class}>
              {locker.grade}-{locker.classNumber}
            </span>
          </div>
        );
      })}
    </Fragment>
  );
}
export default LockerList;
