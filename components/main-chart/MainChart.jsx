import { Group } from '@visx/group';
import { scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { Circle } from '@visx/shape';
import { useTooltip, useTooltipInPortal, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';

import { data } from './data-mock';
import { Button } from 'semantic-ui-react';

const background = '#fafafa';

const verticals = new Set(data.map(v => v.key));
const providerAcc = (d) => d['provider'];
const verticalAcc = (d) => d['key'];

const providerScale = scaleBand({
  domain: data.map(d => d.provider),
  paddingOuter: 1,
  paddingInner: 1,
  nice: true
})

const verticalScale = scaleBand({
  domain: verticals,
  paddingOuter: 1,
  paddingInner: 1,
})

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 150 };

const calculateCoverages = data => {
  const months = +data.coverage.split(' ')[0]
  const startDate = new Date().getDate() + 1;
  const startMonth = new Date().getMonth();
  const startYear = new Date().getFullYear();
  const startCoverage = new Date(startYear, startMonth, startDate);
  const endCoverage = new Date(startYear, startMonth, startDate);
  endCoverage.setMonth(endCoverage.getMonth() + months);
  return { startCoverage: startCoverage.toLocaleDateString(), endCoverage: endCoverage.toLocaleDateString() };
}

export default function MainChart({ width, height, margin = defaultMargin }) {
  if (!width || width < 10) return null;
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
  } = useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  })

  const handleMouseOver = (event, d) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    console.log(coords);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: d
    });
  };

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  providerScale.range([0, xMax]);
  verticalScale.range([yMax, 0]);

  return (
    <div>
      <svg ref={containerRef} width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={verticalScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <GridColumns scale={providerScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
          <line x1={0} x2={xMax} y1={0} y2={0} stroke="#e0e0e0" />
          <AxisBottom top={yMax} scale={providerScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft scale={verticalScale} />
          {data.map((v, i) => (
            <Circle
              key={i}
              cx={providerScale(providerAcc(v))}
              cy={verticalScale(verticalAcc(v))}
              r={width / 100}
              fill={v.color}
              onMouseOver={(e) => handleMouseOver(e, v)}
            />
          ))}

          {tooltipOpen && (
            <TooltipInPortal
              key={Math.random()}
              top={tooltipTop}
              left={tooltipLeft}
            >
              <div style={{ padding: '1em' }}>
                <p>{tooltipData.label}</p>
                <p>{tooltipData.provider}</p>
                <p>{tooltipData.coverage}</p>
                <p>{calculateCoverages(tooltipData).startCoverage} to {calculateCoverages(tooltipData).endCoverage}</p>
                <p>{tooltipData.price}</p>
                <Button label="Get a Quote" />
              </div>
            </TooltipInPortal>
          )}
        </Group>
      </svg>
    </div>
  );
}

