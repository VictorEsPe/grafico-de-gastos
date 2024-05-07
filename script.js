const canvas = document.getElementById('chart');
const totalSpendings = document.getElementById('total');
const differencePercentageEL = document.getElementById('difference-percentage');

const lastMonthSpendings = 193.05;

fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    drawChart(data);

    const currentMonthSpendings = calculateTotal(data);

    totalSpendings.innerText = '$' + currentMonthSpendings;

    if (currentMonthSpendings > lastMonthSpendings) {
      differencePercentageEL.innerText = `+ ${calculateDifferencePercentage(
        currentMonthSpendings
      )}%`;
    } else {
      differencePercentageEL.innerText = ` ${calculateDifferencePercentage(
        currentMonthSpendings
      )}%`;
    }
  });

function drawChart(data) {
  const chartData = {
    labels: data.map(item => item.day),
    datasets: [
      {
        data: data.map(item => item.amount),
        borderWidth: 0,
        backgroundColor: ['hsl(10, 79%, 65%)'],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawTicks: false,
          drawBorder: false,
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      x: {
        grid: {
          drawTicks: false,
          drawBorder: false,
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  new Chart(canvas, {
    type: 'bar',
    data: chartData,
    options: chartOptions,
  });
}

function calculateTotal(array) {
  let total = 0;
  array.forEach(element => {
    total += element.amount;
  });

  return total.toFixed(2);
}

function calculateDifferencePercentage(currentMonth) {
  const difference = (currentMonth - lastMonthSpendings).toFixed(2);

  const differencePercentage = (
    (difference / lastMonthSpendings) *
    100
  ).toFixed(1);

  return differencePercentage;
}
