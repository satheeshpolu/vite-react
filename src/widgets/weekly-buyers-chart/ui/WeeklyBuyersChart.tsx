import { Accordion, Span } from '@chakra-ui/react';
import { Chart } from 'react-google-charts';
import { FaChartBar } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

export const options = {
  title: 'Weekly Buyers',
  legend: { position: 'none' },
  hAxis: { title: 'Day of the Week' },
  vAxis: { title: 'Number of Buyers' },
  colors: ['#14b8a6'],
};

const getRandomPositiveInt = (min = 1, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const WeeklyBuyersChart = () => {
  const queryParams = useParams();
  const productId: number = Number(queryParams?.id) || 1;

  const data = [
    ['Day', 'Buyers'],
    ['Mon', getRandomPositiveInt(1, productId)],
    ['Tue', getRandomPositiveInt(1, productId)],
    ['Wed', getRandomPositiveInt(1, productId)],
    ['Thu', getRandomPositiveInt(1, productId)],
    ['Fri', getRandomPositiveInt(1, productId)],
    ['Sat', getRandomPositiveInt(1, productId)],
    ['Sun', getRandomPositiveInt(1, productId)],
  ];

  return (
    <>
      <Accordion.Root collapsible defaultValue={[]}>
        <Accordion.Item value={'item.value'}>
          <Accordion.ItemTrigger>
            <Span flex="1" display="inline-flex" alignItems="center" gap={2}>
              {' '}
              <FaChartBar />
              {'Weekly product metrics overview'}
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Chart
                chartType="ColumnChart"
                width="100%"
                height="100%"
                data={data}
                options={options}
              />
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};

export default WeeklyBuyersChart;
