import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { LockerData } from '../types';
import LoadingBox from './loading/LoadingBox';

interface LockerInfoContainerProps {
  uuid: string | null;
  children: React.ReactNode;
}
export interface LockerContext {
  lockerInfo?: LockerData;
  refreshLockerInfo?: () => void;
}
export const lockerContext = React.createContext<LockerContext>({});
function LockerInfoContainer({ uuid, children }: LockerInfoContainerProps) {
  const [lockerInfo, setLockerInfo] = useState<LockerData>({});
  const getLockerInfo = useMemo(() => {
    return (uuid: string) => {
      async function fetchLockerInfo() {
        const res = await fetch(`http://localhost/api/lockerState/${uuid}`);
        if (res.status === 200) {
          return (await res.json()) as LockerData;
        } else {
          throw new Error('Failed to fetch locker info');
        }
      }
      fetchLockerInfo()
        .then((v) => {
          setLockerInfo(v);
        })
        .catch((e) => {
          console.error(e);
        });
    };
  }, []);
  const prValue = useMemo(() => {
    return {
      lockerInfo: lockerInfo,
      refreshLockerInfo: () => {
        getLockerInfo(uuid as string);
      },
    };
  }, [getLockerInfo, lockerInfo, uuid]);
  useEffect(() => {
    if (uuid) getLockerInfo(uuid);
  }, [uuid, getLockerInfo]);
  return (
    <LoadingBox isReady={lockerInfo?.uuid !== undefined} message={uuid ? undefined : '자물쇠를 선택해주십시오'}>
      <lockerContext.Provider value={prValue}>
        <Fragment>{children}</Fragment>
      </lockerContext.Provider>
    </LoadingBox>
  );
}
export default LockerInfoContainer;
