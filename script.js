// Refined chat demo with avatars and animated mini-app

document.addEventListener('DOMContentLoaded', () => {
  startChatDemo();
  setupCharts();
});

function startChatDemo() {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const flows = [
    { sender: 'Alice', text: 'Anyone hungry for lunch?' },
    { sender: 'Bob', text: "Let's order. Sushi?" },
    { sender: 'You', text: 'Olamo, open a Wolt group order.' },
    {
      sender: 'Olamo',
      text: 'Sure — everyone add your meal.',
      app: {
        type: 'wolt',
        participants: [
          { name: 'Alice', choice: 'Salmon sushi' },
          { name: 'Bob', choice: 'Veggie burger' },
          { name: 'Dana', choice: 'Caesar salad' },
          { name: 'You', choice: 'Falafel wrap' }
        ]
      }
    }
  ];

  let delay = 0;
  flows.forEach(step => {
    setTimeout(() => addMessage(container, step), delay);
    delay += 2500;
  });
}

function addMessage(container, { sender, text, app }) {
  const isSelf = sender === 'You';
  const wrapper = document.createElement('div');
  wrapper.className = `message-wrapper ${isSelf ? 'self' : ''}`;

  const avatar = document.createElement('div');
  avatar.className = 'chat-avatar';
  avatar.textContent = sender[0];

  const bubble = document.createElement('div');
  bubble.className = `${isSelf ? 'bg-[#0097A7]' : 'bg-gray-700'} chat-bubble`;
  bubble.textContent = text;

  if (isSelf) {
    wrapper.appendChild(bubble);
    wrapper.appendChild(avatar);
  } else {
    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
  }

  container.appendChild(wrapper);
  requestAnimationFrame(() => bubble.classList.add('show'));

  if (app && app.type === 'wolt') {
    setTimeout(() => {
      const appWrapper = document.createElement('div');
      appWrapper.className = 'app-pop bg-blue-700 text-white rounded-lg p-4 max-w-[90%] self-start';
      appWrapper.appendChild(createWoltApp(app.participants));
      container.appendChild(appWrapper);
      requestAnimationFrame(() => appWrapper.classList.add('show'));
      container.scrollTop = container.scrollHeight;
    }, 800);
  }

  container.scrollTop = container.scrollHeight;
}

function createWoltApp(participants) {
  const title = document.createElement('div');
  title.className = 'font-bold mb-2';
  title.textContent = 'Wolt Group Order';

  const list = document.createElement('div');
  participants.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'bg-blue-800 rounded px-2 py-1 mt-1 opacity-0 transition-opacity duration-500';
    item.textContent = `${p.name}: ${p.choice}`;
    list.appendChild(item);
    setTimeout(() => item.classList.remove('opacity-0'), i * 600);
  });

  const appDiv = document.createElement('div');
  appDiv.appendChild(title);
  appDiv.appendChild(list);
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
      options: { plugins: { legend: { labels: { color: 'white' } } } }
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
      options: {
        scales: {
          x: { ticks: { color: 'white' } },
          y: { ticks: { color: 'white' } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  const fundsCtx = document.getElementById('fundsChart');
  if (fundsCtx) {
    new Chart(fundsCtx, {
      type: 'doughnut',
      data: {
        labels: ['Talent', 'Infra', 'Marketing', 'Compliance'],
        datasets: [{
          data: [50, 25, 20, 5],
          backgroundColor: ['#0097A7', '#00ACC1', '#26C6DA', '#4DD0E1']
        }]
      },
      options: { plugins: { legend: { labels: { color: 'white' } } } }
    });
  }
}
