// Minor update: script refreshed for demo
document.addEventListener('DOMContentLoaded', () => {
  startChatDemo();
  setupCharts();
});

function startChatDemo() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const flows = [
    {
      user: 'Let\'s play poker tonight',
      ai: 'Poker table is ready. Dealing cards…',
      app: { type: 'poker', players: ['You', 'Alice', 'Bob', 'Dana'] }
    }
  ];
  let delay = 0;
  flows.forEach(flow => {
    setTimeout(() => {
      addMessage(container, flow.user, true);
      setTimeout(() => {
        addMessage(container, flow.ai, false, flow.app);
      }, 700);
    }, delay);
    delay += 4000;
  });
}

function addMessage(container, text, isUser, app) {
  const bubble = document.createElement('div');
  bubble.className = (isUser ? 'self-end bg-[#0097A7]' : 'self-start bg-gray-700') + ' text-white rounded-lg px-4 py-2 max-w-[70%]';
  bubble.textContent = text;
  container.appendChild(bubble);
  if (app) {
    if (typeof app === 'string') {
      const appDiv = document.createElement('div');
      appDiv.className = 'self-start bg-gray-700 rounded-lg px-4 py-2 max-w-[70%] text-sm text-gray-200';
      appDiv.textContent = app;
      container.appendChild(appDiv);
    } else if (app.type === 'poker') {
      const pokerApp = createPokerApp(app.players);
      container.appendChild(pokerApp);
    }
  }
  container.scrollTop = container.scrollHeight;
}

function createPokerApp(players) {
  const appDiv = document.createElement('div');
  const title = document.createElement('div');
  title.className = 'font-bold mb-2';
  title.textContent = 'Poker Game';
  appDiv.appendChild(title);
  const table = document.createElement('div');
  table.className = 'grid grid-cols-2 gap-2';
    table.appendChild(seat);
  });
  appDiv.appendChild(table);
  return appDiv;
}

function createWoltApp(participants) {
  const appDiv = document.createElement('div');
  appDiv.className = 'self-start bg-blue-700 rounded-lg p-4 max-w-[90%] text-white app-pop';
  const title = document.createElement('div');
  title.className = 'font-bold mb-2';
  title.textContent = 'Wolt Order';
  appDiv.appendChild(title);
  const list = document.createElement('div');
  appDiv.appendChild(list);
  participants.forEach((p, idx) => {
    setTimeout(() => {
      const item = document.createElement('div');
      item.className = 'bg-blue-800 rounded px-2 py-1 mt-1 opacity-0 transition-opacity duration-500';
      item.textContent = p.name + ': ' + p.choice;
      list.appendChild(item);
      requestAnimationFrame(() => item.classList.remove('opacity-0'));
    }, idx * 600);
  });
  return appDiv;
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
