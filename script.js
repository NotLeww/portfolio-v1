const chatWindow = document.getElementById('chatWindow');
const customInput = document.getElementById('customInput');
const sendBtn = document.getElementById('sendBtn');
const contactForm = document.getElementById('contactForm');

// Portfolio data for context
const portfolioData = {
  about: `I'm Jayson "Lew" Pinggoy, a 4th-year BSIT student specializing in Information Security. I'm passionate about building robust and secure applications using modern technologies. My expertise spans full-stack development with HTML, CSS, JavaScript, PHP, Java, C++, and Python. I have hands-on experience with Laravel and Node.js for backend development, and I'm proficient with XAMPP for local development environments, as well as cloud databases like TiDB Cloud and Supabase.`,
  skills: `Languages: HTML, CSS, JavaScript, PHP, Java, C++, Python. Frameworks & Tools: Laravel, Node.js, XAMPP. Databases: TiDB Cloud, Supabase, MySQL. Specialization: Information Security, System Integration, HR & Logistics Systems.`,
  project_list: `My Projects: 1. Hospital System (3rd year) - HR-focused hospital management with employee info, job posting, payroll, and financial integrations. 2. School Management System (3rd year) - Student documentation and credential requests platform. 3. TNVS Logistics System (3rd year) - Transport Network Vehicle Service with logistics workflow. 4. School Warehousing System (2nd year) - Stock categorization system. 5. Lost & Found System (2nd year) - Social platform for lost items. 6. Buy/Sell System (2nd year) - Second-hand marketplace.`,
  hospital: `Hospital System: A comprehensive HR-focused hospital management system with employee information management, job posting, payroll calculations, and financial integrations. GitHub: https://github.com/euonoia/Concord. This was my most challenging project requiring clear module flow and seamless data integration.`,
  sms: `School Management System: An integrated platform for student documentation, credential requests, and academic records. GitHub: https://github.com/NotLeww/IAS-SMS. Provides secure access to student information and streamlined processes.`,
  contact: `Email: jaysonpinggoy11@gmail.com, LinkedIn: https://linkedin.com/in/jayson-lew-pinggoy, GitHub: https://github.com/NotLeww, Phone: +63 995 306 7350`,
  education: `2nd Year: Foundational projects in web and desktop development. 3rd Year: Advanced systems with databases and backend frameworks. 4th Year: Information Security focus, full-stack expertise, and cloud database solutions.`,
};

// Combine all data into one context string for the AI
const fullContext = `You are Jayson "Lew" Pinggoy, a 4th-year BSIT student specializing in Information Security. ${portfolioData.about} ${portfolioData.skills} ${portfolioData.project_list} ${portfolioData.contact}`;

let isLoadingResponse = false;

