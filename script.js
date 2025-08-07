document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initChatDemo();
  initCharts();
  initObserver();
  initParallax();
});

function initNav() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  if (!toggle || !menu) return;
  menu.classList.add('collapsed');
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('collapsed');
  });
}

function initObserver() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(s => observer.observe(s));
}

function initParallax() {
  const bg = document.querySelector('.hero__bg');
  if (!bg) return;
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.2;
    bg.style.transform = `translateY(${offset}px)`;
  });
}

function initChatDemo() {
  const container = document.getElementById('chat-thread');
  if (!container) return;
  const scenarios = [
    {
      divider: 'Office lunch order',
      messages: [
        { sender: 'Mia', text: 'Lunch?' },
        { sender: 'Leo', text: 'Sushi?' },
        { sender: 'You', text: 'Olamo, open a Wolt group order.' },
        { sender: 'Olamo', text: 'Order open—add your meals.', app: { title: 'Wolt Order', items: ['Mia: Salmon sushi', 'Leo: Tofu bowl', 'You: Ramen'] } }
      ]
    },
    {
      divider: 'Family trip planning',
      messages: [
        { sender: 'Dad', text: 'When is our summer trip?' },
        { sender: 'You', text: 'Olamo, create a date poll.' },
        { sender: 'Olamo', text: 'Poll created for July.', app: { title: 'Trip Dates', items: ['July 2', 'July 9', 'July 16'] } }
      ]
    },
    {
      divider: 'Creator merch store',
      messages: [
        { sender: 'Fan1', text: 'I want a T-shirt!' },
        { sender: 'Creator', text: 'Olamo, launch merch store.' },
        { sender: 'Olamo', text: 'Store live—grab yours!', app: { title: 'Merch Store', items: ['T-shirt $25', 'Hoodie $45'] } }
      ]
    },
    {
      divider: 'Community event RSVPs',
      messages: [
        { sender: 'Host', text: 'RSVP for Saturday picnic.' },
        { sender: 'You', text: 'Olamo, collect RSVPs & payments.' },
        { sender: 'Olamo', text: 'RSVP form ready.', app: { title: 'Picnic RSVP', items: ['Join $5', 'Donate $10'] } }
      ]
    },
    {
      divider: 'Small business sales',
      messages: [
        { sender: 'Seller', text: 'Launching weekend market.' },
        { sender: 'You', text: 'Olamo, open crypto store.' },
        { sender: 'Olamo', text: 'Store live—pay in USDC/ETH.', app: { title: 'Weekend Market', items: ['Coffee Beans 0.01 ETH', 'Mug 5 USDC'] } }
      ]
    }
  ];

  let delay = 0;
  scenarios.forEach(sc => {
    setTimeout(() => addDivider(container, sc.divider), delay);
    delay += 1000;
    sc.messages.forEach(msg => {
      setTimeout(() => addMessage(container, msg), delay);
      delay += 3000;
    });
  });
}

function addDivider(container, text) {
  const div = document.createElement('div');
  div.className = 'chat-divider';
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function addMessage(container, { sender, text, app }) {
  const isSelf = sender === 'You';
  const wrap = document.createElement('div');
  wrap.className = `message ${isSelf ? 'message--self' : ''}`;

  const avatar = document.createElement('div');
  avatar.className = 'message__avatar';
  avatar.textContent = sender[0];

  const bubble = document.createElement('div');
  bubble.className = 'message__bubble';
  bubble.textContent = text;
  if (sender === 'Olamo') {
    const mic = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mic.setAttribute('viewBox', '0 0 24 24');
    mic.classList.add('microphone');
    mic.innerHTML = '<path fill="currentColor" d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0Z"/>';
    bubble.prepend(mic);
  }

  wrap.appendChild(avatar);
  wrap.appendChild(bubble);
  container.appendChild(wrap);
  requestAnimationFrame(() => bubble.classList.add('show'));

  if (app) {
    setTimeout(() => {
      const card = document.createElement('div');
      card.className = 'app-card';
      const title = document.createElement('div');
      title.style.fontWeight = '600';
      title.textContent = app.title;
      card.appendChild(title);
      app.items.forEach(i => {
        const it = document.createElement('div');
        it.textContent = i;
        card.appendChild(it);
      });
      container.appendChild(card);
      requestAnimationFrame(() => card.classList.add('show'));
      container.scrollTop = container.scrollHeight;
    }, 800);
  }
  container.scrollTop = container.scrollHeight;
}

function initCharts() {
  const businessCtx = document.getElementById('businessChart');
  if (businessCtx) {
    new Chart(businessCtx, {
      type: 'pie',
      data: {
        labels: ['Freemium', 'Pro tiers', 'Fees', 'App Store', 'Partners'],
        datasets: [{
          data: [20, 20, 20, 20, 20],
          backgroundColor: ['#0891B2', '#0ea5e9', '#22d3ee', '#67e8f9', '#a5f3fc']
        }]
      },
      options: { plugins: { legend: { labels: { color: '#f8fafc' } } } }
    });
  }

  const marketCtx = document.getElementById('marketChart');
  if (marketCtx) {
    new Chart(marketCtx, {
      type: 'bar',
      data: {
        labels: ['Messaging users', 'Creators', 'TAM ($B)', 'Competitors'],
        datasets: [{
          label: '2025',
          data: [3500, 200, 100, 0],
          backgroundColor: '#0891B2'
        }]
      },
      options: {
        scales: { x: { ticks: { color: '#f8fafc' } }, y: { ticks: { color: '#f8fafc' } } },
        plugins: { legend: { display: false } }
      }
    });
  }

  const fundsCtx = document.getElementById('fundsChart');
  if (fundsCtx) {
    new Chart(fundsCtx, {
      type: 'doughnut',
      data: {
        labels: ['Talent', 'Infra', 'Marketing', 'Legal'],
        datasets: [{
          data: [50, 25, 20, 5],
          backgroundColor: ['#0891B2', '#0ea5e9', '#22d3ee', '#67e8f9']
        }]
      },
      options: { plugins: { legend: { labels: { color: '#f8fafc' } } } }
    });
  }
}
