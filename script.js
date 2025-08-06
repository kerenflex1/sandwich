document.addEventListener('DOMContentLoaded', () => {
  startChatDemo();
  setupCharts();
});

function startChatDemo() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const flows = [
    {user: 'Create a poll', ai: 'Poll created', app: 'Poll MiniApp'},
    {user: 'Open a store with 3 items', ai: 'Store opened', app: 'Store MiniApp'},
    {user: 'Track who paid me', ai: 'Tracker ready', app: 'Payment Tracker'},
    {user: 'Collect USDC', ai: 'Wallet generated', app: 'USDC Wallet'}
  ];
  let delay = 0;
  flows.forEach(flow => {
    setTimeout(() => {
      addMessage(container, flow.user, true);
      setTimeout(() => {
        addMessage(container, flow.ai, false, flow.app);
      }, 700);
    }, delay);
    delay += 2000;
  });
}

function addMessage(container, text, isUser, app) {
  const bubble = document.createElement('div');
  bubble.className = (isUser ? 'self-end bg-[#0097A7]' : 'self-start bg-gray-700') + ' text-white rounded-lg px-4 py-2 max-w-[70%]';
  bubble.textContent = text;
  container.appendChild(bubble);
  if (app) {
    const appDiv = document.createElement('div');
    appDiv.className = 'self-start bg-gray-700 rounded-lg px-4 py-2 max-w-[70%] text-sm text-gray-200';
    appDiv.textContent = app;
    container.appendChild(appDiv);
  }
  container.scrollTop = container.scrollHeight;
}

function setupCharts() {
  const businessCtx = document.getElementById('businessChart');
  if (businessCtx) {
    new Chart(businessCtx, {
      type: 'pie',
      data: {
        labels: ['Freemium', 'Pro tiers', 'Fees', 'App Store', 'Partners'],
        datasets: [{
          data: [20, 20, 20, 20, 20],
          backgroundColor: ['#0097A7', '#00ACC1', '#26C6DA', '#4DD0E1', '#80DEEA']
        }]
      },
      options: {plugins:{legend:{labels:{color:'white'}}}}
    });
  }

  const marketCtx = document.getElementById('marketChart');
  if (marketCtx) {
    new Chart(marketCtx, {
      type: 'bar',
      data: {
        labels: ['Messaging users', 'Creators/Admins', 'TAM ($B)', 'Competitors'],
        datasets: [{
          label: 'Stats',
          data: [2500, 300, 60, 0],
          backgroundColor: '#0097A7'
        }]
      },
      options: {scales:{x:{ticks:{color:'white'}},y:{ticks:{color:'white'}}},plugins:{legend:{display:false}}}
    });
  }

  const fundsCtx = document.getElementById('fundsChart');
  if (fundsCtx) {
    new Chart(fundsCtx, {
      type: 'doughnut',
      data: {
        labels: ['Talent', 'Infra', 'Marketing', 'Compliance'],
        datasets: [{
          data: [50,25,20,5],
          backgroundColor: ['#0097A7', '#00ACC1', '#26C6DA', '#4DD0E1']
        }]
      },
      options: {plugins:{legend:{labels:{color:'white'}}}}
    });
  }
}
