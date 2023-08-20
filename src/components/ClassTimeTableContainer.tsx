import ClassTimeTable from './ClassTimeTable';
import { useEffect, useState } from 'react';
import { TimetableByWeekday } from '../types';
import LoadingBox from './loading/LoadingBox';
interface ClassTimeTableContainerProps {
  uuid: string;
}
function ClassTimeTableContainer({ uuid }: ClassTimeTableContainerProps) {
  const [timeTable, setTimeTable] = useState<TimetableByWeekday>([]);
  const [cache, setCache] = useState<Map<String, TimetableByWeekday>>(new Map());
  useEffect(() => {
    const cached = cache.get(uuid);
    if (cached !== undefined) {
      setTimeTable(cached);
      return;
    }
    getTimeTable()
      .then((tt) => {
        setTimeTable(tt);
        setCache(cache.set(uuid, tt));
      })
      .catch((err) => {
        console.error(err);
      });
    async function getTimeTable() {
      const response = await fetch(`http://localhost/api/timetable/${uuid}`);
      if (response.status === 200) {
        return (await response.json()) as TimetableByWeekday;
      } else {
        throw new Error('Failed to fetch timetable');
      }
    }
  }, [cache, uuid]);
  return (
    <LoadingBox isReady={timeTable.length > 0}>
      <ClassTimeTable timeTable={timeTable} />
    </LoadingBox>
  );
}
export default ClassTimeTableContainer;
