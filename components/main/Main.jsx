import useWindowSize from '../../hooks/windowSize';
import MainChart from '../main-chart/MainChart';

const Main = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      <MainChart width={width} height={height} />
    </div>
  )
}

export default Main;