function addMessage(content, type = 'bot', hasButtons = false) {
  const wrapper = document.createElement('div');
  wrapper.className = type === 'user' ? 'message user-message' : 'message bot-message';
  const bubble = document.createElement('div');
  bubble.className = 'message-content';
  if (type === 'user') {
    bubble.textContent = content;
  } else {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = content.replace(/\n/g, '<br>');
    bubble.appendChild(paragraph);
  }
  wrapper.appendChild(bubble);
  chatWindow.appendChild(wrapper);
  
  // Add suggestions if hasButtons is true
  if (hasButtons && type === 'bot') {
    addSuggestions(wrapper);
  }
  
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addSuggestions(parentMsg) {
  const suggestionsContainer = document.createElement('div');
  suggestionsContainer.className = 'message-suggestions';
  
  const suggestions = [
    { text: 'Tell me more', query: 'I want to know more about your work' },
    { text: 'Show projects', query: 'What projects have you built?' },
    { text: 'Contact info', query: 'How can I reach you?' }
  ];
  
  suggestions.forEach(suggestion => {
    const btn = document.createElement('button');
    btn.className = 'suggestion-btn';
    btn.textContent = suggestion.text;
    btn.onclick = () => {
      customInput.value = suggestion.query;
      sendBtn.click();
    };
    suggestionsContainer.appendChild(btn);
  });
  
  parentMsg.appendChild(suggestionsContainer);
}

function addLoadingMessage() {
  const wrapper = document.createElement('div');
  wrapper.className = 'message bot-message loading-message';
  wrapper.id = 'loading-msg';
  const bubble = document.createElement('div');
  bubble.className = 'message-content';
  bubble.innerHTML = '<span class="loader">●●●</span><span class="typing-text">Thinking...</span>';
  wrapper.appendChild(bubble);
  chatWindow.appendChild(wrapper);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeLoadingMessage() {
  const loadingMsg = document.getElementById('loading-msg');
  if (loadingMsg) {
    loadingMsg.remove();
  }
}

function updateLoadingMessage(text) {
  const loadingMsg = document.getElementById('loading-msg');
  if (loadingMsg) {
    const bubbles = loadingMsg.querySelectorAll('.message-content p');
    if (bubbles.length > 0) {
      bubbles[bubbles.length - 1].innerHTML = text;
    }
  }
}

// Type animation effect
async function typeMessage(element, text) {
  const speed = 15;
  element.innerHTML = '';
  
  for (let i = 0; i < text.length; i++) {
    element.innerHTML += text[i];
    await new Promise(resolve => setTimeout(resolve, speed));
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}

// Hybrid approach: Intelligent pattern matching + API fallback
async function generateSmartResponse(userQuestion) {
  const question = userQuestion.toLowerCase();
  
  // Quick keyword-based responses for common questions
  const quickResponses = {
    greeting: ['hello', 'hi', 'hey', 'greetings'],
    help: ['help', 'what can you', 'how do i', 'assist'],
    name: ['who are you', 'your name', 'whats your name'],
  };

  if (quickResponses.greeting.some(kw => question.includes(kw))) {
    return `👋 Hi there! I'm Jayson, a full-stack developer and Information Security enthusiast. I'm here to chat about my skills, projects, education, or anything else you'd like to know. What interests you most?`;
  }

  if (quickResponses.name.some(kw => question.includes(kw))) {
    return `🎯 I'm Jayson "Lew" Pinggoy, a 4th-year BSIT student passionate about building secure applications and exploring cybersecurity. Nice to meet you! Feel free to ask me anything.`;
  }

  // Intelligent context matching
  let contextualResponse = getIntelligentResponse(question);
  if (contextualResponse) {
    return contextualResponse;
  }

  // Use API for more complex questions
  return await getAIResponse(userQuestion);
}

function getIntelligentResponse(question) {
  // Skills-related questions
  if (question.includes('skill') || question.includes('technology') || question.includes('tech') || question.includes('language')) {
    return `💻 <strong>My Technical Skills:</strong>\n\n🔹 <strong>Languages:</strong> HTML, CSS, JavaScript, PHP, Java, C++, Python\n\n🔹 <strong>Frameworks & Tools:</strong> Laravel, Node.js, XAMPP\n\n🔹 <strong>Databases:</strong> TiDB Cloud, Supabase, MySQL\n\n🔹 <strong>Specialization:</strong> Information Security, System Integration, Enterprise Systems\n\nI'm always learning and exploring new technologies. What would you like to dive deeper into?`;
  }

  // Project questions
  if (question.includes('project') || question.includes('work') || question.includes('build') || question.includes('system')) {
    if (question.includes('hospital')) {
      return `🏥 <strong>Hospital System</strong> (3rd Year - Most Challenging!)\n\nThis is one of my most complex projects:\n• 👥 Employee information management\n• 📋 Job posting system\n• 💰 Payroll calculations  \n• 💳 Financial module integrations\n\n🔗 GitHub: https://github.com/euonoia/Concord\n\n💡 <strong>Key Learning:</strong> The importance of clear data flow and seamless system integration. Want to know about other projects?`;
    }
    if (question.includes('school') || question.includes('sms')) {
      return `🎓 <strong>School Management System</strong> (3rd Year)\n\nAn integrated platform featuring:\n• 📚 Student documentation management\n• 📜 Credential requests processing\n• 📖 Academic records management\n• 🔒 Secure access controls\n\n🔗 GitHub: https://github.com/NotLeww/IAS-SMS\n\n✨ <strong>Highlight:</strong> Demonstrates secure handling of sensitive student data. Interested in other systems?`;
    }
    return `🚀 <strong>My Project Portfolio:</strong>\n\n📌 <strong>3rd Year:</strong> Hospital System, School Management System, TNVS Logistics System\n\n📌 <strong>2nd Year:</strong> School Warehousing System, Lost & Found System, Buy/Sell System\n\nEach project taught me valuable lessons about system design, security, and scalability. Which one would you like to explore?`;
  }

  // About questions
  if (question.includes('about you') || question.includes('tell me about') || (question.includes('who') && question.includes('you'))) {
    return `🙋 <strong>About Me:</strong>\n\nI'm Jayson "Lew" Pinggoy, a 4th-year BSIT Information Security student. I'm passionate about:\n\n💡 Creating secure, robust applications\n🔐 Exploring cybersecurity challenges\n🔧 Solving complex technical problems\n📚 Continuous learning and growth\n\n<strong>My Mission:</strong> To build systems that are not just functional but also secure and scalable.\n\nWould you like to know about my projects or technical background?`;
  }

  // Contact questions
  if (question.includes('contact') || question.includes('email') || question.includes('phone') || question.includes('reach') || question.includes('linkedin') || question.includes('github')) {
    return `📞 <strong>Let's Connect!</strong>\n\n📧 <strong>Email:</strong> jaysonpinggoy11@gmail.com\n\n💼 <strong>LinkedIn:</strong> https://linkedin.com/in/jayson-lew-pinggoy\n\n🐙 <strong>GitHub:</strong> https://github.com/NotLeww\n\n📱 <strong>Phone:</strong> +63 995 306 7350\n\nFeel free to reach out anytime. I'd love to chat about tech, projects, or opportunities! 😊`;
  }

  // Education questions
  if (question.includes('education') || question.includes('study') || question.includes('school') || question.includes('college') || question.includes('year') || question.includes('background')) {
    return `🎓 <strong>My Educational Journey:</strong>\n\n📚 <strong>2nd Year:</strong> Built foundational projects and learned web & desktop development\n\n🚀 <strong>3rd Year:</strong> Advanced into enterprise systems with databases and backend frameworks\n\n🎯 <strong>4th Year (Current):</strong> Specializing in Information Security, full-stack excellence, and cloud solutions\n\n💪 Each year has pushed me to learn more and build better systems. What aspect interests you most?`;
  }

  // Security questions
  if (question.includes('security') || question.includes('cyber') || question.includes('protect') || question.includes('secure') || question.includes('information security')) {
    return `🔐 <strong>Information Security - My Passion!</strong>\n\nSecurity is woven throughout my work:\n\n🛡️ Building secure application architectures\n🔑 Data protection and integrity\n🔗 Secure system integration practices\n⚡ Following cybersecurity best practices\n\n📝 <strong>My Approach:</strong> Security isn't an afterthought—it's foundational.\n\nI'm continuously exploring emerging cybersecurity trends and applying them to my projects. What would you like to know about security implementation?`;
  }

  return null;
}

// Fallback: Provide helpful responses for complex questions
async function getAIResponse(userQuestion) {
  // Array of helpful fallback responses
  const fallbackResponses = [
    `That's a great question! I'm still learning to answer that one perfectly. 🤔 Why don't you ask me about my projects, skills, or how to get in touch? I have detailed answers for those topics!`,
    `That's an interesting question! 🤔 I'm still working on that one. Why don't you ask me about my projects, skills, education, or how to contact me? I'd love to chat about those! 😊`,
    `I'm continuously expanding my knowledge! For now, I can give you detailed information about my technical skills, projects, education, and contact information. What would you like to know?`,
    `That's a complex topic! While I'm still developing my understanding of that, I can share detailed information about my experience with full-stack development, information security, and enterprise systems. Would you like to hear about my projects?`,
    `I'm always learning and growing! Currently, I have comprehensive knowledge about web development, system integration, and security practices. Feel free to ask me about my portfolio projects or technical background!`
  ];

  // Return a random fallback response
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

sendBtn.addEventListener('click', async () => {
  if (isLoadingResponse) return;
  const question = customInput.value.trim();
  if (!question) return;

  addMessage(question, 'user');
  customInput.value = '';
  addLoadingMessage();
  isLoadingResponse = true;

  try {
    const response = await generateSmartResponse(question);
    removeLoadingMessage();
    addMessage(response, 'bot', true);
  } catch (error) {
    removeLoadingMessage();
    addMessage("I'm having trouble processing that. Try asking about my projects or skills! 🤔", 'bot');
  }

  isLoadingResponse = false;
});

customInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && !isLoadingResponse) {
    sendBtn.click();
  }
});

// Smooth scrolling for sidebar nav links
document.querySelectorAll('.sidebar-nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // For prototype, just show an alert. In real app, send to server.
  alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon! 🙌`);

  // Reset form
  contactForm.reset();
});
