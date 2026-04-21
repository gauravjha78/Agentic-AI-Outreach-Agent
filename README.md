**Flow Summary:**
- The **React frontend** provides dashboards for admins and a chat interface for leads/users.
- All requests pass through the **Express.js API Gateway**, which handles authentication and routing.
- The **Agent Engine** (powered by GPT-4o via LangChain) is the brain — it reads lead context, generates responses, and decides next actions.
- The **Lead Service** manages the enrollment pipeline, scoring, and status tracking.
- The **Notification Service** dispatches messages across channels.
- Everything is persisted in **MongoDB Atlas**.

---

## ⚙️ How It Works

**Step-by-step flow of the system:**

1. **Lead Capture** — A new lead enters the system via a web form, API webhook, or manual import by an admin.

2. **Lead Scoring** — The Lead Service evaluates the lead using profile data and assigns a priority score (Hot / Warm / Cold).

3. **Agent Assignment** — Based on the score and lead type, an AI agent is activated and assigned to that lead's conversation thread.

4. **Initial Outreach** — The agent crafts a personalized first-touch message and sends it via the lead's preferred channel (Email / WhatsApp / In-app).

5. **Conversation Management** — As the lead responds, the agent processes each reply, maintains context, and continues the conversation naturally — answering questions, addressing objections, and nudging toward enrollment.

6. **Follow-up Scheduling** — If a lead goes silent, the agent automatically schedules and executes follow-up messages at optimal intervals.

7. **Enrollment Trigger** — Once the lead shows strong intent, the agent initiates the enrollment flow — sending forms, confirming details, and validating completion.

8. **Human Escalation (if needed)** — If the agent detects frustration, complex queries, or low confidence, it flags the conversation and notifies a human supervisor in real time.

9. **Analytics Update** — Every interaction updates the dashboard — conversion rates, response times, agent performance, and pipeline health are tracked continuously.

---

## 🖼 Screenshots / Demo

> **Note:** Replace the placeholders below with actual screenshots or a GIF demo.

| View | Preview |
|------|---------|
| Admin Dashboard | `[ Screenshot Placeholder ]` |
| Lead Pipeline View | `[ Screenshot Placeholder ]` |
| AI Agent Chat Interface | `[ Screenshot Placeholder ]` |
| Analytics & Reporting | `[ Screenshot Placeholder ]` |

**Live Demo:** `[ Add deployed URL here ]`  
**Demo Video:** `[ Add Loom / YouTube link here ]`

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB instance)
- OpenAI API key
- Twilio account (optional, for SMS/WhatsApp)

### 1. Clone the Repository

```bash
git clone https://github.com/gauravjha78/agentic-ai-outreach-system.git
cd agentic-ai-outreach-system
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `/server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
EMAIL_HOST=smtp.your-provider.com
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 4. Run the Application

```bash
# Start the backend server
cd server
npm run dev

# Start the frontend (in a new terminal)
cd client
npm start
```

The app will be running at:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`

### 5. (Optional) Run with Docker

```bash
docker-compose up --build
```

---

## 📖 Usage Guide

### For Admins
1. Log in at `/admin` with your admin credentials.
2. Navigate to **Leads** → Import leads via CSV or add manually.
3. The system will automatically score and assign agents to each lead.
4. Monitor progress in real time via the **Pipeline** and **Analytics** views.
5. Use **Escalations** tab to review conversations flagged for human attention.

### For Human Agents (Supervisors)
1. Log in at `/agent` to view your assigned escalations.
2. Review the AI conversation history and take over seamlessly.
3. Mark conversations as resolved or return control to the AI agent.

### For End Users / Leads
1. Receive outreach via Email, WhatsApp, or chat widget.
2. Respond naturally — the AI agent handles the conversation.
3. Complete enrollment by following prompts and filling out the provided forms.

---

## 💡 Why This Project is Unique

Most outreach tools are just **message schedulers** — they send emails on a timer and call it automation.

This system is fundamentally different:

- **Agents reason, not just react.** Each agent reads context, interprets intent, and decides the best next action — just like a trained human would.
- **The system improves with data.** Interaction logs can be used to fine-tune prompts and scoring models over time.
- **It's not a chatbot.** It's a multi-step, goal-oriented pipeline — an agent working toward a specific business outcome (enrollment), not just answering questions.
- **Hybrid intelligence.** The AI handles scale; humans handle edge cases. Both layers are first-class citizens in the system design.

---

## 🌍 Use Cases

| Industry | Application |
|----------|-------------|
| **Ed-Tech** | Automate student enrollment and course onboarding communications |
| **SaaS** | Convert trial users into paid subscribers with personalized nudges |
| **Coaching / Consulting** | Handle discovery call bookings and pre-qualification |
| **Healthcare** | Automate patient onboarding and appointment follow-ups |
| **Real Estate** | Qualify property leads and schedule site visits automatically |
| **Non-Profits** | Outreach and volunteer enrollment at zero marginal cost |

---

## 🔮 Future Improvements

- **Voice Agent Integration** — Add support for AI-powered voice calls using Twilio Voice + Whisper (speech-to-text)
- **Fine-Tuned Domain Models** — Train custom LLMs on industry-specific outreach data for higher conversion rates
- **A/B Testing Engine** — Automatically test message variations and promote the best-performing templates
- **Multilingual Support** — Detect user language and switch agent communication seamlessly
- **Advanced RAG Pipeline** — Use Retrieval-Augmented Generation so agents can reference company documents, FAQs, and policies accurately
- **Agent Collaboration** — Allow multiple specialized agents (e.g., a "closer" agent and a "nurture" agent) to hand off conversations based on lead stage
- **Mobile App** — Native iOS/Android app for admins and human supervisors to manage escalations on the go
- **Predictive Churn Detection** — Flag leads likely to disengage before they go cold

---

## 🤝 Contributing

Contributions are welcome and appreciated!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) specification and ensure all PRs include relevant tests.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Gaurav Avdhesh Jha**  
Full Stack Developer · AI Enthusiast · Open Source Contributor

- 🔗 Portfolio: [github.com/gauravjha78](https://github.com/gauravjha78)
- 🐙 GitHub: [@gauravjha78](https://github.com/gauravjha78)
- 💼 LinkedIn: `[ Add your LinkedIn URL here ]`
- 📧 Email: `[ gauravjha9878@gmail.com ]`

---

