document.addEventListener('DOMContentLoaded', () => {
  startChatDemo();
  setupCharts();
});

function startChatDemo() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const messages = [
    { name: 'Alex', text: 'Poker night?', side: 'left' },
    { name: 'Sam', text: "I’m in!", side: 'right' },
    { name: 'Riley', text: 'Olamo, start a poker game for us', side: 'left' },
    { name: 'Olamo', text: 'Poker table ready! Invite your friends.', side: 'left', app: 'Poker Game MiniApp' }
  ];
  let delay = 0;
  messages.forEach(msg => {
    setTimeout(() => {
      addMessage(container, msg.name, msg.text, msg.side, msg.app);
    }, delay);
    delay += 2000;
  });
}

function addMessage(container, name, text, side, app) {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex flex-col ' + (side === 'right' ? 'self-end items-end' : 'self-start items-start');
  const nameEl = document.createElement('span');
  nameEl.className = 'text-xs text-gray-400 mb-1';
  nameEl.textContent = name;
  wrapper.appendChild(nameEl);
  const bubble = document.createElement('div');
  bubble.className = (side === 'right' ? 'bg-[#0097A7]' : 'bg-gray-700') + ' text-white rounded-lg px-4 py-2 max-w-[70%]';
  bubble.textContent = text;
  wrapper.appendChild(bubble);
  container.appendChild(wrapper);
  if (app) {
    const appDiv = document.createElement('div');
    appDiv.className = 'self-start bg-gray-700 rounded-lg px-4 py-2 max-w-[70%] text-sm text-gray-200 mt-1';
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
