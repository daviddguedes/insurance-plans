import { Button } from "semantic-ui-react";

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

const handleClick = data => {
  console.log(data);
}

const TootltipComponent = ({ TooltipInPortal, tooltipTop, tooltipLeft, tooltipData }) => {
  return (
    <TooltipInPortal
      key={Math.random()}
      top={tooltipTop}
      left={tooltipLeft}
      applyPositionStyle
    >
      <div style={{ padding: '1em' }}>
        <p>{tooltipData.label}</p>
        <p>{tooltipData.provider}</p>
        <p>{calculateCoverages(tooltipData).startCoverage} to {calculateCoverages(tooltipData).endCoverage}</p>
        <p>Up to {tooltipData.price}</p>
        <Button fluid primary onClick={(e) => handleClick(tooltipData)} content="Get a Quote" />
      </div>
    </TooltipInPortal>
  )
}

export default TootltipComponent;